import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";

const removeBgImage = async (req, res) => {
    try {
        console.log("========== REMOVE BG ==========");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log("CLIPDROP KEY:", process.env.CLIPDROP_API ? "FOUND" : "NOT FOUND");

        const { clerkId } = req.body;

        if (!clerkId) {
            return res.status(400).json({
                success: false,
                message: "Clerk ID missing"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file missing"
            });
        }

        const user = await userModel.findOne({ clerkId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: "No Credit Balance",
                creditBalance: user.creditBalance
            });
        }

        if (!process.env.CLIPDROP_API) {
            return res.status(500).json({
                success: false,
                message: "CLIPDROP_API is missing"
            });
        }

        const imageFile = fs.createReadStream(req.file.path);

        const formdata = new FormData();

        formdata.append("image_file", imageFile);

        const response = await axios.post(
            "https://clipdrop-api.co/remove-background/v1",
            formdata,
            {
                headers: {
                    ...formdata.getHeaders(),
                    "x-api-key": process.env.CLIPDROP_API
                },
                responseType: "arraybuffer"
            }
        );

        const base64Image = Buffer
            .from(response.data)
            .toString("base64");

        const resultImage =
            `data:${req.file.mimetype};base64,${base64Image}`;

        await userModel.findByIdAndUpdate(
            user._id,
            {
                creditBalance: user.creditBalance - 1
            }
        );

        return res.json({
            success: true,
            resultImage,
            creditBalance: user.creditBalance - 1,
            message: "Background Removed"
        });

    } catch (error) {

        console.log("========== BACKEND ERROR ==========");
        console.log(error);
        console.log("MESSAGE:", error.message);
        console.log("RESPONSE:", error.response?.data);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { removeBgImage };