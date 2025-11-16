import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";

export default function Dashboardadmin() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-900 to-blue-800">
       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

       <main
        className={`flex-1 overflow-auto border border-r-blue-900 transition-all duration-300 ${
          isCollapsed ? "ml-18" : "ml-52"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
