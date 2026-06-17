import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-sky-100 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
              Timetable Generator
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Build a smarter class schedule
            </h1>
          </div>

          <Link
            to="/create-account"
            className="rounded-full border border-sky-200 bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
          >
            Create account
          </Link>
        </header>

        <main className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <section>
            <div className="mb-6 inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm text-sky-700">
              Plan classes, breaks, labs, and exams in one place.
            </div>

            <h2 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
              Generate a timetable that actually fits your day.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Create your account, save your subjects, and generate schedules
              faster with a cleaner workflow for students and staff.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/create-account"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                Create account
              </Link>
              <Link
                to="/sign-in"
                className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Fast setup", "Add subjects and preferences in minutes."],
                ["Cleaner output", "See a simple schedule view right away."],
                ["Always accessible", "Open your timetable from any device."],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100/60"
                >
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-sky-100 bg-white p-6 shadow-2xl shadow-sky-100/70 backdrop-blur-sm sm:p-8">
            <div className="rounded-3xl border border-sky-100 bg-sky-50 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-sky-500">
                Quick actions
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                Start in seconds
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Choose an action below to move into account creation or sign up
                without hunting through menus.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/create-account"
                  className="flex items-center justify-between rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm font-medium text-sky-700 transition hover:bg-sky-50"
                >
                  Create account <span>→</span>
                </Link>
                <Link
                  to="/sign-in"
                  className="flex items-center justify-between rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
                >
                  Sign in <span>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Landing;
