import React from "react";

const AdminAccountProfilePage = () => {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
          Admin workspace
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Account profile
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Inspect a single user account and update access details when needed.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-500">
              School
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              Greenfield Academy
            </h3>
            <p className="mt-2 text-sm text-slate-600">admin@greenfield.com</p>
          </div>
          <div className="rounded-3xl bg-sky-50 px-5 py-4 text-sm text-slate-700">
            Use this page for profile details, permissions, and activity logs.
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAccountProfilePage;
