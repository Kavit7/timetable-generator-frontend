import React, { useState } from "react";

const initialFormState = {
  timetableName: "",
  schoolName: "",
  weekLabel: "",
  room: "",
  startTime: "08:00",
  endTime: "15:00",
  slotDuration: "45",
  subject: "",
  teacher: "",
  day: "Monday",
  notes: "",
};

const AdminTimetableForm = ({ onSave }) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(formData);
    setFormData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="timetableName"
          >
            Timetable name
          </label>
          <input
            id="timetableName"
            name="timetableName"
            type="text"
            required
            value={formData.timetableName}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Class 10A Weekly Timetable"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="schoolName"
          >
            School name
          </label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            required
            value={formData.schoolName}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Greenfield Academy"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="weekLabel"
          >
            Week label
          </label>
          <input
            id="weekLabel"
            name="weekLabel"
            type="text"
            required
            value={formData.weekLabel}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Week 1 / Term 2"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="room"
          >
            Room
          </label>
          <input
            id="room"
            name="room"
            type="text"
            required
            value={formData.room}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Room 4A"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="day"
          >
            Day
          </label>
          <select
            id="day"
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          >
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="startTime"
          >
            Start time
          </label>
          <input
            id="startTime"
            name="startTime"
            type="time"
            required
            value={formData.startTime}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="endTime"
          >
            End time
          </label>
          <input
            id="endTime"
            name="endTime"
            type="time"
            required
            value={formData.endTime}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="slotDuration"
          >
            Slot duration (minutes)
          </label>
          <select
            id="slotDuration"
            name="slotDuration"
            value={formData.slotDuration}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          >
            {[
              { label: "30 mins", value: "30" },
              { label: "45 mins", value: "45" },
              { label: "60 mins", value: "60" },
            ].map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Mathematics"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="teacher"
          >
            Teacher
          </label>
          <input
            id="teacher"
            name="teacher"
            type="text"
            required
            value={formData.teacher}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Mr. Smith"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="notes"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Add rules for the slot, room, or timetable."
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Save timetable
        </button>
        <button
          type="reset"
          onClick={() => setFormData(initialFormState)}
          className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          Clear form
        </button>
      </div>
    </form>
  );
};

export default AdminTimetableForm;
