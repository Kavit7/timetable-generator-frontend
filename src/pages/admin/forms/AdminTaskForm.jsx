import React, { useState } from "react";

const initialTaskState = {
  title: "",
  category: "Account",
  priority: "High",
  status: "Pending",
  description: "",
};

const AdminTaskForm = ({ onSave }) => {
  const [formData, setFormData] = useState(initialTaskState);

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
    setFormData(initialTaskState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="title"
          >
            Task title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Fix user password issue"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          >
            <option value="Account">Account</option>
            <option value="Timetable">Timetable</option>
            <option value="Teaching">Teaching</option>
            <option value="Duty">Duty</option>
            <option value="Exam">Exam</option>
            <option value="Log">Log</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="priority"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="status"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Describe what needs to be fixed or saved."
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Save task
        </button>
        <button
          type="reset"
          onClick={() => setFormData(initialTaskState)}
          className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          Clear form
        </button>
      </div>
    </form>
  );
};

export default AdminTaskForm;
