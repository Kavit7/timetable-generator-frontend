import { URL } from "../url/url";

export const excelImport = async(uniqueData, records, schoolId, token) => {
    try {
        const response = await fetch(`${URL}/api/excel/import`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                uniqueData,
                records,
                schoolId,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Import failed");
        }

        return data;
    } catch (error) {
        console.error("Excel Import Error:", error);
        throw error;
    }
};