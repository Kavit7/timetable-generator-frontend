import React from "react";

const WorkspacePage = ({ title, description, items, actionLabel }) => {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
          Workspace
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 sm:p-8">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              {actionLabel}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Use this section to manage the selected workspace task.
            </p>
          </div>
          <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
            Save
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-3xl bg-sky-50 p-5">
              <h4 className="font-semibold text-slate-900">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkspacePage;
