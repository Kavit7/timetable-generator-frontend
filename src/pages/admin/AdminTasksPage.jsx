import React, { useState } from "react";
import AdminTaskForm from "./forms/AdminTaskForm";

const initialTasks = [
  {
    id: 1,
    title: "Reset password for John Doe",
    category: "Account",
    priority: "High",
    status: "Pending",
    description: "User cannot sign in and needs password reset.",
  },
  {
    id: 2,
    title: "Fix timetable clash for Class 10A",
    category: "Timetable",
    priority: "High",
    status: "In Progress",
    description: "Two subjects overlap on Tuesday morning.",
  },
  {
    id: 3,
    title: "Recover blocked staff account",
    category: "Account",
    priority: "Medium",
    status: "Resolved",
    description: "Blocked account restored after review.",
  },
];

const AdminTasksPage = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleSaveTask = (task) => {
    setTasks((currentTasks) => [
      {
        id: Date.now(),
        ...task,
      },
      ...currentTasks,
    ]);
  };

  const updateTaskStatus = (taskId, status) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      ),
    );
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
          Admin workspace
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Tasks and service requests
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Save every admin task that needs action, then mark it as resolved
          after fixing it.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900">
            Add a new task
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Record issues, fixes, and service requests here.
          </p>
          <div className="mt-6">
            <AdminTaskForm onSave={handleSaveTask} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900">
            Current tasks
          </h3>
          <div className="mt-5 space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-3xl border border-slate-100 bg-sky-50 p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-sky-500">
                      {task.category} • {task.priority}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-slate-900">
                      {task.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {task.description}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {task.status}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updateTaskStatus(task.id, "Resolved")}
                    className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    Fix / Resolve
                  </button>
                  <button
                    type="button"
                    onClick={() => updateTaskStatus(task.id, "In Progress")}
                    className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                  >
                    Mark working
                  </button>
                  <button
                    type="button"
                    onClick={() => updateTaskStatus(task.id, "Pending")}
                    className="rounded-full bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-200"
                  >
                    Save for later
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminTasksPage;
