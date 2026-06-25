import { URL } from "../url/url";
export const generateTimetable = async(schoolId, token) => {
    const res = await fetch(
        `${URL}/api/timetable/generate/${schoolId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        },
    );
    if (!res.ok) throw new Error(`Generate failed: ${res.status}`);
    return res.json();
};