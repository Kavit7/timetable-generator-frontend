import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-white text-slate-900">
      <AdminHeader />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden sm:flex-row">
        <AdminSidebar />
        <main className="min-h-0 flex-1 overflow-y-auto bg-white px-4 py-6 sm:px-8 sm:py-8">
          <div className="min-h-full bg-white">
            <Outlet />
          </div>
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
