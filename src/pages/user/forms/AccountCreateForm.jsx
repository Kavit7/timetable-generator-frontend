import React, { useState } from "react";

const initialFormState = {
  schoolName: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  logo: null,
};

const AccountCreateForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [fileName, setFileName] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (passwordError && (name === "password" || name === "confirmPassword")) {
      setPasswordError("");
    }

    if (name === "logo") {
      const selectedFile = files?.[0] ?? null;
      setFormData((currentForm) => ({
        ...currentForm,
        logo: selectedFile,
      }));
      setFileName(selectedFile ? selectedFile.name : "");
      return;
    }

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
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
            placeholder="john@example.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Create a secure password"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Re-enter your password"
          />
        </div>

        {passwordError ? (
          <div className="sm:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {passwordError}
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-sm font-medium text-slate-700"
            htmlFor="logo"
          >
            Logo <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full cursor-pointer rounded-2xl border border-dashed border-sky-200 bg-sky-50 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-sky-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:bg-sky-100"
          />
          <p className="mt-2 text-xs text-slate-500">
            Upload a school logo if you have one. Otherwise, leave it blank.
          </p>
          {fileName ? (
            <p className="mt-2 text-xs font-medium text-sky-600">
              Selected file: {fileName}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Create account
        </button>
        <button
          type="reset"
          onClick={() => {
            setFormData(initialFormState);
            setFileName("");
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

export default AccountCreateForm;
