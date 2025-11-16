import React, { useState, useRef  } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/User/Sidebar";
import { Modal } from "../../Components/User/AddCv/Modal";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const modalRef = useRef();

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-900 to-blue-800">
       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} modalRef={modalRef} />
      <Modal ref={modalRef} />

       <main
        className={`flex-1 overflow-auto border border-r-blue-900 transition-all duration-300 ${
          isCollapsed ? "ml-22" : "ml-52"
        }`}
      >
        <Outlet  />
      </main>
    </div>
  );
}
