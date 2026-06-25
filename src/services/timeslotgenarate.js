import { URL } from "../url/url"

export const timeslotgenerate = async(
    schoolId,
    selectedDays,
    morningStart,
    morningEnd,
    eveningStart,
    eveningEnd,
    periodLength,
    breakAfter,
    breakDuration,
    fridayReligiousStart,
    fridayReligiousEnd,
    token
) => {
    const response = await fetch(`${URL}/api/timetable/generate-timeslots `, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            schoolId,
            selectedDays,
            morningStart,
            morningEnd,
            eveningStart,
            eveningEnd,
            periodLength: parseInt(periodLength, 10),
            breakAfter: parseInt(breakAfter, 10),
            breakDuration: parseInt(breakDuration, 10),
            fridayReligiousStart: selectedDays.includes("Friday") ?
                fridayReligiousStart : null,
            fridayReligiousEnd: selectedDays.includes("Friday") ?
                fridayReligiousEnd : null,
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to generate timeslots.");
    }

    return response.json();
};