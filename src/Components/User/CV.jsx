import React, { useState, useRef, useContext, useEffect } from "react";
import {
  FiPlus,
  FiUpload,
  FiFileText,
  FiX,
  FiCheck,
  FiTrash2,
  FiEdit,
  FiDownload,
  FiStar,
  FiTrendingUp,
  FiChevronRight,
  FiBarChart2,
  FiLayers,
  FiUserCheck,
  FiInbox
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import { Modal } from './AddCv/Modal';
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

const CV = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loadingCVs, setLoadingCVs] = useState(false);
  const [existingCVs, setExistingCVs] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState({});
  const [stats, setStats] = useState({ completed_cvs: 0, in_progress_cvs: 0 });
  const [loadingStats, setLoadingStats] = useState(false);

  const modalRef = useRef();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fileName: '',
    actionType: 'create',
    uploadedFile: null,
    jobTitle: '',
  });

  // 🧩 Gestion des champs du modal
  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === 'application/pdf' ||
        file.type.includes('word') ||
        file.type === 'application/msword')
    ) {
      setFormData((prev) => ({
        ...prev,
        uploadedFile: file,
        fileName: file.name.replace(/\.[^/.]+$/, ''),
      }));
    } else {
      alert('Veuillez sélectionner un fichier PDF ou Word valide.');
    }
  };

  const handleCreateCV = (data) => {
    console.log("CV créé :", data.title);
  };

  const colors = {
    bg: "bg-blue-100",
    border: "border-blue-200",
    text: "text-blue-600",
    badge: "bg-blue-500 text-white"
  };

  const userId = user?.user_id;

  // 🔹 Récupération des CVs
  useEffect(() => {
    const fetchCVs = async () => {
      if (!userId) return;
      setLoadingCVs(true);
      try {
        const res = await axiosInstance.get(`/cvs/user/${userId}`);
        const cvs = res.data.cvs.map(cv => ({
          id: cv._id,
          name: cv.title,
          date: new Date(cv.updated_at).toLocaleDateString("fr-FR"),
          progress: cv.completion_percentage ?? 0
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

  // 🔹 Suppression d'un CV
  const handleDelete = async (cvId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce CV ?")) return;
    setLoadingDelete(prev => ({ ...prev, [cvId]: true }));
    try {
      await axiosInstance.delete(`/cvs/${cvId}`);
      setExistingCVs(existingCVs.filter(cv => cv.id !== cvId));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    } finally {
      setLoadingDelete(prev => ({ ...prev, [cvId]: false }));
    }
  };

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

  const renderStars = (count) => (
    <div className="flex space-x-0.5">
      {[...Array(5)].map((_, i) => (
        <FiStar key={i} className={`w-3 h-3 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Créer un nouveau CV */}
          <div
            onClick={() => modalRef.current.openModal('create')}
            className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 border-dashed border-gray-300 hover:border-blue-300 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="p-4 bg-blue-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiPlus className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Créer un nouveau CV</h3>
            <p className="text-sm text-gray-500">Commencez avec un template personnalisé</p>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* CV existants */}
          {loadingCVs ? (
            <div className="col-span-full flex justify-center py-20">
              <ClipLoader color="#2563EB" size={40} />
            </div>
          ) : existingCVs.length > 0 ? (
            existingCVs.map((cv) => (
              <div
                key={cv.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`${colors.bg} ${colors.border} h-32 flex items-center justify-center relative overflow-hidden`}>
                  <FiFileText className={`w-12 h-12 ${colors.text} relative z-10`} />
                  <div className="absolute top-3 left-3">
                    {loadingDelete[cv.id] ? (
                      <ClipLoader color="#2563EB" size={18} />
                    ) : (
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                        {cv.progress}%
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{cv.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">Modifié le {cv.date}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full ${colors.badge.split(" ")[0]}`}
                      style={{ width: `${cv.progress}%` }}
                    ></div>
                  </div>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${colors.badge}`}>
                    {cv.progress === 100 ? "Terminé" : "En cours"}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <button
                    onClick={() => navigate(`/utilisateur/cv/${cv.id}/edit`)}
                    className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
                  >
                    <FiEdit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(cv.id)}
                    className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-600" />
                  </button>
                  <button
                    onClick={() => navigate(`/utilisateur/cv/${cv.id}/download`)}
                    className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
                  >
                    <FiDownload className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-row items-center justify-center py-20 text-gray-400">
              <p className="text-lg font-medium">Aucun CV enregistré pour l'instant</p>
            </div>
          )}
        </div>
      </div>

      <Modal ref={modalRef} onCreateStart={handleCreateCV} />
    </div>
  );
};

export default CV;


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
// } from 'react-icons/fi';
// import {
//   FiPlus, FiUpload, FiFileText, FiEdit, FiTrash2, FiDownload, FiChevronRight,
//   FiStar, FiTrendingUp, FiBarChart2, FiLayers, FiUserCheck, FiInbox
// } from "react-icons/fi";
// import { useNavigate } from 'react-router-dom';
// import { Modal } from './AddCv/Modal';
// import axiosInstance from "../../api/axiosInstance";
// import { AuthContext } from "../../context/AuthContext";

// const CV = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const navigate = useNavigate();
//     const { user } = useContext(AuthContext);
//       const [loadingCVs, setLoadingCVs] = useState(false);
//       const [existingCVs, setExistingCVs] = useState([]);
    
  
//   const modalRef = useRef();
//   const [formData, setFormData] = useState({
//     fileName: '',
//     actionType: 'create',
//     uploadedFile: null,
//     jobTitle: '',
//   });
//   const fileInputRef = useRef(null);

//   // 🧩 gestion des champs du modal
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
//       alert('Veuillez sélectionner un fichier PDF ou Word valide.');
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

//  useEffect(() => {
//     const fetchCVs = async () => {
//       if (!userId) return;
//       setLoadingCVs(true);
//       try {
//         const res = await axiosInstance.get(`/cvs/user/${userId}`);
//         const cvs = res.data.cvs.map(cv => ({
//           id: cv._id,
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

//   // Delete CV
//   const handleDelete = async (cvId) => {
//     if (!window.confirm("Voulez-vous vraiment supprimer ce CV ?")) return;
//     setLoadingDelete(prev => ({ ...prev, [cvId]: true }));
//     try {
//       await axiosInstance.delete(`/cvs/${cvId}`);
//       setExistingCVs(existingCVs.filter(cv => cv.id !== cvId));
//     } catch (err) {
//       console.error("Erreur lors de la suppression :", err);
//     } finally {
//       setLoadingDelete(prev => ({ ...prev, [cvId]: false }));
//     }
//   };

//   useEffect(() => {
//     const fetchStats = async () => {
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
//   }, []);

//   const getColorClasses = (color) => {
//     const colorMap = {
//       blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
//       emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
//       violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', badge: 'bg-violet-100 text-violet-700' },
//       amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
//       rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-700' },
//     };
//     return colorMap[color] || colorMap.blue;
//   };

//   const renderStars = (count) => (
//     <div className="flex space-x-0.5">
//       {[...Array(5)].map((_, i) => (
//         <FiStar key={i} className={`w-3 h-3 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
//       ))}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//             {loadingCVs ? (
//               <div className="col-span-full flex justify-center py-20">
//                 <ClipLoader color="#2563EB" size={40} />
//               </div>
//             ) : existingCVs.length > 0 ? (
//               existingCVs.map((cv) => (
//                 <div
//                   key={cv.id}
//                   className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
//                 >
//                   <div className={`${colors.bg} ${colors.border} h-32 flex items-center justify-center relative overflow-hidden`}>
//                     <FiFileText className={`w-12 h-12 ${colors.text} relative z-10`} />
//                     <div className="absolute top-3 left-3">
//                       {loadingDelete[cv.id] ? (
//                         <ClipLoader color="#2563EB" size={18} />
//                       ) : (
//                         <div className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
//                           {cv.progress}%
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="p-5">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{cv.name}</h3>
//                     <p className="text-sm text-gray-500 mb-3">Modifié le {cv.date}</p>
//                     <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//                       <div
//                         className={`h-2 rounded-full ${colors.badge.split(" ")[0]}`}
//                         style={{ width: `${cv.progress}%` }}
//                       ></div>
//                     </div>
//                     <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${colors.badge}`}>
//                       {cv.progress === 100 ? "Terminé" : "En cours"}
//                     </span>
//                   </div>

//                   <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
//                     <button
//                       onClick={() => navigate(`/utilisateur/cv/${cv.id}/edit`)}
//                       className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
//                     >
//                       <FiEdit className="w-4 h-4 text-blue-600" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(cv.id)}
//                       className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
//                     >
//                       <FiTrash2 className="w-4 h-4 text-red-600" />
//                     </button>
//                     <button
//                       onClick={() => navigate(`/utilisateur/cv/${cv.id}/download`)}
//                       className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-100"
//                     >
//                       <FiDownload className="w-4 h-4 text-green-600" />
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full flex flex-row items-center justify-center py-20 text-gray-400">
//                  <p className="text-lg font-medium">Aucun CV enregistré pour l'instant</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Modal ref={modalRef} onCreateStart={handleCreateCV} />

//     </div>
//   );
// };

// export default CV;
