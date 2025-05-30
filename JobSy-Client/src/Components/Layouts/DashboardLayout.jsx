import { _useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../UserDashboard/Sidebar";
import Header from "../UserDashboard/Header";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar - fixed on the left */}
      <aside className="fixed top-0 left-0 w-64 h-full z-40 bg-white border-r shadow">
        <Sidebar />
      </aside>

      {/* Main content area (Header + content) */}
      <div className="flex flex-col flex-1 ml-64">

        {/* Header - fixed at the top */}
        <header className="fixed top-0 left-64 right-0 z-30">
          <Header />
        </header>

        {/* Content - scrollable area */}
        <main className="mt-16 p-4 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;
