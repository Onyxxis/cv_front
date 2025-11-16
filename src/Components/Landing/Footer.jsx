import React, { useState } from 'react';
import logo from "../../assets/logo-min.png";


const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gérer l'abonnement à la newsletter
        console.log('Email submitted:', email);
        setEmail('');
        alert('Merci pour votre abonnement !');
    };

    return (
        <footer className="text-white border-none">
            {/* Newsletter Section */}
            {/* <div className="w-full bg-gradient-to-b from-white to-blue-900"> */}
                <div className="w-full bg-gradient-to-b from-white to-blue-900 py-12 px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">

                    {/* Texte à gauche */}
                    <div className="text-center lg:text-left lg:flex-1">
                        <h3 className="text-2xl font-bold mb-4 bg-blue-900 bg-clip-text text-transparent">
                            Restez Informé
                        </h3>
                        <p className="text-gray-300 max-w-md">
                            Recevez les dernières nouvelles et mises à jour de Kauza directement dans votre boîte mail.
                        </p>
                    </div>

                    {/* Formulaire à droite */}
                    <form onSubmit={handleSubmit} className="flex gap-3 flex-1 max-w-md">
                        <input
                            type="email"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            S'abonner
                        </button>
                    </form>
                </div>
            {/* </div> */}



            {/* Main Footer Content */}
            <div className=" bg-blue-900 w-full  px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-16 w-auto" // Ajustez la hauteur selon votre logo
                            />
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Contacter le support pour souscrire a l'offre de profil Kauza
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                            Contact
                        </button>
                    </div>

                    {/* Adresses Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Nos Adresses</h4>
                        <div className="space-y-4">

                            <div>
                                <h5 className="font-medium text-blue-400 mb-2">R&D & Marketing</h5>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Lomé Addogome yokoe Grand Défi<br />
                                    04BP789
                                </p>
                            </div>
                            {/* <div>
                                <h5 className="font-medium text-blue-400 mb-2">Côte d'Ivoire</h5>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Urielle Group, Abidjan<br />
                                    Cocody Angré, Djibi en haut de Coris Bank
                                </p>
                            </div> */}
                        </div>
                    </div>

                    {/* Liens du site */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Navigation</h4>
                        <ul className="space-y-3">
                            {['Accueil', 'Fonctionnalités', 'Offre'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Autres Liens */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Liens Utiles</h4>
                        <ul className="space-y-3">
                            {[
                                'Articles',
                                'Pricing',
                                'Questions fréquentes',
                                'Terms & Conditions'
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 bg-blue-900 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} Kauza. Tous droits réservés.
                        </div>
                        {/* <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;