import { URL }
from "../url/url"
export const createAccount = async(data) => {

    try {
        const response = await fetch(`${URL}/api/users/create`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })


        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message)
        }
        return result;


    } catch (error) {
        return {
            success: false,
            message: error.message,
        };

    }
}