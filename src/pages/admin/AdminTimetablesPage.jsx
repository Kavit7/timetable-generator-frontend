import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminTimetableForm from "./forms/AdminTimetableForm";

const initialSchedules = [
  {
    id: 1,
    timetableName: "Class 10A Weekly Timetable",
    schoolName: "Greenfield Academy",
    day: "Monday",
    startTime: "08:00",
    endTime: "08:45",
    slotDuration: "45",
    subject: "Mathematics",
    teacher: "Mr. Smith",
    room: "Room 4A",
  },
  {
    id: 2,
    timetableName: "Teacher Duty Timetable",
    schoolName: "Greenfield Academy",
    day: "Tuesday",
    startTime: "09:00",
    endTime: "09:45",
    slotDuration: "45",
    subject: "Duty",
    teacher: "Admin Team",
    room: "Front Desk",
  },
  {
    id: 3,
    timetableName: "Exam Session Timetable",
    schoolName: "Sunrise High",
    day: "Wednesday",
    startTime: "10:00",
    endTime: "11:00",
    slotDuration: "60",
    subject: "Physics",
    teacher: "Mrs. Clark",
    room: "Hall A",
  },
];

const slotLabels = ["08:00", "08:45", "09:30", "10:15", "11:00", "11:45"];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const AdminTimetablesPage = () => {
  const [schedules, setSchedules] = useState(initialSchedules);

  const handleSaveSchedule = (schedule) => {
    setSchedules((currentSchedules) => [
      {
        id: Date.now(),
        ...schedule,
      },
      ...currentSchedules,
    ]);
  };

  const gridItems = useMemo(
    () =>
      dayLabels.map((day, dayIndex) =>
        slotLabels.map((slot, slotIndex) => ({
          id: `${day}-${slot}`,
          day,
          time: slot,
          subject:
            slotIndex === 0
              ? "Assembly"
              : slotIndex === 1
                ? "Mathematics"
                : slotIndex === 2
                  ? "Science"
                  : slotIndex === 3
                    ? "English"
                    : slotIndex === 4
                      ? "ICT"
                      : "Activity",
          room: `R-${dayIndex + 1}${slotIndex + 1}`,
        })),
      ),
    [],
  );

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
            Admin workspace
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Timetable creator
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Create timetables, define time slots, and review how each schedule
            will look before saving it.
          </p>
        </div>

        <Link
          to="/admin"
          className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          Back to overview
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900">
            Create timetable and time slots
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Save all timetable details with a visible time slot setup.
          </p>
          <div className="mt-6">
            <AdminTimetableForm onSave={handleSaveSchedule} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
            <h3 className="text-xl font-semibold text-slate-900">
              Time slot preview
            </h3>
            <div className="mt-5 overflow-x-auto">
              <div className="min-w-[760px] rounded-3xl border border-slate-100 bg-sky-50 p-4">
                <div className="grid grid-cols-6 gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span>Day</span>
                  {slotLabels.map((slot) => (
                    <span key={slot}>{slot}</span>
                  ))}
                </div>
                <div className="mt-3 space-y-2">
                  {dayLabels.map((day) => (
                    <div key={day} className="grid grid-cols-6 gap-2">
                      <div className="rounded-2xl bg-white px-3 py-3 text-center text-sm font-semibold text-slate-900 shadow-sm">
                        {day}
                      </div>
                      {slotLabels.map((slot) => (
                        <div
                          key={`${day}-${slot}`}
                          className="rounded-2xl bg-white px-3 py-3 text-center text-xs text-slate-700 shadow-sm"
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
            <h3 className="text-xl font-semibold text-slate-900">
              Saved timetable drafts
            </h3>
            <div className="mt-5 space-y-4">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="rounded-3xl border border-slate-100 bg-sky-50 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-sky-500">
                    {schedule.schoolName}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-slate-900">
                    {schedule.timetableName}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {schedule.day} {schedule.startTime} - {schedule.endTime} •{" "}
                    {schedule.subject} with {schedule.teacher} in{" "}
                    {schedule.room}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
            <h3 className="text-xl font-semibold text-slate-900">
              Visual slot grid
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {gridItems.slice(0, 6).map((slot) => (
                <div key={slot.id} className="rounded-2xl bg-sky-50 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-sky-500">
                    {slot.day} • {slot.time}
                  </p>
                  <h4 className="mt-2 font-semibold text-slate-900">
                    {slot.subject}
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">{slot.room}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminTimetablesPage;
