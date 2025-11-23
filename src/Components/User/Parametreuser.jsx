// import React, { useEffect, useState, useContext } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import { FiMail, FiUser, FiLock, FiEdit2, FiCheck, FiShield, FiStar, FiSettings, FiEye, FiEyeOff } from "react-icons/fi";
// import { AuthContext } from "../../context/AuthContext";

// const Spinner = () => (
//   <div className="flex justify-center items-center">
//     <div className="relative">
//       <div className="w-8 h-8 border-4 border-blue-100 rounded-full"></div>
//       <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
//     </div>
//   </div>
// );

// export default function Parametreuser() {
//   const { user: authUser } = useContext(AuthContext);
//   const userId = authUser?.user_id;

//   const [activeTab, setActiveTab] = useState("info");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
//   const [showPasswords, setShowPasswords] = useState({
//     oldPassword: false,
//     newPassword: false,
//     confirmPassword: false
//   });

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "",
//     ispremium: false,
//   });

//   const [originalData, setOriginalData] = useState({});
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const fetchUser = async () => {
//     if (!userId) return;
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get(`/users/${userId}`);
//       const user = { ...res.data.utilisateur, password: "" };
//       setFormData(user);
//       setOriginalData(user);
//     } catch (err) {
//       console.error("Erreur récupération utilisateur:", err);
//       showPopup("Erreur lors du chargement des informations", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({ ...prev, [name]: value }));
//   };

//   const togglePasswordVisibility = (field) => {
//     setShowPasswords(prev => ({
//       ...prev,
//       [field]: !prev[field]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const payload = {};
//       Object.keys(formData).forEach((key) => {
//         if (formData[key] !== originalData[key]) {
//           payload[key] = formData[key];
//         }
//       });

//       if (Object.keys(payload).length === 0) {
//         showPopup("Aucune modification détectée", "info");
//         setSaving(false);
//         setEditing(false);
//         return;
//       }

//       if (payload.role === "admin") payload.ispremium = false;

//       await axiosInstance.put(`/users/${userId}`, payload);

//       showPopup("Informations mises à jour avec succès", "success");
//       setOriginalData({ ...formData, password: "" });
//       setFormData((prev) => ({ ...prev, password: "" }));
//       setEditing(false);
//     } catch (err) {
//       console.error("Erreur mise à jour:", err);
//       showPopup("Échec de la mise à jour", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       showPopup("Le nouveau mot de passe et la confirmation ne correspondent pas", "error");
//       return;
//     }
//     if (passwordData.newPassword.length < 6) {
//       showPopup("Le mot de passe doit contenir au moins 6 caractères", "error");
//       return;
//     }
//     setSaving(true);
//     try {
//       await axiosInstance.put(`/users/${userId}/password`, passwordData);
//       showPopup("Mot de passe mis à jour avec succès", "success");
//       setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       console.error(err);
//       showPopup("Échec de la mise à jour du mot de passe", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const showPopup = (message, type) => {
//     setPopup({ visible: true, message, type });
//     setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 3000);
//   };

//   const getRoleIcon = (role) => {
//     return role === "admin" ? <FiShield className="text-red-500" /> : <FiUser className="text-blue-500" />;
//   };

//   const getRoleColor = (role) => {
//     return role === "admin" ? "bg-red-100 text-red-800 border-red-200" : "bg-blue-100 text-blue-800 border-blue-200";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white to-white p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center gap-4 mb-12">
//           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
//             <FiSettings className="text-white" size={30} />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">Paramètres du Compte</h1>
//         </div>


//         <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
//           <div className="xl:col-span-1">
//             <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-8">
//               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
//                 <div className="p-2 bg-blue-100 rounded-xl">
//                   <FiSettings className="text-blue-600" size={20} />
//                 </div>
//                 Navigation
//               </h3>
//               <nav className="space-y-3">
//                 <button
//                   onClick={() => setActiveTab("info")}
//                   className={`w-full flex items-center gap-4 p-10 rounded-2xl transition-all duration-300 ${activeTab === "info"
//                     ? "bg-blue-50 text-blue-600 border-2 border-blue-200 shadow-md"
//                     : "text-gray-600 hover:bg-gray-50 hover:border-2 hover:border-gray-200"
//                     }`}
//                 >
//                   {/* <div className={`p-3 rounded-xl ${
//                     activeTab === "info" ? "bg-blue-500 text-white shadow-sm" : "bg-gray-100 text-gray-600"
//                   }`}>
//                     <FiUser size={22} />
//                   </div> */}
//                   <div className="text-center flex-1">
//                     <FiUser size={22} className="text-blue-800" />
//                     <span className="font-bold text-lg block">Informations</span>
//                     <span className="text-sm text-gray-500">Profil personnel</span>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => setActiveTab("password")}
//                   className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${activeTab === "password"
//                     ? "bg-green-50 text-green-600 border-2 border-green-200 shadow-md"
//                     : "text-gray-600 hover:bg-gray-50 hover:border-2 hover:border-gray-200"
//                     }`}
//                 >
//                   <div className={`p-3 rounded-xl ${activeTab === "password" ? "bg-green-500 text-white shadow-sm" : "bg-gray-100 text-gray-600"
//                     }`}>
//                     <FiLock size={22} />
//                   </div>
//                   <div className="text-left flex-1">
//                     <span className="font-bold text-lg block">Sécurité  </span>
//                     <span className="text-sm text-gray-500">Mot de passe</span>
//                   </div>
//                 </button>
//               </nav>
//             </div>
//           </div>

//           <div className="xl:col-span-4">
//             {loading ? (
//               <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 flex items-center justify-center">
//                 <div className="text-center">
//                   <Spinner />
//                   <p className="text-gray-600 mt-4 text-lg">Chargement de vos paramètres...</p>
//                 </div>
//               </div>
//             ) : activeTab === "info" ? (
//               <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//                 <div className="p-10">
//                   <div className="flex items-center justify-between mb-10">
//                     <div>
//                       <h2 className="text-3xl font-bold text-gray-900">Informations Personnelles</h2>
//                       <p className="text-gray-600 mt-2 text-lg">Gérez vos informations de profil et vos préférences</p>
//                     </div>
//                     {!editing && (
//                       <button
//                         onClick={() => setEditing(true)}
//                         className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
//                       >
//                         <FiEdit2 size={22} />
//                         Modifier le Profil
//                       </button>
//                     )}
//                   </div>

//                   <form onSubmit={handleSubmit} className="space-y-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                       <div className="lg:col-span-1">
//                         <label className="block text-lg font-semibold text-gray-700 mb-4">Nom d'utilisateur</label>
//                         <div className="relative">
//                           <FiUser className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//                           <input
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             disabled={!editing}
//                             required
//                             className={`w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${editing ? "bg-white hover:border-blue-300" : "bg-gray-50 cursor-not-allowed"
//                               }`}
//                           />
//                         </div>
//                       </div>

//                       {/* Email */}
//                       <div className="lg:col-span-1">
//                         <label className="block text-lg font-semibold text-gray-700 mb-4">Adresse email</label>
//                         <div className="relative">
//                           <FiMail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//                           <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             disabled={!editing}
//                             required
//                             className={`w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${editing ? "bg-white hover:border-blue-300" : "bg-gray-50 cursor-not-allowed"
//                               }`}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Rôle et Statut */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                       <div>
//                         <label className="block text-lg font-semibold text-gray-700 mb-4">Rôle du Compte</label>
//                         <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl border-2 ${getRoleColor(formData.role)} text-lg`}>
//                           {getRoleIcon(formData.role)}
//                           <span className="font-bold capitalize">{formData.role}</span>
//                         </div>
//                         <p className="text-gray-500 mt-3 text-sm">
//                           {formData.role === "admin"
//                             ? "Accès complet à toutes les fonctionnalités administratives"
//                             : "Accès aux fonctionnalités utilisateur standard"}
//                         </p>
//                       </div>

//                       {formData.role === "user" && (
//                         <div>
//                           <label className="block text-lg font-semibold text-gray-700 mb-4">Statut du Compte</label>
//                           <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl border-2 ${formData.ispremium
//                             ? "bg-amber-100 text-amber-800 border-amber-200"
//                             : "bg-gray-100 text-gray-600 border-gray-200"
//                             } text-lg`}>
//                             <FiStar className={formData.ispremium ? "text-amber-500" : "text-gray-500"} size={24} />
//                             <span className="font-bold">
//                               {formData.ispremium ? "Compte Premium" : "Compte Standard"}
//                             </span>
//                           </div>
//                           <p className="text-gray-500 mt-3 text-sm">
//                             {formData.ispremium
//                               ? "Accès aux fonctionnalités premium exclusives"
//                               : "Passez à Premium pour débloquer plus de fonctionnalités"}
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     {/* Option Premium */}
//                     {formData.role === "user" && editing && (
//                       <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-8">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-6">
//                             <div className="p-4 bg-amber-100 rounded-2xl shadow-sm">
//                               <FiStar className="text-amber-600" size={28} />
//                             </div>
//                             <div>
//                               <label className="block font-bold text-gray-900 text-2xl mb-2">Compte Premium</label>
//                               <p className="text-gray-600 text-lg">
//                                 Accès aux fonctionnalités avancées, support prioritaire et contenu exclusif
//                               </p>
//                             </div>
//                           </div>
//                           <label className="relative inline-flex items-center cursor-pointer">
//                             <input
//                               type="checkbox"
//                               name="ispremium"
//                               checked={formData.ispremium}
//                               onChange={handleChange}
//                               className="sr-only peer"
//                             />
//                             <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
//                           </label>
//                         </div>
//                       </div>
//                     )}

//                     {/* Boutons d'action */}
//                     {editing && (
//                       <div className="flex gap-6 pt-10 border-t-2 border-gray-200">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setEditing(false);
//                             setFormData(originalData);
//                           }}
//                           className="flex-1 px-8 py-5 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg"
//                         >
//                           Annuler les modifications
//                         </button>
//                         <button
//                           type="submit"
//                           disabled={saving}
//                           className="flex-1 px-8 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-4 disabled:opacity-50 shadow-lg hover:shadow-xl"
//                         >
//                           {saving ? <Spinner /> : <FiCheck size={24} />}
//                           {saving ? "Enregistrement en cours..." : "Sauvegarder les modifications"}
//                         </button>
//                       </div>
//                     )}
//                   </form>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//                 <div className="p-10">
//                   <div className="mb-10">
//                     <h2 className="text-3xl font-bold text-gray-900">Sécurité du Compte</h2>
//                     <p className="text-gray-600 mt-2 text-lg">
//                       Protégez votre compte en mettant à jour régulièrement votre mot de passe
//                     </p>
//                   </div>

//                   <form onSubmit={handlePasswordSubmit} className="space-y-8 max-w-4xl">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                       <div>
//                         <label className="block text-lg font-semibold text-gray-700 mb-4">Ancien mot de passe</label>
//                         <div className="relative">
//                           <FiLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//                           <input
//                             type={showPasswords.oldPassword ? "text" : "password"}
//                             name="oldPassword"
//                             value={passwordData.oldPassword}
//                             onChange={handlePasswordChange}
//                             required
//                             className="w-full pl-16 pr-12 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:border-green-300"
//                             placeholder="Votre mot de passe actuel"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => togglePasswordVisibility('oldPassword')}
//                             className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2"
//                           >
//                             {showPasswords.oldPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//                           </button>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-lg font-semibold text-gray-700 mb-4">Nouveau mot de passe</label>
//                         <div className="relative">
//                           <FiLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//                           <input
//                             type={showPasswords.newPassword ? "text" : "password"}
//                             name="newPassword"
//                             value={passwordData.newPassword}
//                             onChange={handlePasswordChange}
//                             required
//                             className="w-full pl-16 pr-12 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:border-green-300"
//                             placeholder="Créez un nouveau mot de passe"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => togglePasswordVisibility('newPassword')}
//                             className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2"
//                           >
//                             {showPasswords.newPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="lg:col-span-2">
//                         <label className="block text-lg font-semibold text-gray-700 mb-4">Confirmer le nouveau mot de passe</label>
//                         <div className="relative">
//                           <FiLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//                           <input
//                             type={showPasswords.confirmPassword ? "text" : "password"}
//                             name="confirmPassword"
//                             value={passwordData.confirmPassword}
//                             onChange={handlePasswordChange}
//                             required
//                             className="w-full pl-16 pr-12 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:border-green-300"
//                             placeholder="Confirmez votre nouveau mot de passe"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => togglePasswordVisibility('confirmPassword')}
//                             className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2"
//                           >
//                             {showPasswords.confirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//                           </button>
//                         </div>
//                         <p className="text-gray-500 mt-3 text-sm">
//                           Le mot de passe doit contenir au moins 6 caractères
//                         </p>
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={saving}
//                       className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-xl flex items-center justify-center gap-4 disabled:opacity-50 mt-8"
//                     >
//                       {saving ? <Spinner /> : <FiCheck size={26} />}
//                       {saving ? "Mise à jour de la sécurité..." : "Mettre à jour le mot de passe"}
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {popup.visible && (
//           <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-10 py-5 rounded-3xl shadow-2xl border-l-4 ${popup.type === "success"
//             ? "bg-green-50 text-green-800 border-green-500"
//             : popup.type === "error"
//               ? "bg-red-50 text-red-800 border-red-500"
//               : "bg-blue-50 text-blue-800 border-blue-500"
//             } animate-slide-down max-w-lg w-full`}>
//             <div className="flex items-center gap-5">
//               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${popup.type === "success" ? "bg-green-500" :
//                 popup.type === "error" ? "bg-red-500" : "bg-blue-500"
//                 } text-white font-bold text-lg`}>
//                 {popup.type === "success" ? "✓" : "!"}
//               </div>
//               <div className="flex-1">
//                 <span className="font-bold text-xl block">{popup.message}</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FiMail, FiUser, FiLock, FiEdit2, FiCheck, FiShield, FiStar, FiSettings, FiEye, FiEyeOff, FiCreditCard, FiX } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [premiumCode, setPremiumCode] = useState("");

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

  const handlePremiumChange = async () => {
    if (!formData.ispremium) {
      setShowCodeInput(true);
    } else {
      await updatePremium(false);
    }
  };

  const confirmPremiumCode = async () => {
    if (!premiumCode.trim()) {
      showPopup("Veuillez entrer un code valide", "error");
      return;
    }
    await updatePremium(true);
    setShowCodeInput(false);
    setPremiumCode("");
  };

  const updatePremium = async (value) => {
    setSaving(true);
    try {
      await axiosInstance.put(`/users/${userId}/premium`, { utilisateur_id: userId, ispremium: value });
      setFormData(prev => ({ ...prev, ispremium: value }));
      showPopup(`Votre compte est désormais ${value ? "Premium" : "Standard"}`, "success");
    } catch (err) {
      console.error(err);
      showPopup("Échec de la mise à jour de l'offre", "error");
    } finally {
      setSaving(false);
    }
  };

  const showPopup = (message, type) => {
    setPopup({ visible: true, message, type });
    setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 4000);
  };

  const closePopup = () => {
    setPopup({ visible: false, message: "", type: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md">
            <FiSettings className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paramètres du Compte</h1>
            <p className="text-gray-600 text-sm">Gérez vos informations et préférences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiSettings className="text-blue-600" size={16} />
                Navigation
              </h3>
              <nav className="space-y-2">
                <NavButton
                  active={activeTab === "info"}
                  onClick={() => setActiveTab("info")}
                  icon={<FiUser size={16} />}
                  title="Informations"
                  subtitle="Profil personnel"
                />
                <NavButton
                  active={activeTab === "password"}
                  onClick={() => setActiveTab("password")}
                  icon={<FiLock size={16} />}
                  title="Sécurité"
                  subtitle="Mot de passe"
                />
                {formData.role === "user" && (
                  <NavButton
                    active={activeTab === "premium"}
                    onClick={() => setActiveTab("premium")}
                    icon={<FiCreditCard size={16} />}
                    title="Offre"
                    subtitle="Changer d'offre"
                  />
                )}
              </nav>
            </div>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 flex items-center justify-center">
                <div className="text-center">
                  <Spinner />
                  <p className="text-gray-600 mt-3 text-sm">Chargement de vos paramètres...</p>
                </div>
              </div>
            ) : activeTab === "info" ? (
              <InfoTab
                formData={formData}
                editing={editing}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                saving={saving}
                setEditing={setEditing}
                originalData={originalData}
              />
            ) : activeTab === "password" ? (
              <PasswordTab
                passwordData={passwordData}
                handlePasswordChange={handlePasswordChange}
                handlePasswordSubmit={handlePasswordSubmit}
                saving={saving}
                showPasswords={showPasswords}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            ) : (
              <PremiumTab
                ispremium={formData.ispremium}
                showCodeInput={showCodeInput}
                setPremiumCode={setPremiumCode}
                premiumCode={premiumCode}
                handlePremiumChange={handlePremiumChange}
                confirmPremiumCode={confirmPremiumCode}
                saving={saving}
              />
            )}
          </div>
        </div>

        {/* Popup Notification */}
        {popup.visible && (
          <div className={`fixed top-4 right-4 z-50 max-w-sm w-full animate-slide-in-right ${popup.type === "success" ? "bg-green-50 border-green-200" : popup.type === "error" ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"} border rounded-xl shadow-lg p-4`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${popup.type === "success" ? "bg-green-500" : popup.type === "error" ? "bg-red-500" : "bg-blue-500"} text-white text-sm font-bold`}>
                {popup.type === "success" ? "✓" : "!"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{popup.message}</p>
              </div>
              <button onClick={closePopup} className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
                <FiX size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Composant de navigation
const NavButton = ({ active, onClick, icon, title, subtitle }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
      active
        ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
        : "text-gray-600 hover:bg-gray-50 hover:border hover:border-gray-200"
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${active ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  </button>
);

// Tab Informations
const InfoTab = ({ formData, editing, handleChange, handleSubmit, saving, setEditing, originalData }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Informations Personnelles</h2>
          <p className="text-gray-600 text-sm mt-1">Gérez vos informations de profil</p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
          >
            <FiEdit2 size={14} />
            Modifier
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Nom d'utilisateur" icon={<FiUser size={14} />} name="username" value={formData.username} editing={editing} onChange={handleChange} />
          <InputField label="Adresse email" icon={<FiMail size={14} />} name="email" value={formData.email} editing={editing} onChange={handleChange} type="email" />
        </div>

        <RoleStatus formData={formData} editing={editing} handleChange={handleChange} />

        {editing && (
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setFormData(originalData);
              }}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? <Spinner /> : <FiCheck size={14} />}
              {saving ? "Enregistrement..." : "Sauvegarder"}
            </button>
          </div>
        )}
      </form>
    </div>
  </div>
);

// Champ de saisie
const InputField = ({ label, icon, name, value, editing, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={!editing}
        required
        className={`w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          editing ? "bg-white hover:border-gray-400" : "bg-gray-50 cursor-not-allowed"
        }`}
      />
    </div>
  </div>
);

// Statut du rôle et premium
const RoleStatus = ({ formData, editing, handleChange }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rôle du Compte</label>
        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${
          formData.role === "admin" ? "bg-red-50 text-red-700 border-red-200" : "bg-blue-50 text-blue-700 border-blue-200"
        } text-sm`}>
          {formData.role === "admin" ? <FiShield size={14} className="text-red-600" /> : <FiUser size={14} className="text-blue-600" />}
          <span className="font-medium capitalize">{formData.role}</span>
        </div>
      </div>

      {formData.role === "user" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Statut du Compte</label>
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${
            formData.ispremium ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-gray-50 text-gray-600 border-gray-200"
          } text-sm`}>
            <FiStar size={14} className={formData.ispremium ? "text-amber-600" : "text-gray-500"} />
            <span className="font-medium">{formData.ispremium ? "Premium" : "Standard"}</span>
          </div>
        </div>
      )}
    </div>

    {formData.role === "user" && editing && (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FiStar size={16} className="text-amber-600" />
            </div>
            <div>
              <label className="block font-medium text-gray-900 text-sm mb-1">Compte Premium</label>
              <p className="text-gray-600 text-xs">Fonctionnalités avancées et support prioritaire</p>
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
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>
      </div>
    )}
  </>
);

// Tab Sécurité
const PasswordTab = ({ passwordData, handlePasswordChange, handlePasswordSubmit, saving, showPasswords, togglePasswordVisibility }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Sécurité du Compte</h2>
        <p className="text-gray-600 text-sm mt-1">Mettez à jour votre mot de passe régulièrement</p>
      </div>

      <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-2xl">
        <PasswordInput 
          label="Ancien mot de passe" 
          name="oldPassword" 
          value={passwordData.oldPassword} 
          onChange={handlePasswordChange} 
          show={showPasswords.oldPassword} 
          toggle={() => togglePasswordVisibility('oldPassword')} 
        />
        <PasswordInput 
          label="Nouveau mot de passe" 
          name="newPassword" 
          value={passwordData.newPassword} 
          onChange={handlePasswordChange} 
          show={showPasswords.newPassword} 
          toggle={() => togglePasswordVisibility('newPassword')} 
        />
        <PasswordInput 
          label="Confirmer le mot de passe" 
          name="confirmPassword" 
          value={passwordData.confirmPassword} 
          onChange={handlePasswordChange} 
          show={showPasswords.confirmPassword} 
          toggle={() => togglePasswordVisibility('confirmPassword')} 
        />
        
        <div className="bg-gray-50 rounded-lg p-3 mt-2">
          <p className="text-xs text-gray-600">Le mot de passe doit contenir au moins 6 caractères</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm mt-4"
        >
          {saving ? <Spinner /> : <FiCheck size={14} />}
          {saving ? "Mise à jour..." : "Mettre à jour le mot de passe"}
        </button>
      </form>
    </div>
  </div>
);

// Champ de mot de passe
const PasswordInput = ({ label, name, value, onChange, show, toggle }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:border-gray-400"
        placeholder={label}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
      >
        {show ? <FiEyeOff size={14} /> : <FiEye size={14} />}
      </button>
    </div>
  </div>
);

// Tab Premium
const PremiumTab = ({ ispremium, showCodeInput, setPremiumCode, premiumCode, handlePremiumChange, confirmPremiumCode, saving }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-md">
    <h2 className="text-xl font-bold text-gray-900 mb-2">Changer d'offre</h2>
    <p className="text-gray-600 text-sm mb-6">
      {ispremium
        ? "Vous pouvez revenir à l'offre Standard à tout moment."
        : "Passez à l'offre Premium pour bénéficier des fonctionnalités avancées."}
    </p>

    {!showCodeInput ? (
      <button
        onClick={handlePremiumChange}
        disabled={saving}
        className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
      >
        {ispremium ? "Revenir à Standard" : "Passer à Premium"}
      </button>
    ) : (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Entrez le code Premium"
          value={premiumCode}
          onChange={(e) => setPremiumCode(e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
        <button
          onClick={confirmPremiumCode}
          disabled={saving}
          className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
        >
          Confirmer le code
        </button>
      </div>
    )}
  </div>
);
