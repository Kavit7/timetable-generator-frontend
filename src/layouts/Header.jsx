import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white px-6 py-4 sm:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
          Timetable Generator
        </p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
          Main workspace
        </h1>
      </div>
    </header>
  );
};

export default Header;
