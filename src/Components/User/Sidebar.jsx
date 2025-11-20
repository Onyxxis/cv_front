import React, { useState, useRef, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Modal} from "./AddCv/Modal";
import {
  FiHome,
  FiLayout,
  FiMessageCircle,
  FiPlus,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import logo from "../../assets/logo-min.png";
import logok from "../../assets/logok.png";

const Sidebar = ({ isCollapsed, setIsCollapsed, modalRef }) => {
  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/utilisateur/tableau_de_bord" },
    { icon: FiLayout, label: "Mes CV", path: "/utilisateur/mes_cvs" },
    { icon: FiMessageCircle, label: "Conseils", path: "/utilisateur/conseils" },
    { icon: FiSettings, label: "Paramètres", path: "/utilisateur/parametre" },
  ];
  const navigate = useNavigate();
  // const modalRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const username = user?.username || " ";


  const getAvatarText = (username, imageUrl) => {
    if (imageUrl) return { type: "image", src: imageUrl };

    if (!username || !username.trim()) return { type: "text", initials: "?" };

    const words = username.trim().split(" ").filter(Boolean);
    let initials = "";
    if (words.length === 1) {
      initials = words[0][0]?.toUpperCase() || "?";
    } else {
      initials = (words[0][0]?.toUpperCase() || "?") + (words[1][0]?.toUpperCase() || "?");
    }
    return { type: "text", initials };
  };


  const avatar = getAvatarText(username, user?.imageUrl);


  return (
    <div
      className={`bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 ease-in-out flex flex-col fixed h-screen ${isCollapsed ? "w-24" : "w-52"
        }`}
    >

      <div className="p-4 border-b border-white">
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-4"}`}>
          <img
            src={isCollapsed ? logok : logo}
            alt="Logo"
            className={`${isCollapsed ? "h-10 w-auto" : "h-16 w-auto"}`}
          />
        </div>

        <NavLink
          onClick={() => modalRef.current.openModal("create")}
          className={`mt-4 w-full bg-blue-900 hover:bg-blue-600 text-white rounded-xl py-3 px-2 flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl ${isCollapsed ? "px-2 mt-6" : ""
            }`}
        >
          <FiPlus className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Nouveau CV</span>}
        </NavLink>
       </div>
      

      <div className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 ${isActive
                ? "bg-white text-blue-900 shadow-md"
                : "text-blue-100 bg-blue-900 hover:bg-white hover:text-blue-900"
              } ${isCollapsed ? "justify-center px-3" : ""}`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </div>

      <div className="p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center py-2 text-blue-100 hover:bg-blue-800 rounded-xl transition-all duration-200"
        >
          {isCollapsed ? (
            <FaArrowCircleRight className="w-6 h-6" />
          ) : (
            <>
              <FaArrowCircleLeft className="w-6 h-6" />
              <span className="ml-2 font-medium text-sm">Réduire</span>
            </>
          )}
        </button>
      </div>

      {/* Profil utilisateur */}
      <div className="p-4 border-t border-blue-700 space-y-3">
        <div className={`flex items-center space-x-3 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center shadow-md overflow-hidden">
            {avatar.type === "image" ? (
              <img src={avatar.src} alt={username} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-semibold text-sm">{avatar.initials}</span>
            )}
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{user?.username || "Utilisateur"}</p>
              <p className="text-blue-200 text-xs truncate">{user?.email || "email@exemple.com"}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full flex items-center space-x-3 py-3 px-4 text-blue-100 hover:bg-blue-800 rounded-xl transition-all duration-200"
        >
          <FiLogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium text-sm">Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
