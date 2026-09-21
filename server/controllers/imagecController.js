import axios from "axios";
import FormData from "form-data";
import userModel from "../models/userModel.js";

const removeBgImage = async (req, res) => {
    try {
        console.log("========== REMOVE BG ==========");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log(
            "CLIPDROP KEY:",
            process.env.CLIPDROP_API ? "FOUND" : "NOT FOUND"
        );

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

        // Create form data
        const formdata = new FormData();

        // Use buffer instead of req.file.path
        formdata.append(
            "image_file",
            req.file.buffer,
            {
                filename: req.file.originalname,
                contentType: req.file.mimetype
            }
        );

        // Send image to ClipDrop
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
            `data:image/png;base64,${base64Image}`;

        // Deduct 1 credit
        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            {
                creditBalance: user.creditBalance - 1
            },
            {
                new: true
            }
        );

        return res.json({
            success: true,
            resultImage,
            creditBalance: updatedUser.creditBalance,
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