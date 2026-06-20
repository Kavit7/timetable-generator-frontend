import React, { useState } from "react";
import * as XLSX from "xlsx";

const REQUIRED_COLUMNS = ["class", "teacher", "subject"];

const normalizeHeader = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const TeachingExcel = ({ onDataParsed, onError, onFileSelected }) => {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const reportError = (message) => {
    setLocalError(message);
    if (onError) onError(message);
  };

  const parseCsv = (text) => {
    return text
      .split(/\r\n|\n|\r/)
      .filter((line) => line.trim() !== "")
      .map((line) => line.split(",").map((cell) => cell.trim()));
  };

  const parseWorkbookSheet = (buffer) => {
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    if (!sheet || !sheet["!ref"]) {
      throw new Error("Sheet ya kwanza haina data.");
    }

    const range = XLSX.utils.decode_range(sheet["!ref"]);
    const rows = [];

    for (let R = range.s.r; R <= range.e.r; R++) {
      const row = [];
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = sheet[cellAddress];
        row.push(cell ? cell.v : "");
      }
      rows.push(row);
    }
    return rows;
  };

  const rowsToRecords = (rows) => {
    if (rows.length < 1) {
      throw new Error("Faili halina mistari yoyote.");
    }

    const headerRow = rows[0].map(normalizeHeader);
    const colIndex = {};
    REQUIRED_COLUMNS.forEach((col) => {
      colIndex[col] = headerRow.indexOf(col);
    });

    const missing = REQUIRED_COLUMNS.filter((col) => colIndex[col] === -1);
    if (missing.length > 0) {
      throw new Error(
        `Safu zifuatazo hazipo: ${missing.join(", ")}. Tarajiwa: class, teacher, subject.`,
      );
    }

    const records = rows
      .slice(1)
      .filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""))
      .map((row) => ({
        className: String(row[colIndex.class] ?? "").trim(),
        teacher: String(row[colIndex.teacher] ?? "").trim(),
        subject: String(row[colIndex.subject] ?? "").trim(),
      }));

    if (records.length === 0) {
      throw new Error("Hakuna data ya mistari (rows) baada ya header.");
    }

    return records;
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLocalError("");
    setUploadedFileName(file.name);
    setIsLoading(true);
    if (onFileSelected) onFileSelected(file.name);

    const isCsv = file.name.toLowerCase().endsWith(".csv");
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        let rawRows;
        if (isCsv) {
          rawRows = parseCsv(String(event.target.result));
        } else {
          rawRows = parseWorkbookSheet(event.target.result);
        }

        const records = rowsToRecords(rawRows);
        if (onDataParsed) onDataParsed(records);
      } catch (err) {
        console.error("Hitilafu ya kusoma faili:", err);
        reportError(
          err.message ||
            "Imeshindikana kusoma faili. Hakikisha ni .xlsx, .xls au .csv sahihi.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      console.error("FileReader error:", reader.error);
      reportError("Imeshindwa kusoma faili kutoka kwenye kompyuta yako.");
      setIsLoading(false);
    };

    if (isCsv) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
      <h3 className="text-xl font-semibold text-slate-900">
        Upload Excel file
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Upload a spreadsheet with three columns: class, teacher, and subject.
        This is a frontend simulation so you can later connect your backend API.
      </p>

      <div className="mt-5 rounded-3xl border border-dashed border-sky-200 bg-sky-50 p-5">
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleUpload}
          className="block w-full cursor-pointer text-sm text-slate-700 file:mr-4 file:rounded-2xl file:border-0 file:bg-sky-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-sky-600"
        />
        <p className="mt-3 text-xs text-slate-500">
          Required columns: class, teacher, subject.
        </p>

        {isLoading ? (
          <p className="mt-2 text-sm font-medium text-sky-700 animate-pulse">
            Inasoma faili...
          </p>
        ) : null}

        {!isLoading && uploadedFileName ? (
          <p className="mt-2 text-sm font-medium text-sky-700">
            Selected file: {uploadedFileName}
          </p>
        ) : null}

        {localError ? (
          <p className="mt-2 text-sm font-medium text-red-600">{localError}</p>
        ) : null}
      </div>
    </div>
  );
};

export default TeachingExcel;
