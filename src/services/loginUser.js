import { URL } from "../url/url";

export const loginUser = async(data) => {
    try {
        const response = await fetch(`${URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }

        return result;
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};