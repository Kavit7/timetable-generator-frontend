import React from "react";

const Splash = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-sky-50 to-white text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.35),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(186,230,253,0.55),_transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(186,230,253,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(186,230,253,0.35)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl rounded-[2rem] border border-sky-100 bg-white px-8 py-10 text-center shadow-2xl shadow-sky-100/70 backdrop-blur-xl sm:px-10 sm:py-12">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-200 via-sky-300 to-cyan-300 text-3xl font-black text-sky-900 shadow-[0_0_0_8px_rgba(186,230,253,0.35)]">
            T
          </div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-sky-600">
            Smart timetable builder
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Building your schedule
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
            Organizing subjects, balancing sessions, and preparing a cleaner
            timetable view.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["Subjects", "Rooms", "Time slots"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-600">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-400" />
            </span>
            Preparing your timetable experience
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-sky-300 [animation-delay:-0.3s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-sky-400 [animation-delay:-0.15s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-300" />
          </div>

          <div className="mt-10 h-1.5 overflow-hidden rounded-full bg-sky-100">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-sky-300 via-sky-400 to-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
