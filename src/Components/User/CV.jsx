// import React, { useState, useRef, useContext, useEffect } from "react";
// import {
//   FiPlus,
//   FiUpload,
//   FiFileText,
//   FiX,
//   FiCheck,
//   FiTrash2,
//   FiEdit,
//   FiDownload,
//   FiStar,
//   FiTrendingUp,
//   FiChevronRight,
//   FiBarChart2,
//   FiLayers,
//   FiUserCheck,
//   FiInbox
// } from "react-icons/fi";
// import { useNavigate } from 'react-router-dom';
// import { ClipLoader } from "react-spinners";
// import { Modal } from './AddCv/Modal';
// import axiosInstance from "../../api/axiosInstance";
// import { AuthContext } from "../../context/AuthContext";

// const CV = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [loadingCVs, setLoadingCVs] = useState(false);
//   const [existingCVs, setExistingCVs] = useState([]);
//   const [loadingDelete, setLoadingDelete] = useState({});
//   const [stats, setStats] = useState({ completed_cvs: 0, in_progress_cvs: 0 });
//   const [loadingStats, setLoadingStats] = useState(false);
//   const [popup, setPopup] = useState({ visible: false, message: "", type: "" });


//   const modalRef = useRef();
//   const fileInputRef = useRef(null);
//   const [confirmPopup, setConfirmPopup] = useState({
//     visible: false,
//     message: "",
//     onConfirm: null,
//     onCancel: null,
//   });


//   const [formData, setFormData] = useState({
//     fileName: '',
//     actionType: 'create',
//     uploadedFile: null,
//     jobTitle: '',
//   });

//   // 🧩 Gestion des champs du modal
//   const handleInputChange = (field, value) =>
//     setFormData((prev) => ({ ...prev, [field]: value }));

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (
//       file &&
//       (file.type === 'application/pdf' ||
//         file.type.includes('word') ||
//         file.type === 'application/msword')
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         uploadedFile: file,
//         fileName: file.name.replace(/\.[^/.]+$/, ''),
//       }));
//     } else {
//       // alert('Veuillez sélectionner un fichier PDF ou Word valide.');
//       showPopup("Veuillez sélectionner un fichier PDF ou Word valide.", "error");

//     }
//   };

//   const handleCreateCV = (data) => {
//     console.log("CV créé :", data.title);
//   };

//   const colors = {
//     bg: "bg-blue-100",
//     border: "border-blue-200",
//     text: "text-blue-600",
//     badge: "bg-blue-500 text-white"
//   };

//   const userId = user?.user_id;

//   // 🔹 Récupération des CVs
//   useEffect(() => {
//     const fetchCVs = async () => {
//       if (!userId) return;
//       setLoadingCVs(true);
//       try {
//         const res = await axiosInstance.get(`/cvs/user/${userId}`);
//         const cvs = res.data.cvs.map(cv => ({
//           id: cv.id,
//           name: cv.title,
//           date: new Date(cv.updated_at).toLocaleDateString("fr-FR"),
//           progress: cv.completion_percentage ?? 0
//         }));
//         setExistingCVs(cvs);
//       } catch (err) {
//         console.error("Erreur lors de la récupération des CV :", err);
//         setExistingCVs([]);
//       } finally {
//         setLoadingCVs(false);
//       }
//     };
//     fetchCVs();
//   }, [userId]);


//   const openConfirmPopup = (message, onConfirm, onCancel) => {
//     setConfirmPopup({
//       visible: true,
//       message,
//       onConfirm,
//       onCancel,
//     });
//   };

//   // 🔹 Suppression d'un CV
//   // const handleDelete = async (cvId) => {
//   //   if (!window.confirm("Voulez-vous vraiment supprimer ce CV ?")) return;
//   //   setLoadingDelete(prev => ({ ...prev, [cvId]: true }));
//   //   try {
//   //     await axiosInstance.delete(`/cvs/${cvId}`);
//   //     setExistingCVs(existingCVs.filter(cv => cv.id !== cvId));
//   //     showPopup("CV supprimé avec succès", "success");
//   //   } catch (err) {
//   //     console.error("Erreur lors de la suppression :", err);
//   //     showPopup("Échec lors de la suppression", "error");

//   //   } finally {
//   //     setLoadingDelete(prev => ({ ...prev, [cvId]: false }));
//   //   }
//   // };


//   const handleDelete = (cvId) => {
//     openConfirmPopup(
//       "Voulez-vous vraiment supprimer ce CV ?",
//       async () => {
//         setConfirmPopup({ visible: false });

//         setLoadingDelete(prev => ({ ...prev, [cvId]: true }));
//         try {
//           await axiosInstance.delete(`/cvs/${cvId}`);
//           setExistingCVs(existingCVs.filter(cv => cv.id !== cvId));
//           showPopup("CV supprimé avec succès", "success");
//         } catch (err) {
//           console.error("Erreur lors de la suppression :", err);
//           showPopup("Échec lors de la suppression", "error");
//         } finally {
//           setLoadingDelete(prev => ({ ...prev, [cvId]: false }));
//         }
//       },
//       () => {
//         setConfirmPopup({ visible: false });
//       }
//     );
//   };


//   // 🔹 Statistiques CV
//   useEffect(() => {
//     const fetchStats = async () => {
//       if (!userId) return;
//       setLoadingStats(true);
//       try {
//         const response = await axiosInstance.get(`/cvs/in-progress/${userId}`);
//         setStats({
//           completed_cvs: response.data.completed_cvs ?? 0,
//           in_progress_cvs: response.data.in_progress_cvs ?? 0,
//         });
//       } catch (err) {
//         setStats({ completed_cvs: 0, in_progress_cvs: 0 });
//         console.error("Erreur lors de la récupération des statistiques :", err);
//       } finally {
//         setLoadingStats(false);
//       }
//     };
//     fetchStats();
//   }, [userId]);

//   const renderStars = (count) => (
//     <div className="flex space-x-0.5">
//       {[...Array(5)].map((_, i) => (
//         <FiStar key={i} className={`w-3 h-3 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
//       ))}
//     </div>
//   );

//   const showPopup = (message, type) => {
//     setPopup({ visible: true, message, type });
//     setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//           {/* Créer un nouveau CV */}
//           <div
//             onClick={() => modalRef.current.openModal('create')}
//             className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 border-dashed border-gray-300 hover:border-blue-300 flex flex-col items-center justify-center p-8 text-center"
//           >
//             <div className="p-4 bg-blue-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
//               <FiPlus className="w-8 h-8 text-blue-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Créer un nouveau CV</h3>
//             <p className="text-sm text-gray-500">Commencez avec un template personnalisé</p>
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//           </div>

//           {/* CV existants */}
//           {loadingCVs ? (
//             <div className="col-span-full flex justify-center py-20">
//               <ClipLoader color="#2563EB" size={40} />
//             </div>
//           ) : existingCVs.length > 0 ? (
//             existingCVs.map((cv) => (
//               <div
//                 key={cv.id}
//                 className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
//               >
//                 <div className={`${colors.bg} ${colors.border} h-32 flex items-center justify-center relative overflow-hidden`}>
//                   <FiFileText className={`w-12 h-12 ${colors.text} relative z-10`} />
//                   <div className="absolute top-3 left-3">
//                     {loadingDelete[cv.id] ? (
//                       <ClipLoader color="#2563EB" size={18} />
//                     ) : (
//                       <div className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
//                         {cv.progress}%
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="p-5">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{cv.name}</h3>
//                   <p className="text-sm text-gray-500 mb-3">Modifié le {cv.date}</p>
//                   <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//                     <div
//                       className={`h-2 rounded-full ${colors.badge.split(" ")[0]}`}
//                       style={{ width: `${cv.progress}%` }}
//                     ></div>
//                   </div>
//                   <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${colors.badge}`}>
//                     {cv.progress === 100 ? "Terminé" : "En cours"}
//                   </span>
//                 </div>
//                 <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
//                   {/* <button
//                     onClick={() => navigate(`/utilisateur/cv/${cv.id}/edit`)}
//                     className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
//                   >
//                     <FiEdit className="w-4 h-4 text-blue-600" />
//                   </button> */}
//                   <button
//                     onClick={() => handleDelete(cv.id)}
//                     className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
//                   >
//                     <FiTrash2 className="w-4 h-4 text-red-600" />
//                   </button>
//                   <button
//                     onClick={() => navigate(`/utilisateur/preview/${cv.id}`)}
//                     className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
//                   >
//                     <FiDownload className="w-4 h-4 text-green-600" />
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full flex flex-row items-center justify-center py-20 text-gray-400">
//               <p className="text-lg font-medium">Aucun CV enregistré pour l'instant</p>
//             </div>
//           )}
//         </div>
//       </div>


//       {popup.visible && (
//         <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl border-l-4 ${popup.type === "success"
//           ? "bg-green-50 text-green-800 border-green-500"
//           : "bg-red-50 text-red-800 border-red-500"
//           } animate-slide-down max-w-md w-full`}>
//           <div className="flex items-center gap-4">
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${popup.type === "success" ? "bg-green-500" : "bg-red-500"
//               } text-white font-bold`}>
//               {popup.type === "success" ? "✓" : "!"}
//             </div>
//             <div>
//               <span className="font-semibold text-lg block">{popup.message}</span>
//             </div>
//           </div>
//         </div>
//       )}



//       {confirmPopup.visible && (
//         <div className="fixed inset-0  bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               Confirmation
//             </h3>
//             <p className="text-gray-600 mb-6">{confirmPopup.message}</p>

//             <div className="flex justify-between gap-4">
//               <button
//                 onClick={() => {
//                   confirmPopup.onCancel && confirmPopup.onCancel();
//                 }}
//                 className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium text-gray-800"
//               >
//                 Annuler
//               </button>

//               <button
//                 onClick={() => {
//                   confirmPopup.onConfirm && confirmPopup.onConfirm();
//                 }}
//                 className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium"
//               >
//                 Confirmer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Modal ref={modalRef} onCreateStart={handleCreateCV} />
//     </div>
//   );
// };

// export default CV;

import React, { useState, useRef, useContext, useEffect } from "react";
import {
  FiPlus,
  FiFileText,
  FiTrash2,
  FiDownload,
  FiEdit
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import { Modal } from './AddCv/Modal';
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const CV = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loadingCVs, setLoadingCVs] = useState(false);
  const [existingCVs, setExistingCVs] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState({});
  const [stats, setStats] = useState({ completed_cvs: 0, in_progress_cvs: 0 });
  const [loadingStats, setLoadingStats] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
  const [confirmPopup, setConfirmPopup] = useState({
    visible: false,
    message: "",
    onConfirm: null,
    onCancel: null,
  });

  const modalRef = useRef();
  const userId = user?.user_id;

  // 🔹 Récupération des CVs
  useEffect(() => {
    const fetchCVs = async () => {
      if (!userId) return;
      setLoadingCVs(true);
      try {
        const res = await axiosInstance.get(`/cvs/user/${userId}`);
        const cvs = res.data.cvs.map(cv => ({
          id: cv.id,
          name: cv.title,
          date: new Date(cv.updated_at).toLocaleDateString("fr-FR"),
          progress: cv.completion_percentage ?? 0,
          status: cv.completion_percentage === 100 ? "Terminé" : "En cours",
          color: cv.completion_percentage === 100 ? 
            { bg: "bg-green-100", border: "border-green-200", text: "text-green-600", badge: "bg-green-600" } :
            { bg: "bg-blue-100", border: "border-blue-200", text: "text-blue-600", badge: "bg-blue-600" }
        }));
        setExistingCVs(cvs);
      } catch (err) {
        console.error("Erreur lors de la récupération des CV :", err);
        setExistingCVs([]);
      } finally {
        setLoadingCVs(false);
      }
    };
    fetchCVs();
  }, [userId]);

  // 🔹 Statistiques CV
  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;
      setLoadingStats(true);
      try {
        const response = await axiosInstance.get(`/cvs/in-progress/${userId}`);
        setStats({
          completed_cvs: response.data.completed_cvs ?? 0,
          in_progress_cvs: response.data.in_progress_cvs ?? 0,
        });
      } catch (err) {
        setStats({ completed_cvs: 0, in_progress_cvs: 0 });
        console.error("Erreur lors de la récupération des statistiques :", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, [userId]);

  const openConfirmPopup = (message, onConfirm, onCancel) => {
    setConfirmPopup({
      visible: true,
      message,
      onConfirm,
      onCancel,
    });
  };

  const handleDelete = (cvId) => {
    openConfirmPopup(
      "Êtes-vous sûr de vouloir supprimer ce CV ? Cette action est irréversible.",
      async () => {
        setConfirmPopup({ visible: false });
        setLoadingDelete(prev => ({ ...prev, [cvId]: true }));
        try {
          await axiosInstance.delete(`/cvs/${cvId}`);
          setExistingCVs(existingCVs.filter(cv => cv.id !== cvId));
          showPopup("CV supprimé avec succès", "success");
        } catch (err) {
          console.error("Erreur lors de la suppression :", err);
          showPopup("Échec lors de la suppression", "error");
        } finally {
          setLoadingDelete(prev => ({ ...prev, [cvId]: false }));
        }
      },
      () => {
        setConfirmPopup({ visible: false });
      }
    );
  };

  const showPopup = (message, type) => {
    setPopup({ visible: true, message, type });
    setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 3000);
  };

  const handleCreateCV = (data) => {
    console.log("CV créé :", data.title);
  };

  return (
    <div className="min-h-screen bg-gray-80">
      {/* En-tête */}
      <div className="bg-white border-b rounded-2xl shadow-sm border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mes CV</h1>
              <p className="text-gray-600 mt-1">Gérez et créez vos curriculum vitae</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600">Total : </span>
                  <span className="font-semibold text-gray-900">
                    {existingCVs.length} CV{existingCVs.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-500">CV en cours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? <Spinner size={20} color="#3B82F6" /> : stats.in_progress_cvs}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-500">CV terminés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? <Spinner size={20} color="#10B981" /> : stats.completed_cvs}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mr-4">
                <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Taux de complétion</p>
                <p className="text-2xl font-bold text-gray-900">
                  {existingCVs.length > 0 
                    ? `${Math.round((stats.completed_cvs / existingCVs.length) * 100)}%`
                    : "0%"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille des CV */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Vos CVs</h2>
          
          {loadingCVs ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Spinner  size={50} />
                <p className="mt-4 text-gray-600">Chargement de vos CV...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Carte de création */}
              <div
                onClick={() => modalRef.current.openModal('create')}
                className="group bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300 cursor-pointer p-5 text-center hover:shadow-md flex flex-col items-center justify-center min-h-[240px]"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <FiPlus className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Créer un nouveau CV</h3>
                <p className="text-gray-500 text-sm">Commencez avec un modèle personnalisé</p>
              </div>

              {/* Liste des CV existants */}
              {existingCVs.length > 0 ? (
                existingCVs.map((cv) => (
                  <div
                    key={cv.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    {/* En-tête de la carte */}
                    <div className={`${cv.color.bg} p-4 flex items-center justify-between`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cv.color.bg}`}>
                          <FiFileText className={`w-5 h-5 ${cv.color.text}`} />
                        </div>
                        <div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${cv.color.badge} text-white`}>
                            {cv.progress}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-5 flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-2 truncate">{cv.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">Modifié le {cv.date}</p>
                      
                      {/* Barre de progression */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progression</span>
                          <span>{cv.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${cv.color.badge}`}
                            style={{ width: `${cv.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {/* <button
                            onClick={() => navigate(`/utilisateur/cv/${cv.id}/edit`)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button> */}
                          <button
                            onClick={() => navigate(`/utilisateur/preview/${cv.id}`)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <FiDownload className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cv.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                            disabled={loadingDelete[cv.id]}
                          >
                            {loadingDelete[cv.id] ? (
                              <ClipLoader size={12} color="#EF4444" />
                            ) : (
                              <FiTrash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          cv.status === "Terminé" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {cv.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // État vide - occupe toute la largeur
                <div className="col-span-full bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiFileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun CV enregistré</h3>
                  <p className="text-gray-500 mb-6">Commencez par créer votre premier CV</p>
                  <button
                    onClick={() => modalRef.current.openModal('create')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    Créer mon premier CV
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Popup de notification */}
      {popup.visible && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`px-6 py-4 rounded-lg shadow-lg border-l-4 ${
            popup.type === "success"
              ? "bg-green-50 text-green-800 border-green-500"
              : "bg-red-50 text-red-800 border-red-500"
          } animate-slide-down max-w-md w-full`}>
            <div className="flex items-center">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                popup.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}>
                {popup.type === "success" ? "✓" : "!"}
              </div>
              <div>
                <p className="font-medium">{popup.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup de confirmation */}
      {confirmPopup.visible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Confirmer la suppression
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {confirmPopup.message}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmPopup.onCancel}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmPopup.onConfirm}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal ref={modalRef} onCreateStart={handleCreateCV} />
    </div>
  );
};

export default CV;