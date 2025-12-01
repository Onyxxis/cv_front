import React, { useState,useContext  } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowRight } from 'react-icons/fi';
import logo from "../../assets/logo-min.png";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';


const Login = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const { saveToken } = useContext(AuthContext);

    // const { access_token } = response.data;
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ visible: false, message: "" });

    const handleInputChange = (field, value) => {
        if (loading) return;
        setFormData({ ...formData, [field]: value });

        if (field === "password") setErrors({ ...errors, password: "" });
        if (field === "confirmPassword") setErrors({ ...errors, confirmPassword: "" });
    };

    const validatePassword = () => {
        let valid = true;
        const newErrors = { password: "", confirmPassword: "" };

        if (!isLogin) {
            if (formData.password.length < 8) {
                newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
                valid = false;
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLogin && !validatePassword()) return;

        try {
            setLoading(true);
            if (isLogin) {
                const response = await axiosInstance.post("/auth/login", {
                    email: formData.email,
                    password: formData.password,
                });

                const { access_token, token_type } = response.data;

                const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
                const userRole = tokenPayload.role;

                localStorage.setItem("access_token", access_token);
                saveToken(access_token);

                if (userRole === "admin") {
                    
                    navigate("/admin/dashboard");
                } else {
                    navigate("/utilisateur/tableau_de_bord");
                }

            } else {
                const response = await axiosInstance.post("/users", {
                    username: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    role: "user",
                    ispremium: false
                });

                setPopup({ visible: true, message: "Compte créé avec succès ! Vous pouvez maintenant vous connecter." });
                setIsLogin(true);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.detail);
            } else {
                alert("Erreur serveur. Veuillez réessayer plus tard.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-700 relative overflow-hidden">

            {/* {popup.visible && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg rounded-xl p-4 max-w-md w-full flex flex-col items-center">
                    <p className="text-black text-center mb-3">{popup.message}</p>
                    <button
                        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
                        onClick={() => setPopup({ visible: false, message: "" })}
                    >
                        OK
                    </button>
                </div>
            )} */}
            {popup.visible && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl border-l-4 bg-white text-black border-blue-500 animate-slide-down max-w-md w-full">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold">
                            i
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold text-lg block text-center">{popup.message}</span>
                        </div>
                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
                            onClick={() => setPopup({ visible: false, message: "" })}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}


            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="absolute top-3 left-10 z-20 flex items-center gap-4">
                <img
                    src={logo}
                    alt="Kauza CV"
                    className="w-48 h-28 object-contain drop-shadow-2xl"
                />
            </div>

            <div className="w-full max-w-7xl flex items-center justify-right relative z-10 px-4">

                {/* Section gauche */}
                <div className="flex-1 text-white pr-10">
                    <h2 className="text-5xl font-bold mb-6 leading-tight">
                        Créez un CV qui <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">marque les esprits</span>
                    </h2>
                    <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                        Rejoignez les professionnels qui ont transformé leur carrière
                        avec nos modèles de CV personnalisables et percutants.
                    </p>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                            <span className="text-lg font-medium">Modèles professionnels optimisés ATS</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                            <span className="text-lg font-medium">Export PDF haute qualité</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                            <span className="text-lg font-medium">Conseils IA personnalisés</span>
                        </div>
                    </div>
                </div>

                {/* Section droite */}
                <div className="w-2/3 max-w-2xl bg-white/15 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-6">

                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-white mb-3">
                            {isLogin ? 'Content de vous revoir !' : 'Commencez gratuitement'}
                        </h3>
                        <p className="text-gray-200 text-lg">
                            {isLogin
                                ? 'Connectez-vous à votre compte'
                                : 'Créez votre compte en 30 secondes'}
                        </p>
                    </div>

                    <div className="flex bg-white/10 rounded-xl p-1.5 mb-8 border border-white/20">
                        <button
                            onClick={() => !loading && setIsLogin(true)}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${isLogin
                                ? 'bg-white/25 text-white shadow-lg backdrop-blur-sm'
                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Connexion
                        </button>
                        <button
                            onClick={() => !loading && setIsLogin(false)}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${!isLogin
                                ? 'bg-white/25 text-white shadow-lg backdrop-blur-sm'
                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Inscription
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Nom d'utilisateur</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-3.5 text-gray-300" />
                                        <input
                                            type="text"
                                            required
                                            disabled={loading}
                                            value={formData.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            placeholder="Votre nom"
                                            className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm transition-all duration-200"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-3.5 text-gray-300" />
                                        <input
                                            type="email"
                                            required
                                            disabled={loading}
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="votre@email.com"
                                            className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Adresse email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-3.5 text-gray-300" />
                                    <input
                                        type="email"
                                        required
                                        disabled={loading}
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="votre@email.com"
                                        className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm transition-all duration-200"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Mot de passe</label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-3.5 text-gray-300" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    disabled={loading}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="Votre mot de passe"
                                    className={`block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm transition-all duration-200 ${errors.password && 'border-red-500'}`}
                                />
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-300 hover:text-white transition"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Confirmer le mot de passe</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-3.5 text-gray-300" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        disabled={loading}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        placeholder="Confirmez votre mot de passe"
                                        className={`block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm transition-all duration-200 ${errors.confirmPassword && 'border-red-500'}`}
                                    />
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-gray-300 hover:text-white transition"
                                    >
                                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>
                        )}

                        {/* Options */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    disabled={loading}
                                    checked={formData.rememberMe}
                                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                                    className="w-4 h-4 text-blue-400 bg-white/10 border-white/25 rounded focus:ring-blue-400"
                                />
                                <span className="ml-3 text-sm text-white">Se souvenir de moi</span>
                            </label>

                            {isLogin && (
                                <a href="#" className="text-sm text-blue-300 hover:text-blue-200 font-medium">
                                    Mot de passe oublié ?
                                </a>
                            )}
                        </div>

                        {/* Bouton principal */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 text-white py-4 rounded-xl font-semibold text-lg shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center group"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>{isLogin ? 'Se connecter' : 'Créer mon compte'}</span>
                                    <FiArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Lien bas */}
                    <div className="text-center mt-6 text-gray-300">
                        {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
                        <button
                            onClick={() => !loading && setIsLogin(!isLogin)}
                            className="text-white font-semibold hover:text-blue-200 underline ml-1"
                        >
                            {isLogin ? "S'inscrire" : 'Se connecter'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
