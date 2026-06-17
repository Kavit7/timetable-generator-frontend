import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialAccounts = [
  {
    id: 1,
    schoolName: "Greenfield Academy",
    fullName: "John Doe",
    email: "john@example.com",
    role: "Teacher",
    status: "Active",
  },
  {
    id: 2,
    schoolName: "Sunrise High",
    fullName: "Mary Smith",
    email: "mary@example.com",
    role: "Admin",
    status: "Pending",
  },
  {
    id: 3,
    schoolName: "Riverdale School",
    fullName: "Alicia Brown",
    email: "alicia@example.com",
    role: "User",
    status: "Disabled",
  },
];

const AdminAccountsPage = () => {
  const [accounts, setAccounts] = useState(initialAccounts);

  const updateAccountStatus = (accountId, status) => {
    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === accountId ? { ...account, status } : account,
      ),
    );
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
            Admin workspace
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Accounts
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Review, update, and manage all created accounts from one place.
          </p>
        </div>

        <Link
          to="/admin/accounts/new"
          className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Create account
        </Link>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-sm shadow-slate-100/50">
        <div className="min-w-[1100px]">
          <div className="grid grid-cols-5 gap-4 border-b border-slate-100 px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            <span>School</span>
            <span>Name</span>
            <span>Email</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-slate-100">
            {accounts.map((account) => {
              const isBlocked = account.status === "Blocked";

              return (
                <div
                  key={account.id}
                  className="grid grid-cols-5 gap-4 px-6 py-4 text-sm text-slate-700"
                >
                  <span className="font-medium text-slate-900">
                    {account.schoolName}
                  </span>
                  <span>{account.fullName}</span>
                  <span>{account.email}</span>
                  <span>
                    <span
                      className={[
                        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                        isBlocked
                          ? "bg-rose-50 text-rose-700"
                          : account.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700",
                      ].join(" ")}
                    >
                      {account.status}
                    </span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/admin/accounts/${account.id}/timetables`}
                      className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                    >
                      Timetables
                    </Link>
                    <Link
                      to="/admin/accounts/profile"
                      className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to={`/admin/accounts/${account.id}/edit`}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
                    >
                      Edit / Reset
                    </Link>
                    {isBlocked ? (
                      <button
                        type="button"
                        onClick={() =>
                          updateAccountStatus(account.id, "Active")
                        }
                        className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                      >
                        Recover
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          updateAccountStatus(account.id, "Blocked")
                        }
                        className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                      >
                        Block
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAccountsPage;
