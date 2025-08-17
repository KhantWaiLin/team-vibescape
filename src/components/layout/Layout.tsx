import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[var(--color-light-surface)]">
      {/* Header - Fixed full width */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Header onSidebarToggle={toggleSidebar} />
      </div>

      {/* Sidebar - Fixed with calculated height */}
      <div className="fixed top-[74px] left-0 h-[calc(100vh-4rem)] z-50">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Main content - With top padding for fixed header */}
        <main className="flex-1 overflow-y-auto p-6 mt-16">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
