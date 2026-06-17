import React from "react";
import Landing from "../pages/user/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountCreatePage from "../pages/user/AccountCreatePage";
import AccountSignin from "../pages/user/AccountSignin";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/user/Dashboard";
import TimetableWizardPage from "../pages/user/TimetableWizardPage";
import ProfilePage from "../pages/user/ProfilePage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminAccountsPage from "../pages/admin/AdminAccountsPage";
import AdminAccountCreatePage from "../pages/admin/AdminAccountCreatePage";
import AdminAccountProfilePage from "../pages/admin/AdminAccountProfilePage";
import AdminAccountEditPage from "../pages/admin/AdminAccountEditPage";
import AdminAccountTimetablesPage from "../pages/admin/AdminAccountTimetablesPage";
import AdminTasksPage from "../pages/admin/AdminTasksPage";
import AdminLogsPage from "../pages/admin/AdminLogsPage";
import AdminTimetablesPage from "../pages/admin/AdminTimetablesPage";
import WorkspacePage from "../pages/user/WorkspacePage";
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create-account" element={<AccountCreatePage />} />
        <Route path="/sign-in" element={<AccountSignin />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/timetable"
            element={<TimetableWizardPage />}
          />
          <Route
            path="/dashboard/teaching"
            element={
              <WorkspacePage
                title="Teaching"
                actionLabel="Teaching plan"
                description="Track teaching assignments and organize subject coverage for staff."
                items={[
                  {
                    title: "Teachers",
                    description: "Manage teacher allocations.",
                  },
                  {
                    title: "Subjects",
                    description: "Link teachers to subjects.",
                  },
                  {
                    title: "Sessions",
                    description: "Plan teaching sessions cleanly.",
                  },
                ]}
              />
            }
          />
          <Route
            path="/dashboard/duty"
            element={
              <WorkspacePage
                title="Duty"
                actionLabel="Duty roster"
                description="Create and review duty assignments across the school schedule."
                items={[
                  {
                    title: "Staff",
                    description: "Assign available staff members.",
                  },
                  {
                    title: "Dates",
                    description: "Organize duty dates and shifts.",
                  },
                  {
                    title: "Notes",
                    description: "Add duty instructions when needed.",
                  },
                ]}
              />
            }
          />
          <Route
            path="/dashboard/exams"
            element={
              <WorkspacePage
                title="Exams"
                actionLabel="Exam schedule"
                description="Prepare exam timetables and keep assessment planning structured."
                items={[
                  {
                    title: "Subjects",
                    description: "List exam subjects clearly.",
                  },
                  {
                    title: "Rooms",
                    description: "Assign rooms for each paper.",
                  },
                  { title: "Dates", description: "Set exam dates and times." },
                ]}
              />
            }
          />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/timetables" element={<AdminTimetablesPage />} />
          <Route path="/admin/accounts" element={<AdminAccountsPage />} />
          <Route
            path="/admin/accounts/new"
            element={<AdminAccountCreatePage />}
          />
          <Route
            path="/admin/accounts/profile"
            element={<AdminAccountProfilePage />}
          />
          <Route
            path="/admin/accounts/:accountId/edit"
            element={<AdminAccountEditPage />}
          />
          <Route
            path="/admin/accounts/:accountId/timetables"
            element={<AdminAccountTimetablesPage />}
          />
          <Route path="/admin/tasks" element={<AdminTasksPage />} />
          <Route path="/admin/logs" element={<AdminLogsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
