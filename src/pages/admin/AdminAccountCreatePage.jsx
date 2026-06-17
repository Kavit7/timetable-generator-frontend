import React from "react";
import { Link } from "react-router-dom";
import AdminAccountForm from "./forms/AdminAccountForm";

const AdminAccountCreatePage = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
            Admin workspace
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Create account
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Add a new account for staff, teachers, or admins and keep access
            settings organized.
          </p>
        </div>

        <Link
          to="/admin/accounts"
          className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          Back to accounts
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
        <AdminAccountForm />
      </div>
    </section>
  );
};

export default AdminAccountCreatePage;
