import React from "react";
import { Link, useParams } from "react-router-dom";
import AdminAccountForm from "./forms/AdminAccountForm";

const sampleAccounts = {
  1: {
    schoolName: "Greenfield Academy",
    fullName: "John Doe",
    email: "john@example.com",
    role: "teacher",
    status: "active",
  },
  2: {
    schoolName: "Sunrise High",
    fullName: "Mary Smith",
    email: "mary@example.com",
    role: "admin",
    status: "pending",
  },
};

const AdminAccountEditPage = () => {
  const { accountId } = useParams();
  const initialData = sampleAccounts[accountId] ?? sampleAccounts["1"];

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
            Admin workspace
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Edit account
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Update the selected account details and reset the password when
            needed.
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
        <AdminAccountForm
          initialData={initialData}
          submitLabel="Update account"
          allowPasswordReset
        />
      </div>
    </section>
  );
};

export default AdminAccountEditPage;
