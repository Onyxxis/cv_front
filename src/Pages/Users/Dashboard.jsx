// import React, { useState, useRef } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../../Components/User/Sidebar";
// import { Modal } from "../../Components/User/AddCv/Modal";

// export default function Dashboard() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const modalRef = useRef();

//   return (
//     <div className="flex h-screen bg-gradient-to-b from-white to-white">
//       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} modalRef={modalRef} />
//       <Modal ref={modalRef} />

//       <main
//         className={`flex-1 overflow-auto border border-r-white transition-all duration-300 ${isCollapsed ? "ml-22" : "ml-52"
//           }`}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// }

import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/User/Sidebar";
import { Modal } from "../../Components/User/AddCv/Modal";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const modalRef = useRef();

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        modalRef={modalRef}
      />

      <Modal ref={modalRef} />

      {/* Main content */}
      <main
        className={`
          flex-1 overflow-auto transition-all duration-300
          pt-14 md:pt-0
          ${isCollapsed ? "md:ml-1" : "md:ml-2"}
        `}
      >
        {/* Mobile header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center px-4 z-30">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-xl"
          >
            ☰
          </button>
          <span className="ml-4 font-semibold">Dashboard</span>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
