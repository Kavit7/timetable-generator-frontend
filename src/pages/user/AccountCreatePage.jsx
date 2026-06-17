import React from "react";
import { Link } from "react-router-dom";
import AccountCreateForm from "./forms/AccountCreateForm";

const AccountCreatePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white px-6 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
              Timetable Generator
            </p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Create your account
            </h1>
          </div>

          <Link
            to="/"
            className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-50"
          >
            Back to home
          </Link>
        </div>

        <div className="rounded-[2rem] border border-sky-100 bg-white p-6 shadow-2xl shadow-sky-100/70 sm:p-8">
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Fill in the details below to create a timetable account. School
            name, full name, email, password, and confirm password are required.
            Logo upload is optional.
          </p>

          <div className="mt-8">
            <AccountCreateForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCreatePage;
