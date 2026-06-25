import { URL } from "../url/url";

export const sessionSimulation = async(schoolId, token) => {
    try {
        const response = await fetch(`${URL}/api/timetable/simulate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(schoolId),
        });

        // Kama response si OK, tupa error na ujumbe
        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `HTTP error ${response.status}`;
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorMessage;
            } catch (e) {

                errorMessage = errorText || errorMessage;
            }
            throw new Error(errorMessage);
        }

        // Pata data ya response (CountResponse)
        const data = await response.json();
        return { success: true, data };
    } catch (error) {

        if (
            error.message.includes("JWT expired") ||
            error.message.includes("401")
        ) {

            console.error("Session expired. Please login again.");

        }
        console.error("Error simulating session:", error.message);
        return { success: false, error: error.message };
    }
};