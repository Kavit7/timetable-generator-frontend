import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const summaryCards = [
    {
      title: "Timetable flow",
      count: "05",
      text: "Step-by-step wizard for importing and generating timetables.",
    },
    {
      title: "Teaching plans",
      count: "8",
      text: "Teaching assignments prepared for staff.",
    },
    {
      title: "Duty rosters",
      count: "6",
      text: "Duty schedules updated and ready to review.",
    },
    {
      title: "Exam schedules",
      count: "4",
      text: "Exam planning items organized cleanly.",
    },
  ];

  const recentTasks = [
    "Imported class, teacher, and subject data",
    "Selected study days and set session times",
    "Removed scheduling conflicts before generation",
    "Updated teaching allocation for the math department",
    "Added duty roster for the morning shift",
    "Prepared the next exam schedule draft",
  ];

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
          Workspace
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Dashboard
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          This page shows a quick summary of the flow and saved work inside the
          system so you can check progress at a glance.
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Timetable generator flow
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Open the wizard to upload Excel data, pick study days, define
              sessions, remove conflicts, and preview time slots before backend
              integration.
            </p>
          </div>
          <Link
            to="/dashboard/timetable"
            className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
          >
            Open timetable wizard
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
        <h3 className="text-xl font-semibold text-slate-900">
          Recent activity
        </h3>
        <div className="mt-5 space-y-3">
          {recentTasks.map((task) => (
            <div
              key={task}
              className="rounded-2xl bg-sky-50 px-4 py-3 text-sm text-slate-700"
            >
              {task}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
