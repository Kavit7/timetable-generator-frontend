import React, { useState } from "react";

const initialFormState = {
  email: "",
  password: "",
};

const SignInForm = () => {
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
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

        <div>
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
            placeholder="Enter your password"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Sign in
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

export default SignInForm;
