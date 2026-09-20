import { useState, createContext , useEffect } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [credits, setCredit] = useState(false);
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const { getToken } = useAuth();
    const { isSignedIn, user } = useUser();
    const { openSignIn } = useClerk();

const loadCreditsData = async () => {
    try {
        const token = await getToken();

        console.log("TOKEN:", token);

        const { data } = await axios.get(
            backendUrl + "/api/user/credits",
            {
                headers: { token }
            }
        );

        console.log("CREDITS API RESPONSE:", data);

        if (data.success) {
            setCredit(data.credits);
        }

    } catch (error) {
        console.log("CREDITS ERROR:", error);
        console.log("SERVER RESPONSE:", error.response?.data);
    }
};
useEffect(() => {
    console.log("IS SIGNED IN:", isSignedIn);

    if (isSignedIn) {
        loadCreditsData();
    }
}, [isSignedIn]);

    const removeBg = async (image) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            setImage(image);
            setResultImage(false);
            navigate("/result");

            const token = await getToken();

            const formData = new FormData();

            formData.append("image", image);
            formData.append("clerkId", user.id);

            const { data } = await axios.post(
                backendUrl + "/api/image/remove-bg",
                formData,
                {
                    headers: {
                        token
                    }
                }
            );

            if (data.success) {
                setResultImage(data.resultImage);

                if (data.creditBalance !== undefined) {
                    setCredit(data.creditBalance);
                }

            } else {
                toast.error(data.message);

                if (data.creditBalance !== undefined) {
                    setCredit(data.creditBalance);
                }

                if (data.creditBalance === 0) {
                    navigate("/buy");
                }
            }

        } catch (error) {
            console.log("REMOVE BG ERROR:", error);
            console.log("SERVER RESPONSE:", error.response?.data);

            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };

    const value = {
        credits,
        setCredit,
        loadCreditsData,
        backendUrl,
        image,
        setImage,
        removeBg,
        resultImage,
        setResultImage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;