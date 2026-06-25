import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TeachingExcel from "../excel/TeachingExcel";
import useAuth from "../../hooks/useAuth";
import { excelImport } from "../../services/excelImport";
import { timeslotgenerate } from "../../services/timeslotgenarate";
import { sessionSimulation } from "../../services/sessionSimulation";
import { fetchTimeslots } from "../../services/fetchTimeslot";
import { generateTimetable } from "../../services/generateTimetable";
import { fetchTimetable } from "../../services/fetchTimetable";

const steps = [
  {
    id: 1,
    title: "Upload Excel",
    subtitle: "Import class, teacher, and subject rows.",
  },
  {
    id: 2,
    title: "Insert study days",
    subtitle: "Choose which days the timetable will use.",
  },
  {
    id: 3,
    title: "Set session time",
    subtitle: "Define morning and evening sessions and period duration.",
  },
  {
    id: 4,
    title: "Create sessions",
    subtitle: "Remove conflicts and prepare clean slots.",
  },
  {
    id: 5,
    title: "Generate timetable",
    subtitle: "Preview the final day and time-slot layout.",
  },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const toTitleCase = (str) =>
  str
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const buildUniqueData = (rows) => {
  const classMap = new Map();
  const teacherMap = new Map();
  const subjectMap = new Map();
  rows.forEach((row) => {
    if (row.className) {
      const c = toTitleCase(row.className);
      classMap.set(c.toLowerCase(), c);
    }
    if (row.teacher) {
      const t = toTitleCase(row.teacher);
      teacherMap.set(t.toLowerCase(), t);
    }
    if (row.subject) {
      const s = toTitleCase(row.subject);
      subjectMap.set(s.toLowerCase(), s);
    }
  });
  return {
    classes: Array.from(classMap.values()),
    teachers: Array.from(teacherMap.values()),
    subjects: Array.from(subjectMap.values()),
  };
};

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TimetableWizardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sampleRows, setSampleRows] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [selectedDays, setSelectedDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [morningStart, setMorningStart] = useState("08:00");
  const [morningEnd, setMorningEnd] = useState("12:00");
  const [eveningStart, setEveningStart] = useState("13:00");
  const [eveningEnd, setEveningEnd] = useState("16:00");
  const [periodLength, setPeriodLength] = useState("45");
  const [breakAfter, setBreakAfter] = useState("2");
  const [breakDuration, setBreakDuration] = useState("15");
  const [fridayReligiousStart, setFridayReligiousStart] = useState("14:30");
  const [fridayReligiousEnd, setFridayReligiousEnd] = useState("16:00");
  const [sessionsReady, setSessionsReady] = useState(false);
  const [isGeneratingTimeslots, setIsGeneratingTimeslots] = useState(false);
  const [timeslotError, setTimeslotError] = useState("");
  const [timeslotsGenerated, setTimeslotsGenerated] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [timeslots, setTimeslots] = useState([]);

  // ── Step 5 states ──
  const [timetableData, setTimetableData] = useState([]);
  const [activeClassTab, setActiveClassTab] = useState(null);
  const [isGeneratingTimetable, setIsGeneratingTimetable] = useState(false);
  const [generateError, setGenerateError] = useState("");

  const { schoolId, token } = useAuth();

  // ── Fetch timeslots (step 3 preview) ──
  useEffect(() => {
    const loadTimeslots = async () => {
      if (currentStep !== 5 || !schoolId || !token) return;
      const results = await fetchTimeslots(schoolId, token);
      setTimeslots(results);
    };
    loadTimeslots();
  }, [currentStep, schoolId, token]);

  // ── Fetch timetable data when reaching step 5 ──
  useEffect(() => {
    const loadTimetable = async () => {
      if (currentStep !== 5 || !schoolId || !token) return;
      try {
        const rows = await fetchTimetable(schoolId, token);
        setTimetableData(rows);
        setActiveClassTab(null);
      } catch (err) {
        console.error("Fetch timetable failed:", err);
      }
    };
    loadTimetable();
  }, [currentStep, schoolId, token]);

  // ── Generate timetable handler ──
  const handleGenerateTimetable = async () => {
    setIsGeneratingTimetable(true);
    setGenerateError("");
    try {
      const results =await generateTimetable(schoolId, token);
      const rows = await fetchTimetable(schoolId, token);
      console.log(rows)
      console.log(results);
      setTimetableData(rows);
      setActiveClassTab(null);
      setGenerated(true);
    } catch (err) {
      console.error("Generate failed:", err);
      setGenerateError(err.message || "Something went wrong.");
    } finally {
      setIsGeneratingTimetable(false);
    }
  };

  const goNext = () => setCurrentStep((c) => Math.min(c + 1, steps.length));
  const goPrevious = () => setCurrentStep((c) => Math.max(c - 1, 1));

  const handleDayToggle = (day) => {
    setSelectedDays((cur) =>
      cur.includes(day) ? cur.filter((d) => d !== day) : [...cur, day],
    );
    setTimeslotsGenerated(false);
    setTimeslotError("");
    setTimeslots([]);
  };

  const handleGenerateTimeslots = async () => {
    setTimeslotError("");
    setTimeslotsGenerated(false);
    setIsGeneratingTimeslots(true);
    setTimeslots([]);
    try {
      const result = await timeslotgenerate(
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
        token,
      );
      if (result && result.data) setTimeslots(result.data);
      else setTimeslots(Array.isArray(result) ? result : []);
      setTimeslotsGenerated(true);
    } catch (err) {
      setTimeslotError(
        err.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsGeneratingTimeslots(false);
    }
  };

  const handleSessionSimulation = async (schoolId, token) => {
    try {
      const result = await sessionSimulation(schoolId, token);
      if (result.success) setSessionsReady(true);
      else {
        setSessionsReady(false);
        console.error(result.error);
      }
    } catch (error) {
      setSessionsReady(false);
      console.error(error);
    }
  };

  const handleDataParsed = async (records) => {
    setUploadError("");
    setSaveError("");
    setSampleRows(records);
    const freshUniqueData = buildUniqueData(records);
    if (!schoolId) {
      setSaveError("No school linked. Please log in again.");
      return;
    }
    setIsSaving(true);
    try {
      await excelImport(freshUniqueData, records, schoolId, token);
    } catch (err) {
      setSaveError(err.message || "Something went wrong while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadError = (message) => setUploadError(message);
  const uniqueData = useMemo(() => buildUniqueData(sampleRows), [sampleRows]);

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          uniqueData.classes.length > 0 &&
          uniqueData.teachers.length > 0 &&
          uniqueData.subjects.length > 0 &&
          !isSaving &&
          !saveError
        );
      case 2:
        return selectedDays.length >= 2;
      case 3:
        return (
          morningStart < morningEnd &&
          eveningStart < eveningEnd &&
          periodLength !== "" &&
          parseInt(breakAfter, 10) >= 1 &&
          parseInt(breakDuration, 10) >= 5 &&
          (!selectedDays.includes("Friday") ||
            (fridayReligiousStart >= eveningStart &&
              fridayReligiousEnd <= eveningEnd &&
              fridayReligiousStart < fridayReligiousEnd)) &&
          timeslotsGenerated &&
          !isGeneratingTimeslots &&
          !timeslotError
        );
      case 4:
        return sessionsReady;
      case 5:
      default:
        return true;
    }
  };
  const currentStepValid = isCurrentStepValid();

  // ══════════════════════════════════════════════════════════════
  // STEP 5 — helpers
  // ══════════════════════════════════════════════════════════════

  // Normalize DTO kutoka backend
  const normalizeEntry = (e) => ({
    className: e.className || e.class_name || "",
    day: e.day || "",
    startTime: (e.startTime || e.start_time || "").slice(0, 5),
    endTime: (e.endTime || e.end_time || "").slice(0, 5),
    subjectName: e.subjectName || e.subject_name || "—",
    teacherName: e.teacherName || e.teacher_name || "—",
    isBreak: e.isBreak === true || e.is_break === 1,
    timeslotId: e.timeslotId || e.timeslot_id,
    groupId: e.timetableGroupId || e.timetable_group_id,
  });

  const normalizedTimetable = timetableData.map(normalizeEntry);
  const classesList = [...new Set(normalizedTimetable.map((e) => e.className))]
    .filter(Boolean)
    .sort();
  const currentTab = activeClassTab || classesList[0] || null;

  // Build grid data kwa class iliyochaguliwa
  const buildClassGrid = (className) => {
    const entries = normalizedTimetable.filter(
      (e) => e.className === className,
    );

    const days = [...new Set(entries.map((e) => e.day))]
      .filter(Boolean)
      .sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));

    // Lookup: { day: { startTime: entry } }
    const lookup = {};
    days.forEach((d) => {
      lookup[d] = {};
    });
    entries.forEach((e) => {
      if (!lookup[e.day]) lookup[e.day] = {};
      lookup[e.day][e.startTime] = e;
    });

    // Sorted times per day + inject gap-breaks
    const allTimeKeysSet = new Set();
    days.forEach((day) => {
      const sorted = entries
        .filter((e) => e.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      sorted.forEach((slot, i) => {
        allTimeKeysSet.add(slot.startTime);
        if (i < sorted.length - 1) {
          const gapEnd = sorted[i].endTime;
          const gapStart = sorted[i + 1].startTime;
          if (gapEnd < gapStart) {
            const gapKey = `gap_${gapEnd}_${gapStart}`;
            allTimeKeysSet.add(gapKey);
            // inject into lookup for every day
            days.forEach((d) => {
              if (!lookup[d][gapKey]) {
                lookup[d][gapKey] = {
                  isBreak: true,
                  isGap: true,
                  startTime: gapEnd,
                  endTime: gapStart,
                  subjectName: "Break",
                  teacherName: "",
                };
              }
            });
          }
        }
      });
    });

    const allTimeKeys = [...allTimeKeysSet].sort((a, b) => {
      const ta = a.startsWith("gap_") ? a.split("_")[1] : a;
      const tb = b.startsWith("gap_") ? b.split("_")[1] : b;
      return ta.localeCompare(tb);
    });

    return { days, lookup, allTimeKeys };
  };

  // ── PDF — class moja ──
  const downloadClassPDF = async (className) => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const { days, lookup, allTimeKeys } = buildClassGrid(className);

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(14, 165, 233);
    doc.text(`Timetable — ${className}`, 14, 14);
    doc.setTextColor(0);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 21);
    doc.setTextColor(0);

    const head = [["Period", ...days]];
    const body = allTimeKeys.map((tk) => {
      const isGap = tk.startsWith("gap_");
      const sampleSlot = days.map((d) => lookup[d]?.[tk]).find(Boolean);
      const timeLabel = sampleSlot
        ? `${sampleSlot.startTime} – ${sampleSlot.endTime}`
        : tk;
      const row = [timeLabel];
      days.forEach((day) => {
        const slot = lookup[day]?.[tk];
        if (!slot) {
          row.push("—");
          return;
        }
        if (slot.isBreak || slot.isGap) {
          row.push("BREAK");
          return;
        }
        row.push(`${slot.subjectName}\n${slot.teacherName}`);
      });
      return row;
    });

    autoTable(doc, {
      head,
      body,
      startY: 26,
      styles: {
        fontSize: 7,
        cellPadding: 3,
        valign: "middle",
        halign: "center",
        lineColor: [226, 232, 240],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [14, 165, 233],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        0: {
          halign: "left",
          fontStyle: "bold",
          fillColor: [241, 245, 249],
          textColor: [15, 23, 42],
          minCellWidth: 28,
        },
      },
      didParseCell(data) {
        const v = String(data.cell.raw || "");
        if (v === "BREAK" && data.section === "body") {
          data.cell.styles.fillColor = [254, 243, 199];
          data.cell.styles.textColor = [146, 64, 14];
        } else if (
          v !== "—" &&
          data.section === "body" &&
          data.column.index > 0
        ) {
          data.cell.styles.fillColor = [224, 242, 254];
          data.cell.styles.textColor = [3, 105, 161];
        }
      },
      margin: { left: 10, right: 10 },
    });

    const pc = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pc; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${pc}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 5,
        { align: "center" },
      );
    }
    doc.save(`timetable-${className.replace(/\s+/g, "-")}.pdf`);
  };

  // ── PDF — classes zote ──
  const downloadAllPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    let firstPage = true;

    classesList.forEach((className) => {
      const { days, lookup, allTimeKeys } = buildClassGrid(className);
      if (!firstPage) doc.addPage();
      firstPage = false;

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(14, 165, 233);
      doc.text(`Class: ${className}`, 14, 13);
      doc.setTextColor(0);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 19);
      doc.setTextColor(0);

      const head = [["Period", ...days]];
      const body = allTimeKeys.map((tk) => {
        const sampleSlot = days.map((d) => lookup[d]?.[tk]).find(Boolean);
        const timeLabel = sampleSlot
          ? `${sampleSlot.startTime} – ${sampleSlot.endTime}`
          : tk;
        const row = [timeLabel];
        days.forEach((day) => {
          const slot = lookup[day]?.[tk];
          if (!slot) {
            row.push("—");
            return;
          }
          if (slot.isBreak || slot.isGap) {
            row.push("BREAK");
            return;
          }
          row.push(`${slot.subjectName}\n${slot.teacherName}`);
        });
        return row;
      });

      autoTable(doc, {
        head,
        body,
        startY: 23,
        styles: {
          fontSize: 7,
          cellPadding: 3,
          valign: "middle",
          halign: "center",
          lineColor: [226, 232, 240],
          lineWidth: 0.3,
        },
        headStyles: {
          fillColor: [14, 165, 233],
          textColor: 255,
          fontStyle: "bold",
        },
        columnStyles: {
          0: {
            halign: "left",
            fontStyle: "bold",
            fillColor: [241, 245, 249],
            textColor: [15, 23, 42],
            minCellWidth: 28,
          },
        },
        didParseCell(data) {
          const v = String(data.cell.raw || "");
          if (v === "BREAK" && data.section === "body") {
            data.cell.styles.fillColor = [254, 243, 199];
            data.cell.styles.textColor = [146, 64, 14];
          } else if (
            v !== "—" &&
            data.section === "body" &&
            data.column.index > 0
          ) {
            data.cell.styles.fillColor = [224, 242, 254];
            data.cell.styles.textColor = [3, 105, 161];
          }
        },
        margin: { left: 10, right: 10 },
      });
    });

    const pc = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pc; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${pc}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 5,
        { align: "center" },
      );
    }
    doc.save("timetable-all-classes.pdf");
  };

  // ══════════════════════════════════════════════════════════════
  const renderProgressStep = (step) => {
    const isActive = currentStep === step.id;
    const isDone = currentStep > step.id;
    return (
      <div
        key={step.id}
        className={[
          "rounded-3xl border p-4 transition",
          isActive
            ? "border-sky-300 bg-sky-50 shadow-sm shadow-sky-100/70"
            : isDone
              ? "border-emerald-200 bg-emerald-50"
              : "border-slate-100 bg-white",
        ].join(" ")}
      >
        <div className="flex items-start gap-3">
          <div
            className={[
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
              isActive
                ? "bg-sky-500 text-white"
                : isDone
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-600",
            ].join(" ")}
          >
            {step.id}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">{step.title}</h4>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {step.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <TeachingExcel
              onDataParsed={handleDataParsed}
              onError={handleUploadError}
            />
            {uploadError && (
              <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                {uploadError}
              </div>
            )}
            {isSaving && (
              <div className="rounded-3xl border border-sky-100 bg-sky-50 p-4 text-sm font-medium text-sky-700">
                Saving uploaded data to the server...
              </div>
            )}
            {saveError && (
              <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                {saveError}
              </div>
            )}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
              <h4 className="text-lg font-semibold text-slate-900">
                Preview rows
              </h4>
              <div className="mt-4 overflow-hidden rounded-3xl border border-slate-100">
                <div className="grid grid-cols-3 gap-4 bg-sky-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  <span>Class</span>
                  <span>Teacher</span>
                  <span>Subject</span>
                </div>
                <div className="divide-y divide-slate-100 bg-white">
                  {sampleRows.map((row, i) => (
                    <div
                      key={`${row.className}-${row.subject}-${i}`}
                      className="grid grid-cols-3 gap-4 px-5 py-4 text-sm text-slate-700"
                    >
                      <span className="font-medium text-slate-900">
                        {row.className}
                      </span>
                      <span>{row.teacher}</span>
                      <span>{row.subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
              <h4 className="text-lg font-semibold text-slate-900">
                Unique values ready for backend
              </h4>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  ["Classes", uniqueData.classes],
                  ["Teachers", uniqueData.teachers],
                  ["Subjects", uniqueData.subjects],
                ].map(([label, vals]) => (
                  <div key={label} className="rounded-2xl bg-sky-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">
                      {label} ({vals.length})
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {vals.map((v) => (
                        <span
                          key={v}
                          className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
              <h3 className="text-xl font-semibold text-slate-900">
                Insert study days
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Choose the days the timetable should use.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {daysOfWeek.map((day) => {
                  const isSel = selectedDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => handleDayToggle(day)}
                      className={[
                        "rounded-2xl px-4 py-3 text-sm font-medium transition",
                        isSel
                          ? "bg-sky-500 text-white"
                          : "bg-sky-50 text-slate-700 hover:bg-sky-100",
                      ].join(" ")}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
              <h3 className="text-xl font-semibold text-slate-900">
                Enter session time
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Define the morning session, evening session, and the total
                duration of one period.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {[
                  [
                    "morningStart",
                    "Morning start",
                    morningStart,
                    setMorningStart,
                  ],
                  ["morningEnd", "Morning end", morningEnd, setMorningEnd],
                  [
                    "eveningStart",
                    "Evening start",
                    eveningStart,
                    setEveningStart,
                  ],
                  ["eveningEnd", "Evening end", eveningEnd, setEveningEnd],
                ].map(([id, label, val, setter]) => (
                  <div key={id}>
                    <label
                      className="mb-2 block text-sm font-medium text-slate-700"
                      htmlFor={id}
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type="time"
                      value={val}
                      onChange={(e) => {
                        setter(e.target.value);
                        setTimeslotsGenerated(false);
                        setTimeslotError("");
                        setTimeslots([]);
                      }}
                      className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="periodLength"
                  >
                    Total hour of one period
                  </label>
                  <select
                    id="periodLength"
                    value={periodLength}
                    onChange={(e) => {
                      setPeriodLength(e.target.value);
                      setTimeslotsGenerated(false);
                      setTimeslotError("");
                      setTimeslots([]);
                    }}
                    className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="breakAfter"
                  >
                    Insert break after (periods)
                  </label>
                  <input
                    id="breakAfter"
                    type="number"
                    min="1"
                    max="10"
                    value={breakAfter}
                    onChange={(e) => {
                      setBreakAfter(e.target.value);
                      setTimeslotsGenerated(false);
                      setTimeslotError("");
                      setTimeslots([]);
                    }}
                    className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    e.g. 2 = break after every 2 consecutive periods
                  </p>
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="breakDuration"
                  >
                    Break duration (minutes)
                  </label>
                  <input
                    id="breakDuration"
                    type="number"
                    min="5"
                    max="60"
                    value={breakDuration}
                    onChange={(e) => {
                      setBreakDuration(e.target.value);
                      setTimeslotsGenerated(false);
                      setTimeslotError("");
                      setTimeslots([]);
                    }}
                    className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    e.g. 15 = 15-minute break inserted between groups of periods
                  </p>
                </div>
              </div>
            </div>
            {selectedDays.includes("Friday") && (
              <div className="rounded-3xl border border-amber-100 bg-amber-50 p-6 shadow-sm shadow-amber-100/50">
                <h3 className="text-lg font-semibold text-slate-900">
                  Friday religious period
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  On Fridays, regular periods fill the evening session up to
                  this start time, then this period takes over. It must stay
                  within ({eveningStart} – {eveningEnd}).
                </p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-2 block text-sm font-medium text-slate-700"
                      htmlFor="fridayReligiousStart"
                    >
                      Religious period start
                    </label>
                    <input
                      id="fridayReligiousStart"
                      type="time"
                      value={fridayReligiousStart}
                      onChange={(e) => {
                        setFridayReligiousStart(e.target.value);
                        setTimeslotsGenerated(false);
                        setTimeslotError("");
                        setTimeslots([]);
                      }}
                      className="w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />
                  </div>
                  <div>
                    <label
                      className="mb-2 block text-sm font-medium text-slate-700"
                      htmlFor="fridayReligiousEnd"
                    >
                      Religious period end
                    </label>
                    <input
                      id="fridayReligiousEnd"
                      type="time"
                      value={fridayReligiousEnd}
                      onChange={(e) => {
                        setFridayReligiousEnd(e.target.value);
                        setTimeslotsGenerated(false);
                        setTimeslotError("");
                        setTimeslots([]);
                      }}
                      className="w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />
                  </div>
                </div>
                {!(
                  fridayReligiousStart >= eveningStart &&
                  fridayReligiousEnd <= eveningEnd &&
                  fridayReligiousStart < fridayReligiousEnd
                ) && (
                  <p className="mt-3 text-xs font-medium text-red-500">
                    Religious period must start after evening start, end before
                    or at evening end, and start before it ends.
                  </p>
                )}
              </div>
            )}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
              <h4 className="text-lg font-semibold text-slate-900">
                Confirm and generate timeslots
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review your session settings above, then submit.
              </p>
              <button
                type="button"
                onClick={handleGenerateTimeslots}
                disabled={
                  isGeneratingTimeslots ||
                  !(
                    morningStart < morningEnd &&
                    eveningStart < eveningEnd &&
                    periodLength !== "" &&
                    parseInt(breakAfter, 10) >= 1 &&
                    parseInt(breakDuration, 10) >= 5 &&
                    (!selectedDays.includes("Friday") ||
                      (fridayReligiousStart >= eveningStart &&
                        fridayReligiousEnd <= eveningEnd &&
                        fridayReligiousStart < fridayReligiousEnd))
                  )
                }
                className="mt-5 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-500"
              >
                {isGeneratingTimeslots
                  ? "Generating timeslots..."
                  : timeslotsGenerated
                    ? "Regenerate timeslots"
                    : "Generate timeslots"}
              </button>
              {isGeneratingTimeslots && (
                <p className="mt-3 text-sm font-medium text-sky-700">
                  Saving schedule to the server, please wait...
                </p>
              )}
              {timeslotError && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  {timeslotError}
                </p>
              )}
              {timeslotsGenerated && !timeslotError && (
                <p className="mt-3 text-sm font-medium text-emerald-600">
                  Timeslots generated successfully. You can now proceed to the
                  next step.
                </p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
              <h3 className="text-xl font-semibold text-slate-900">
                Create sessions and remove conflict
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This step simulates conflict removal before final timetable
                generation.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  "Duplicate classes removed",
                  "Teacher clashes cleared",
                  "Room conflicts checked",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-sky-50 px-4 py-4 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleSessionSimulation(schoolId, token)}
                className="mt-6 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                Simulate conflict removal
              </button>
              {sessionsReady && (
                <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Sessions prepared and conflicts removed for final generation.
                </p>
              )}
            </div>
          </div>
        );

      // ══════════════════════════════════════════════════════════════
      // STEP 5 — Full timetable with tabs + download
      // ══════════════════════════════════════════════════════════════
      case 5:
      default: {
        const { days, lookup, allTimeKeys } = currentTab
          ? buildClassGrid(currentTab)
          : { days: [], lookup: {}, allTimeKeys: [] };

        const periodCount = currentTab
          ? normalizedTimetable.filter(
              (e) => e.className === currentTab && !e.isBreak,
            ).length
          : 0;

        return (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
              {/* ── Header ── */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Generate timetable
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Kila class ina timetable yake — bonyeza tab kuona.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleGenerateTimetable}
                    disabled={isGeneratingTimetable}
                    className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingTimetable
                      ? "Inatengeneza..."
                      : "Generate timetable"}
                  </button>
                  {generated && classesList.length > 0 && (
                    <>
                      {currentTab && (
                        <button
                          type="button"
                          onClick={() => downloadClassPDF(currentTab)}
                          className="rounded-2xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
                        >
                          ⬇ Download — {currentTab}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={downloadAllPDF}
                        className="rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                      >
                        ⬇ Download — Classes Zote
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* ── Errors / Loading ── */}
              {generateError && (
                <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {generateError}
                </div>
              )}
              {isGeneratingTimetable && (
                <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700">
                  Inatengeneza timetable... tafadhali subiri.
                </div>
              )}

              {generated && normalizedTimetable.length > 0 && (
                <>
                  {/* ── Summary badges ── */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-xs font-medium text-sky-700">
                      {classesList.length} classes
                    </span>
                    <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-700">
                      {normalizedTimetable.filter((e) => !e.isBreak).length}{" "}
                      total periods
                    </span>
                  </div>

                  {/* ── Class Tabs ── */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {classesList.map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setActiveClassTab(cls)}
                        className={[
                          "rounded-2xl px-4 py-2 text-sm font-medium transition",
                          currentTab === cls
                            ? "bg-sky-500 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-700",
                        ].join(" ")}
                      >
                        {cls}
                        <span
                          className={[
                            "ml-2 rounded-full px-1.5 py-0.5 text-xs",
                            currentTab === cls
                              ? "bg-sky-400 text-white"
                              : "bg-white text-slate-500",
                          ].join(" ")}
                        >
                          {
                            normalizedTimetable.filter(
                              (e) => e.className === cls && !e.isBreak,
                            ).length
                          }
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* ── Timetable Grid ── */}
                  {currentTab && (
                    <div className="mt-5">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900">
                            {currentTab}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {periodCount} periods · {days.length} siku
                          </p>
                        </div>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-slate-100">
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            minWidth: 600,
                            fontSize: 12,
                          }}
                        >
                          <thead>
                            <tr>
                              {/* Period column header */}
                              <th
                                style={{
                                  background: "#f0f9ff",
                                  padding: "10px 14px",
                                  textAlign: "left",
                                  fontWeight: 700,
                                  fontSize: 11,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                  color: "#64748b",
                                  border: "1px solid #e2e8f0",
                                  minWidth: 130,
                                  whiteSpace: "nowrap",
                                  position: "sticky",
                                  left: 0,
                                  zIndex: 2,
                                }}
                              >
                                <div>Period</div>
                                <div
                                  style={{
                                    fontWeight: 400,
                                    fontSize: 10,
                                    marginTop: 2,
                                    opacity: 0.7,
                                  }}
                                >
                                  Start – End
                                </div>
                              </th>
                              {/* Day headers */}
                              {days.map((day) => (
                                <th
                                  key={day}
                                  style={{
                                    background: "#f0f9ff",
                                    padding: "10px 12px",
                                    textAlign: "center",
                                    fontWeight: 700,
                                    fontSize: 11,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    color: "#64748b",
                                    border: "1px solid #e2e8f0",
                                    minWidth: 130,
                                  }}
                                >
                                  {day}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {allTimeKeys.map((tk, rowIdx) => {
                              const isGapRow = tk.startsWith("gap_");
                              const sampleSlot = days
                                .map((d) => lookup[d]?.[tk])
                                .find(Boolean);
                              const isBreakRow =
                                sampleSlot?.isBreak ||
                                sampleSlot?.isGap ||
                                false;

                              return (
                                <tr key={tk}>
                                  {/* Period time cell */}
                                  <td
                                    style={{
                                      background: isBreakRow
                                        ? "#fffbeb"
                                        : rowIdx % 2 === 0
                                          ? "#f8fafc"
                                          : "#fff",
                                      padding: "10px 14px",
                                      border: "1px solid #e2e8f0",
                                      whiteSpace: "nowrap",
                                      position: "sticky",
                                      left: 0,
                                      zIndex: 1,
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontWeight: 700,
                                        fontSize: 12,
                                        color: isBreakRow
                                          ? "#92400e"
                                          : "#0f172a",
                                      }}
                                    >
                                      {sampleSlot
                                        ? sampleSlot.startTime
                                        : tk.replace("gap_", "").split("_")[0]}
                                    </div>
                                    <div
                                      style={{
                                        fontWeight: 400,
                                        fontSize: 10,
                                        marginTop: 2,
                                        color: isBreakRow
                                          ? "#b45309"
                                          : "#94a3b8",
                                      }}
                                    >
                                      –{" "}
                                      {sampleSlot
                                        ? sampleSlot.endTime
                                        : tk.split("_")[2] || ""}
                                    </div>
                                  </td>

                                  {/* Day cells */}
                                  {days.map((day) => {
                                    const slot = lookup[day]?.[tk];
                                    if (!slot)
                                      return (
                                        <td
                                          key={day}
                                          style={{
                                            border: "1px solid #e2e8f0",
                                            textAlign: "center",
                                            padding: "10px 8px",
                                            background: isBreakRow
                                              ? "#fffbeb"
                                              : rowIdx % 2 === 0
                                                ? "#f8fafc"
                                                : "#fff",
                                          }}
                                        >
                                          <span
                                            style={{
                                              color: "#cbd5e1",
                                              fontSize: 11,
                                            }}
                                          >
                                            —
                                          </span>
                                        </td>
                                      );
                                    if (slot.isBreak || slot.isGap)
                                      return (
                                        <td
                                          key={day}
                                          style={{
                                            border: "1px solid #e2e8f0",
                                            textAlign: "center",
                                            padding: "8px",
                                            background: "#fffbeb",
                                          }}
                                        >
                                          <span
                                            style={{
                                              display: "inline-block",
                                              background: "#fef3c7",
                                              color: "#92400e",
                                              borderRadius: 8,
                                              padding: "4px 10px",
                                              fontSize: 11,
                                              fontWeight: 700,
                                            }}
                                          >
                                            Break
                                            <div
                                              style={{
                                                fontWeight: 400,
                                                fontSize: 10,
                                                marginTop: 2,
                                              }}
                                            >
                                              {slot.startTime} – {slot.endTime}
                                            </div>
                                          </span>
                                        </td>
                                      );
                                    return (
                                      <td
                                        key={day}
                                        style={{
                                          border: "1px solid #e2e8f0",
                                          textAlign: "center",
                                          padding: "8px",
                                          background:
                                            rowIdx % 2 === 0
                                              ? "#f8fafc"
                                              : "#fff",
                                        }}
                                      >
                                        <div
                                          style={{
                                            background: "#e0f2fe",
                                            borderRadius: 8,
                                            padding: "6px 8px",
                                            display: "inline-block",
                                            minWidth: 100,
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#0369a1",
                                              fontWeight: 700,
                                              fontSize: 12,
                                              lineHeight: 1.3,
                                            }}
                                          >
                                            {slot.subjectName}
                                          </div>
                                          <div
                                            style={{
                                              color: "#0284c7",
                                              fontWeight: 400,
                                              fontSize: 10,
                                              marginTop: 2,
                                            }}
                                          >
                                            {slot.teacherName}
                                          </div>
                                        </div>
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Legend */}
                      <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-slate-400">
                        <span className="flex items-center gap-2">
                          <span
                            className="inline-block h-3 w-3 rounded"
                            style={{ background: "#e0f2fe" }}
                          />
                          Subject + Teacher
                        </span>
                        <span className="flex items-center gap-2">
                          <span
                            className="inline-block h-3 w-3 rounded"
                            style={{ background: "#fef3c7" }}
                          />
                          Break
                        </span>
                        <span className="flex items-center gap-2">
                          <span
                            className="inline-block h-3 w-3 rounded"
                            style={{
                              background: "#f1f5f9",
                              border: "1px solid #e2e8f0",
                            }}
                          />
                          Hakuna slot
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {generated && normalizedTimetable.length === 0 && (
                <div className="mt-6 rounded-3xl border border-amber-100 bg-amber-50 p-6 text-center text-sm text-amber-700">
                  Hakuna timetable data. Bonyeza "Generate timetable" kuanza.
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
            User workspace
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Timetable generator flow
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            This is a frontend-only simulation of the timetable creation flow.
            Later you can connect your backend API without changing the user
            experience.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          Back to dashboard
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-4">{steps.map(renderProgressStep)}</div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-sky-500">
                Step {currentStep} of {steps.length}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                {steps[currentStep - 1].title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {steps[currentStep - 1].subtitle}
              </p>
            </div>
            <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm text-slate-700">
              Period length: {periodLength} minutes
            </div>
          </div>
          <div className="mt-6">{renderCurrentStep()}</div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goPrevious}
              disabled={currentStep === 1}
              className="rounded-2xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous step
            </button>
            <div className="flex flex-col items-end gap-2">
              {!currentStepValid && currentStep < steps.length && (
                <p className="text-xs font-medium text-red-500">
                  {currentStep === 1 &&
                    (isSaving
                      ? "Saving to the server, please wait..."
                      : saveError
                        ? "Fix the save error above before continuing."
                        : "Upload a valid file with at least one class, teacher, and subject.")}
                  {currentStep === 2 && "Select at least 2 days."}
                  {currentStep === 3 &&
                    (timeslotError
                      ? "Fix the error above and regenerate timeslots."
                      : !timeslotsGenerated
                        ? "Set your session times and generate timeslots before continuing."
                        : selectedDays.includes("Friday") &&
                            !(
                              fridayReligiousStart >= eveningStart &&
                              fridayReligiousEnd <= eveningEnd &&
                              fridayReligiousStart < fridayReligiousEnd
                            )
                          ? "Fix the Friday religious period to fit within the evening session."
                          : "Make sure start times are before end times.")}
                  {currentStep === 4 && "Run the conflict removal simulation."}
                </p>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                {currentStep < steps.length && (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!currentStepValid}
                    className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-500"
                  >
                    Next step
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setGenerated(true)}
                  className="rounded-2xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
                >
                  Preview only
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentStep === 5 && (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900">
            Selected days and slots
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-sky-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-500">
                Days
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedDays.map((day) => (
                  <span
                    key={day}
                    className="rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-sky-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-500">
                Sessions
              </p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>
                  Morning: {morningStart} - {morningEnd}
                </p>
                <p>
                  Evening: {eveningStart} - {eveningEnd}
                </p>
                <p>Period: {periodLength} minutes</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TimetableWizardPage;
