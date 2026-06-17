import React, { useState } from "react";

const initialFormState = {
  schoolName: "",
  fullName: "",
  email: "",
  role: "user",
  status: "active",
  password: "",
  confirmPassword: "",
};

const AdminAccountForm = ({
  initialData,
  submitLabel = "Save account",
  allowPasswordReset = false,
}) => {
  const [formData, setFormData] = useState({
    ...initialFormState,
    ...initialData,
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (passwordError && (name === "password" || name === "confirmPassword")) {
      setPasswordError("");
    }

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const passwordEntered = Boolean(
      formData.password || formData.confirmPassword,
    );

    if (allowPasswordReset && !passwordEntered) {
      setPasswordError("");
      return;
    }

    if (passwordEntered && formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
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
            htmlFor="fullName"
          >
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="role"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          >
            <option value="user">User</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
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
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="password"
          >
            {allowPasswordReset ? "Reset password" : "Password"}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required={!allowPasswordReset}
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder={
              allowPasswordReset
                ? "Leave blank to keep the current password"
                : "Create a secure password"
            }
          />
          {allowPasswordReset ? (
            <p className="mt-2 text-xs text-slate-500">
              Admins can reset the user password without the old password.
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="confirmPassword"
          >
            {allowPasswordReset ? "Confirm reset password" : "Confirm password"}
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required={!allowPasswordReset}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder={
              allowPasswordReset ? "Repeat new password" : "Repeat password"
            }
          />
        </div>

        {passwordError ? (
          <div className="sm:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {passwordError}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          {submitLabel}
        </button>
        <button
          type="reset"
          onClick={() => {
            setFormData({
              ...initialFormState,
              ...initialData,
            });
            setPasswordError("");
          }}
          className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          Clear form
        </button>
      </div>
    </form>
  );
};

export default AdminAccountForm;
