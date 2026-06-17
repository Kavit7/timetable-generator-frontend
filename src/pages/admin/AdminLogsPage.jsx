import React, { useState } from "react";

const initialLogs = [
  {
    id: 1,
    action: "Blocked account",
    user: "Alicia Brown",
    detail: "Account disabled after repeated sign-in issues.",
    time: "Today, 10:20 AM",
  },
  {
    id: 2,
    action: "Recovered account",
    user: "John Doe",
    detail: "Password reset and access restored by admin.",
    time: "Today, 9:05 AM",
  },
  {
    id: 3,
    action: "Saved timetable",
    user: "Mary Smith",
    detail: "Weekly timetable published for class 10A.",
    time: "Yesterday, 4:30 PM",
  },
];

const AdminLogsPage = () => {
  const [logs] = useState(initialLogs);

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
          Admin workspace
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Activity logs
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Keep every important admin action saved here so nothing is missed.
        </p>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sky-500">
                  {log.action}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {log.user}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {log.detail}
                </p>
              </div>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                {log.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminLogsPage;
