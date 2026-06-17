import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
const morningSlots = ["08:00", "08:45", "09:30", "10:15"];
const eveningSlots = ["13:00", "13:45", "14:30", "15:15"];

const sampleRows = [
  { className: "10A", teacher: "Mr. Smith", subject: "Mathematics" },
  { className: "10B", teacher: "Mrs. Clark", subject: "Physics" },
  { className: "9A", teacher: "Mr. Brown", subject: "English" },
];

const sampleGeneratedSlots = [
  {
    day: "Monday",
    time: "08:00 - 08:45",
    className: "10A",
    teacher: "Mr. Smith",
  },
  {
    day: "Tuesday",
    time: "08:45 - 09:30",
    className: "10B",
    teacher: "Mrs. Clark",
  },
  {
    day: "Wednesday",
    time: "13:00 - 13:45",
    className: "9A",
    teacher: "Mr. Brown",
  },
  {
    day: "Thursday",
    time: "13:45 - 14:30",
    className: "10A",
    teacher: "Mr. Smith",
  },
];

const TimetableWizardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFileName, setUploadedFileName] = useState("");
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
  const [sessionsReady, setSessionsReady] = useState(false);
  const [generated, setGenerated] = useState(false);

  const previewSlots = useMemo(() => {
    const baseSlots = [...morningSlots, ...eveningSlots];
    return selectedDays.flatMap((day, dayIndex) =>
      baseSlots.map((slot, slotIndex) => ({
        key: `${day}-${slot}`,
        day,
        slot,
        className:
          slotIndex % 3 === 0 ? "10A" : slotIndex % 3 === 1 ? "10B" : "9A",
        teacher:
          slotIndex % 3 === 0
            ? "Mr. Smith"
            : slotIndex % 3 === 1
              ? "Mrs. Clark"
              : "Mr. Brown",
      })),
    );
  }, [selectedDays]);

  const goNext = () => {
    setCurrentStep((current) => Math.min(current + 1, steps.length));
  };

  const goPrevious = () => {
    setCurrentStep((current) => Math.max(current - 1, 1));
  };

  const handleDayToggle = (day) => {
    setSelectedDays((currentDays) =>
      currentDays.includes(day)
        ? currentDays.filter((selectedDay) => selectedDay !== day)
        : [...currentDays, day],
    );
  };

  const handleUpload = (event) => {
    const selectedFile = event.target.files?.[0];
    setUploadedFileName(selectedFile ? selectedFile.name : "");
  };

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
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
              <h3 className="text-xl font-semibold text-slate-900">
                Upload Excel file
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Upload a spreadsheet with three columns: class, teacher, and
                subject. This is a frontend simulation so you can later connect
                your backend API.
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
                {uploadedFileName ? (
                  <p className="mt-2 text-sm font-medium text-sky-700">
                    Selected file: {uploadedFileName}
                  </p>
                ) : null}
              </div>
            </div>

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
                  {sampleRows.map((row) => (
                    <div
                      key={`${row.className}-${row.subject}`}
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
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => handleDayToggle(day)}
                      className={[
                        "rounded-2xl px-4 py-3 text-sm font-medium transition",
                        isSelected
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
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="morningStart"
                  >
                    Morning start
                  </label>
                  <input
                    id="morningStart"
                    type="time"
                    value={morningStart}
                    onChange={(event) => setMorningStart(event.target.value)}
                    className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="morningEnd"
                  >
                    Morning end
                  </label>
                  <input
                    id="morningEnd"
                    type="time"
                    value={morningEnd}
                    onChange={(event) => setMorningEnd(event.target.value)}
                    className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="eveningStart"
                  >
                    Evening start
                  </label>
                  <input
                    id="eveningStart"
                    type="time"
                    value={eveningStart}
                    onChange={(event) => setEveningStart(event.target.value)}
                    className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="eveningEnd"
                  >
                    Evening end
                  </label>
                  <input
                    id="eveningEnd"
                    type="time"
                    value={eveningEnd}
                    onChange={(event) => setEveningEnd(event.target.value)}
                    className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>
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
                    onChange={(event) => setPeriodLength(event.target.value)}
                    className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
              </div>
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
                onClick={() => setSessionsReady(true)}
                className="mt-6 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                Simulate conflict removal
              </button>
              {sessionsReady ? (
                <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Sessions prepared and conflicts removed for final generation.
                </p>
              ) : null}
            </div>
          </div>
        );
      case 5:
      default:
        return (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Generate timetable
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Final preview shows only days and time slots with no subject
                    text, ready for backend integration later.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setGenerated(true)}
                  className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                >
                  Generate timetable
                </button>
              </div>

              {generated ? (
                <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
                  <div className="grid grid-cols-6 gap-2 bg-sky-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    <span>Day</span>
                    <span>08:00</span>
                    <span>08:45</span>
                    <span>09:30</span>
                    <span>13:00</span>
                    <span>13:45</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-white">
                    {selectedDays.map((day) => (
                      <div
                        key={day}
                        className="grid grid-cols-6 gap-2 px-5 py-4 text-sm text-slate-700"
                      >
                        <span className="font-medium text-slate-900">
                          {day}
                        </span>
                        <span>Slot</span>
                        <span>Slot</span>
                        <span>Slot</span>
                        <span>Slot</span>
                        <span>Slot</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
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

            <div className="flex flex-col gap-3 sm:flex-row">
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                >
                  Next step
                </button>
              ) : null}
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

      {currentStep === 5 ? (
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
      ) : null}
    </section>
  );
};

export default TimetableWizardPage;
