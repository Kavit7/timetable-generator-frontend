import React from "react";

const ProfilePage = () => {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
          Account
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Profile
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          View and manage the signed-in user profile details from this page.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-500">
              Active user
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">
              School Admin
            </h3>
            <p className="mt-2 text-sm text-slate-600">admin@timetable.com</p>
          </div>

          <div className="rounded-3xl bg-sky-50 px-5 py-4 text-sm text-slate-700">
            Profile settings can be added here later.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
