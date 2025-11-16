import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FiUserPlus, FiArrowLeft, FiUser, FiShield, FiStar, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Spinner = () => (
    <div className="flex justify-center items-center">
        {/* <div className="relative"> */}
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        {/* </div> */}
    </div>
);

export default function UserAdd() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user",
        ispremium: false,
    });
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (formData.role === "admin") {
            setFormData((prev) => ({ ...prev, ispremium: false }));
        }
    }, [formData.role]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleRoleSelect = (role) => {
        setFormData(prev => ({
            ...prev,
            role,
            ispremium: role === "admin" ? false : prev.ispremium
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axiosInstance.post("/users", formData);
            showPopup("Utilisateur ajouté avec succès", "success");
            setTimeout(() => {
                navigate("/admin/utilisateurs");
            }, 1500);
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            showPopup("Échec de l'ajout de l'utilisateur", "error");
        } finally {
            setLoading(false);
        }
    };

    const showPopup = (message, type) => {
        setPopup({ visible: true, message, type });
        setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-white flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                {/* <div className="flex justify-start mb-8">
                    <button
                        onClick={() => navigate("/admin/utilisateurs")}
                        className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 hover:text-blue-600 font-medium"
                    >
                        <FiArrowLeft size={20} />
                        Retour à la liste
                    </button>
                </div> */}


                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="flex justify-start ">
                        <button
                            onClick={() => navigate("/admin/utilisateurs")}
                            className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl  hover:shadow-lg transition-all duration-300 text-gray-600 hover:text-blue-600 font-medium"
                        >
                            <FiArrowLeft size={20} />
                        </button>
                    </div>

                    <div className="p-10">
                        <div className="text-center mb-10">

                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                Créer un Nouvel Utilisateur
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Remplissez les informations ci-dessous pour ajouter un nouvel utilisateur à votre plateforme
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Nom d'utilisateur *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-lg"
                                                placeholder="john_doe"
                                            />
                                            <FiUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Adresse email *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-lg"
                                                placeholder="john@example.com"
                                            />
                                            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Mot de passe *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-lg pr-12"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1"
                                            >
                                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Le mot de passe doit contenir au moins 8 caractères
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            Type de compte *
                                        </label>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div
                                                onClick={() => handleRoleSelect("user")}
                                                className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${formData.role === "user"
                                                    ? "border-blue-500 bg-blue-50 shadow-lg"
                                                    : "border-gray-300 bg-white hover:border-blue-300 hover:shadow-md"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-4 rounded-xl ${formData.role === "user"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-100 text-gray-600"
                                                        }`}>
                                                        <FiUser size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-semibold text-gray-900 text-lg">Utilisateur Standard</span>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            Accès aux fonctionnalités de base de la plateforme
                                                        </p>
                                                    </div>
                                                    {formData.role === "user" && (
                                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => handleRoleSelect("admin")}
                                                className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${formData.role === "admin"
                                                    ? "border-red-500 bg-red-50 shadow-lg"
                                                    : "border-gray-300 bg-white hover:border-red-300 hover:shadow-md"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-4 rounded-xl ${formData.role === "admin"
                                                        ? "bg-red-500 text-white"
                                                        : "bg-gray-100 text-gray-600"
                                                        }`}>
                                                        <FiShield size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-semibold text-gray-900 text-lg">Administrateur</span>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            Accès complet à toutes les fonctionnalités et paramètres
                                                        </p>
                                                    </div>
                                                    {formData.role === "admin" && (
                                                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {formData.role === "user" && (
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-amber-100 rounded-xl">
                                                        <FiStar className="text-amber-600" size={24} />
                                                    </div>
                                                    <div>
                                                        <label className="block font-semibold text-gray-900 text-lg">
                                                            Compte Premium
                                                        </label>
                                                        <p className="text-sm text-gray-600">
                                                            Accès aux fonctionnalités avancées et exclusives
                                                        </p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="ispremium"
                                                        checked={formData.ispremium}
                                                        onChange={handleChange}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    {formData.role === "admin" && (
                                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-red-100 rounded-xl">
                                                    <FiShield className="text-red-600" size={24} />
                                                </div>
                                                <div>
                                                    <label className="block font-semibold text-gray-900 text-lg">
                                                        Compte Administrateur
                                                    </label>
                                                    <p className="text-sm text-gray-600">
                                                        Les administrateurs ont automatiquement tous les privilèges,
                                                        l'option Premium n'est pas disponible.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Spinner className="text-blue-900" />
                                            <span>Création en cours...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiUserPlus size={24} />
                                            <span>Créer l'utilisateur</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {popup.visible && (
                    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl border-l-4 ${popup.type === "success"
                        ? "bg-green-50 text-green-800 border-green-500"
                        : "bg-red-50 text-red-800 border-red-500"
                        } animate-slide-down max-w-md w-full`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${popup.type === "success" ? "bg-green-500" : "bg-red-500"
                                } text-white font-bold`}>
                                {popup.type === "success" ? "✓" : "!"}
                            </div>
                            <div>
                                <span className="font-semibold text-lg block">{popup.message}</span>
                                <span className="text-sm opacity-80">
                                    {popup.type === "success" ? "Redirection en cours..." : "Veuillez réessayer"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}