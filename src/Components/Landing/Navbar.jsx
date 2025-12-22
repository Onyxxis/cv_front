// import React from "react";
// import logo from "../../assets/logo.png";
// import { useNavigate } from "react-router-dom";


// const Navbar = () => {
//     const navigate = useNavigate();

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white/40 backdrop-blur-lg shadow-neutral-50 z-50 px-6 py-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo à gauche */}
//         <div className="navbar-logo">
//           <img 
//             src={logo} 
//             alt="Logo" 
//             className="h-14 w-auto"  
//           />
//         </div>

//         {/* Liens de navigation à droite */}
//         <ul className="flex items-center space-x-8 text-xl">
//           <li>
//             <a 
//               href="/" 
//               className="text-blue-900 font-medium hover:text-blue-700 transition duration-200"
//             >
//               Accueil
//             </a>
//           </li>
//           <li>
//             <a 
//               href="#about" 
//               className="text-blue-900 font-medium hover:text-blue-700 transition duration-200"
//             >
//               À propos
//             </a>
//           </li>
//           <li>
//             <a 
//               href="#services" 
//               className="text-blue-900 font-medium hover:text-blue-700 transition duration-200"
//             >
//               Services
//             </a>
//           </li>
//           <li>
//             <a 
//               href="#contact" 
//               className="text-blue-900 font-medium hover:text-blue-700 transition duration-200"
//             >
//               Contact
//             </a>
//           </li>
//           <li>
//             <button 
//             onClick={() => navigate("/login")}
//             className="bg-gradient-to-r from-blue-900 to-pink-600 text-white font-medium px-6 py-2 rounded-lg hover:from-blue-800 hover:to-pink-500 transition duration-300 transform hover:scale-105 shadow-md"
//             >
               
//                Se connecter
//             </button>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-lg  z-50 px-4 py-3 md:px-6 md:py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo à gauche */}
                <div className="navbar-logo flex items-center">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="h-10 w-auto md:h-14"  
                    />
                </div>

                {/* Menu Burger pour mobile */}
                <button 
                    onClick={toggleMenu}
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10"
                    aria-label="Menu"
                >
                    <span className={`block w-6 h-0.5 bg-blue-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-blue-900 my-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-blue-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>

                {/* Liens de navigation - Desktop */}
                <ul className="hidden md:flex items-center space-x-8 text-lg">
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
                            className="bg-gradient-to-r from-blue-900 to-pink-600 text-white font-medium px-6 py-2 rounded-lg hover:from-blue-800 hover:to-pink-500 transition duration-300 hover:scale-105 shadow-md"
                        >
                            Se connecter
                        </button>
                    </li>
                </ul>

                {/* Menu Mobile */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
                        <ul className="flex flex-col items-center py-6 space-y-6">
                            <li>
                                <a 
                                    href="/" 
                                    className="text-blue-900 font-medium hover:text-blue-700 transition duration-200 text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Accueil
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#about" 
                                    className="text-blue-900 font-medium hover:text-blue-700 transition duration-200 text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    À propos
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#services" 
                                    className="text-blue-900 font-medium hover:text-blue-700 transition duration-200 text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#contact" 
                                    className="text-blue-900 font-medium hover:text-blue-700 transition duration-200 text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </a>
                            </li>
                            <li className="pt-4">
                                <button 
                                    onClick={() => {
                                        navigate("/login");
                                        setIsMenuOpen(false);
                                    }}
                                    className="bg-gradient-to-r from-blue-900 to-pink-600 text-white font-medium px-8 py-3 rounded-lg hover:from-blue-800 hover:to-pink-500 transition duration-300 w-full"
                                >
                                    Se connecter
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;