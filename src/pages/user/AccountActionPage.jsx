import React from "react";
import { Link } from "react-router-dom";

const copy = {
  create: {
    title: "Create your account",
    description:
      "Set up your timetable workspace so you can save subjects, rooms, and scheduling preferences.",
    button: "Continue to create account",
  },
  signup: {
    title: "Sign up for timetable access",
    description:
      "Join the timetable generator and start building schedules with a simple onboarding flow.",
    button: "Continue to sign up",
  },
};

const AccountActionPage = ({ mode }) => {
  const content = copy[mode] ?? copy.create;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white px-6 py-10 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-2xl items-center">
        <div className="w-full rounded-[2rem] border border-sky-100 bg-white p-8 shadow-2xl shadow-sky-100/70 backdrop-blur-sm sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-500">
            Timetable Generator
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            {content.description}
          </p>

          <div className="mt-8 rounded-3xl border border-sky-100 bg-sky-50 p-6">
            <p className="text-sm text-slate-600">
              This is a landing-step page for your future authentication form.
              You can connect it to Firebase, Supabase, or your own backend
              next.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600">
              {content.button}
            </button>
            <Link
              to="/"
              className="rounded-2xl border border-sky-200 bg-white px-6 py-3 text-center text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountActionPage;
