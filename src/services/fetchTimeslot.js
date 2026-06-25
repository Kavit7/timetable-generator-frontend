import { URL } from "../url/url"
export const fetchTimeslots = async(schoolId, token) => {
    try {
        const res = await fetch(
            `${URL}/api/timetable/timeslots/${schoolId}`, {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },

            },
        );

        if (!res.ok) throw new Error(`Failed to fetch timeslots: ${res.status}`);

        const json = await res.json();

        // Handle both { data: [...] } and plain array responses
        const rows = Array.isArray(json);
        return json;
    } catch (err) {
        console.error("Failed to fetch timeslots:", err);
    }
};