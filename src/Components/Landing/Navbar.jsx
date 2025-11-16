import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/40 backdrop-blur-lg shadow-neutral-50 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo à gauche */}
        <div className="navbar-logo">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-14 w-auto"  
          />
        </div>

        {/* Liens de navigation à droite */}
        <ul className="flex items-center space-x-8 text-xl">
          <li>
            <a 
              href="/" 
              className="text-blue-900 font-medium hover:text-blue-700 transition duration-200"
            >
              Accueil
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className="text-blue-900 font-medium hover:text-blue-700 transition duration-200"
            >
              À propos
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              className="text-blue-900 font-medium hover:text-blue-700 transition duration-200"
            >
              Services
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="text-blue-900 font-medium hover:text-blue-700 transition duration-200"
            >
              Contact
            </a>
          </li>
          <li>
            <button 
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-blue-900 to-pink-600 text-white font-medium px-6 py-2 rounded-lg hover:from-blue-800 hover:to-pink-500 transition duration-300 transform hover:scale-105 shadow-md"
            >
               
               Se connecter
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;