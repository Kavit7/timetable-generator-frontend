import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Create Timetable", to: "/dashboard/timetable" },
  { label: "Teaching", to: "/dashboard/teaching" },
  { label: "Duty", to: "/dashboard/duty" },
  { label: "Exams", to: "/dashboard/exams" },
  { label: "Profile", to: "/dashboard/profile" },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout()
    navigate("/sign-in");
  };

  return (
    <aside className="w-full shrink-0 border-b border-sky-100 bg-sky-50 px-4 py-5 sm:h-full sm:w-72 sm:border-b-0 sm:border-r sm:px-6 sm:py-6">
      <div className="flex h-full flex-col p-1">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
          Menu
        </p>
        <nav className="mt-4 grid gap-2 sm:mt-5">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-sky-100 text-sky-800"
                    : "text-slate-700 hover:bg-sky-100 hover:text-sky-800",
                ].join(" ")
              }
            >
              <span>{item.label}</span>
              <span className="text-sky-600">→</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-sky-100 pt-4 sm:pt-5">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
