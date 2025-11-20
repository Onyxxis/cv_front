import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FiMail, FiUser, FiLock, FiEdit2, FiCheck, FiShield, FiStar, FiSettings, FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="relative">
      <div className="w-8 h-8 border-4 border-blue-100 rounded-full"></div>
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
);

export default function Parametreuser() {
  const { user: authUser } = useContext(AuthContext);
  const userId = authUser?.user_id;

  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    ispremium: false,
  });

  const [originalData, setOriginalData] = useState({});
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchUser = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/users/${userId}`);
      const user = { ...res.data.utilisateur, password: "" };
      setFormData(user);
      setOriginalData(user);
    } catch (err) {
      console.error("Erreur récupération utilisateur:", err);
      showPopup("Erreur lors du chargement des informations", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== originalData[key]) {
          payload[key] = formData[key];
        }
      });

      if (Object.keys(payload).length === 0) {
        showPopup("Aucune modification détectée", "info");
        setSaving(false);
        setEditing(false);
        return;
      }

      if (payload.role === "admin") payload.ispremium = false;

      await axiosInstance.put(`/users/${userId}`, payload);

      showPopup("Informations mises à jour avec succès", "success");
      setOriginalData({ ...formData, password: "" });
      setFormData((prev) => ({ ...prev, password: "" }));
      setEditing(false);
    } catch (err) {
      console.error("Erreur mise à jour:", err);
      showPopup("Échec de la mise à jour", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showPopup("Le nouveau mot de passe et la confirmation ne correspondent pas", "error");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showPopup("Le mot de passe doit contenir au moins 6 caractères", "error");
      return;
    }
    setSaving(true);
    try {
      await axiosInstance.put(`/users/${userId}/password`, passwordData);
      showPopup("Mot de passe mis à jour avec succès", "success");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      showPopup("Échec de la mise à jour du mot de passe", "error");
    } finally {
      setSaving(false);
    }
  };

  const showPopup = (message, type) => {
    setPopup({ visible: true, message, type });
    setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 3000);
  };

  const getRoleIcon = (role) => {
    return role === "admin" ? <FiShield className="text-red-500" /> : <FiUser className="text-blue-500" />;
  };

  const getRoleColor = (role) => {
    return role === "admin" ? "bg-red-100 text-red-800 border-red-200" : "bg-blue-100 text-blue-800 border-blue-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
            <FiSettings className="text-white" size={30} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres du Compte</h1>
        </div>


        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <FiSettings className="text-blue-600" size={20} />
                </div>
                Navigation
              </h3>
              <nav className="space-y-3">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`w-full flex items-center gap-4 p-10 rounded-2xl transition-all duration-300 ${activeTab === "info"
                    ? "bg-blue-50 text-blue-600 border-2 border-blue-200 shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:border-2 hover:border-gray-200"
                    }`}
                >
                  {/* <div className={`p-3 rounded-xl ${
                    activeTab === "info" ? "bg-blue-500 text-white shadow-sm" : "bg-gray-100 text-gray-600"
                  }`}>
                    <FiUser size={22} />
                  </div> */}
                  <div className="text-center flex-1">
                    <FiUser size={22} className="text-blue-800" />
                    <span className="font-bold text-lg block">Informations</span>
                    <span className="text-sm text-gray-500">Profil personnel</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${activeTab === "password"
                    ? "bg-green-50 text-green-600 border-2 border-green-200 shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:border-2 hover:border-gray-200"
                    }`}
                >
                  <div className={`p-3 rounded-xl ${activeTab === "password" ? "bg-green-500 text-white shadow-sm" : "bg-gray-100 text-gray-600"
                    }`}>
                    <FiLock size={22} />
                  </div>
                  <div className="text-left flex-1">
                    <span className="font-bold text-lg block">Sécurité  </span>
                    <span className="text-sm text-gray-500">Mot de passe</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          <div className="xl:col-span-4">
            {loading ? (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 flex items-center justify-center">
                <div className="text-center">
                  <Spinner />
                  <p className="text-gray-600 mt-4 text-lg">Chargement de vos paramètres...</p>
                </div>
              </div>
            ) : activeTab === "info" ? (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-10">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Informations Personnelles</h2>
                      <p className="text-gray-600 mt-2 text-lg">Gérez vos informations de profil et vos préférences</p>
                    </div>
                    {!editing && (
                      <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
                      >
                        <FiEdit2 size={22} />
                        Modifier le Profil
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="lg:col-span-1">
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Nom d'utilisateur</label>
                        <div className="relative">
                          <FiUser className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!editing}
                            required
                            className={`w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${editing ? "bg-white hover:border-blue-300" : "bg-gray-50 cursor-not-allowed"
                              }`}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="lg:col-span-1">
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Adresse email</label>
                        <div className="relative">
                          <FiMail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!editing}
                            required
                            className={`w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${editing ? "bg-white hover:border-blue-300" : "bg-gray-50 cursor-not-allowed"
                              }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rôle et Statut */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Rôle du Compte</label>
                        <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl border-2 ${getRoleColor(formData.role)} text-lg`}>
                          {getRoleIcon(formData.role)}
                          <span className="font-bold capitalize">{formData.role}</span>
                        </div>
                        <p className="text-gray-500 mt-3 text-sm">
                          {formData.role === "admin"
                            ? "Accès complet à toutes les fonctionnalités administratives"
                            : "Accès aux fonctionnalités utilisateur standard"}
                        </p>
                      </div>

                      {formData.role === "user" && (
                        <div>
                          <label className="block text-lg font-semibold text-gray-700 mb-4">Statut du Compte</label>
                          <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl border-2 ${formData.ispremium
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                            } text-lg`}>
                            <FiStar className={formData.ispremium ? "text-amber-500" : "text-gray-500"} size={24} />
                            <span className="font-bold">
                              {formData.ispremium ? "Compte Premium" : "Compte Standard"}
                            </span>
                          </div>
                          <p className="text-gray-500 mt-3 text-sm">
                            {formData.ispremium
                              ? "Accès aux fonctionnalités premium exclusives"
                              : "Passez à Premium pour débloquer plus de fonctionnalités"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Option Premium */}
                    {formData.role === "user" && editing && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="p-4 bg-amber-100 rounded-2xl shadow-sm">
                              <FiStar className="text-amber-600" size={28} />
                            </div>
                            <div>
                              <label className="block font-bold text-gray-900 text-2xl mb-2">Compte Premium</label>
                              <p className="text-gray-600 text-lg">
                                Accès aux fonctionnalités avancées, support prioritaire et contenu exclusif
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
                            <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Boutons d'action */}
                    {editing && (
                      <div className="flex gap-6 pt-10 border-t-2 border-gray-200">
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(false);
                            setFormData(originalData);
                          }}
                          className="flex-1 px-8 py-5 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg"
                        >
                          Annuler les modifications
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="flex-1 px-8 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-4 disabled:opacity-50 shadow-lg hover:shadow-xl"
                        >
                          {saving ? <Spinner /> : <FiCheck size={24} />}
                          {saving ? "Enregistrement en cours..." : "Sauvegarder les modifications"}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-10">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Sécurité du Compte</h2>
                    <p className="text-gray-600 mt-2 text-lg">
                      Protégez votre compte en mettant à jour régulièrement votre mot de passe
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-8 max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Ancien mot de passe</label>
                        <div className="relative">
                          <FiLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                          <input
                            type={showPasswords.oldPassword ? "text" : "password"}
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handlePasswordChange}
                            required
                            className="w-full pl-16 pr-12 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:border-green-300"
                            placeholder="Votre mot de passe actuel"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('oldPassword')}
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2"
                          >
                            {showPasswords.oldPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Nouveau mot de passe</label>
                        <div className="relative">
                          <FiLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                          <input
                            type={showPasswords.newPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                            className="w-full pl-16 pr-12 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:border-green-300"
                            placeholder="Créez un nouveau mot de passe"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('newPassword')}
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2"
                          >
                            {showPasswords.newPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Confirmer le nouveau mot de passe</label>
                        <div className="relative">
                          <FiLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                          <input
                            type={showPasswords.confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                            className="w-full pl-16 pr-12 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:border-green-300"
                            placeholder="Confirmez votre nouveau mot de passe"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2"
                          >
                            {showPasswords.confirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                          </button>
                        </div>
                        <p className="text-gray-500 mt-3 text-sm">
                          Le mot de passe doit contenir au moins 6 caractères
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-xl flex items-center justify-center gap-4 disabled:opacity-50 mt-8"
                    >
                      {saving ? <Spinner /> : <FiCheck size={26} />}
                      {saving ? "Mise à jour de la sécurité..." : "Mettre à jour le mot de passe"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {popup.visible && (
          <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-10 py-5 rounded-3xl shadow-2xl border-l-4 ${popup.type === "success"
            ? "bg-green-50 text-green-800 border-green-500"
            : popup.type === "error"
              ? "bg-red-50 text-red-800 border-red-500"
              : "bg-blue-50 text-blue-800 border-blue-500"
            } animate-slide-down max-w-lg w-full`}>
            <div className="flex items-center gap-5">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${popup.type === "success" ? "bg-green-500" :
                popup.type === "error" ? "bg-red-500" : "bg-blue-500"
                } text-white font-bold text-lg`}>
                {popup.type === "success" ? "✓" : "!"}
              </div>
              <div className="flex-1">
                <span className="font-bold text-xl block">{popup.message}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}