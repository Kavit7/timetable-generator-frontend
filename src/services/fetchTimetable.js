import { URL } from "../url/url";
export const fetchTimetable = async(schoolId, token) => {
    const res = await fetch(
        `${URL}/api/timetable/fetchtimetable/${schoolId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        },
    );
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const json = await res.json();
    return json;
};