import React from "react";

const AdminDashboard = () => {
  const summaryCards = [
    {
      title: "Total accounts",
      count: "248",
      text: "All user accounts stored in the system.",
    },
    {
      title: "Open tasks",
      count: "12",
      text: "Admin tasks waiting to be fixed or saved.",
    },
    {
      title: "Saved logs",
      count: "58",
      text: "Audit entries and activity history saved safely.",
    },
    {
      title: "Recovered accounts",
      count: "19",
      text: "Blocked users restored after admin review.",
    },
  ];

  const recentActions = [
    "Reset password for John Doe",
    "Blocked a suspended user account",
    "Recovered a teacher account after review",
    "Saved a timetable service request log",
  ];

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
          Admin workspace
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Overview
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Review the status of user accounts and keep track of the most recent
          admin operations from one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-100/50"
          >
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-sky-500">
              {card.title}
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-slate-900">
              {card.count}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
        <h3 className="text-xl font-semibold text-slate-900">
          Recent admin actions
        </h3>
        <div className="mt-5 space-y-3">
          {recentActions.map((action) => (
            <div
              key={action}
              className="rounded-2xl bg-sky-50 px-4 py-3 text-sm text-slate-700"
            >
              {action}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
