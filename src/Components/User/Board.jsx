

import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import {
  FiPlus, FiUpload, FiFileText, FiEdit, FiTrash2, FiDownload, FiChevronRight,
  FiStar, FiTrendingUp, FiBarChart2, FiLayers, FiUserCheck, FiInbox
} from "react-icons/fi";
import { Modal } from "./AddCv/Modal";
import { ClipLoader } from "react-spinners";

const Board = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [lastCvTitle, setLastCvTitle] = useState(null);
  const [totalCVs, setTotalCVs] = useState(null);
  const [stats, setStats] = useState({ completed_cvs: null, in_progress_cvs: null });
  const [existingCVs, setExistingCVs] = useState([]);
  const [loadingCVs, setLoadingCVs] = useState(false);
  const [loadingTotalCVs, setLoadingTotalCVs] = useState(false);
  const [loadingLastCv, setLoadingLastCv] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState({});

  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImportCV = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (file) => {
    if (modalRef.current) {
      modalRef.current.openModal('upload', file);
    }
  };
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

  const [confirmPopup, setConfirmPopup] = useState({
    visible: false,
    message: "",
    onConfirm: null,
    onCancel: null,
  });

  const colors = {
    bg: "bg-blue-100",
    border: "border-blue-200",
    text: "text-blue-600",
    badge: "bg-blue-500 text-white"
  };

  const userId = user?.user_id;

  // Fetch total CVs
  useEffect(() => {
    const fetchTotalCVs = async () => {
      if (!userId) return;
      setLoadingTotalCVs(true);
      try {
        const response = await axiosInstance.get(`/cvs/user/${userId}`);
        setTotalCVs(response.data.total ?? 0);
      } catch (err) {
        console.error("Erreur lors de la récupération des CV :", err);
        setTotalCVs(0);
      } finally {
        setLoadingTotalCVs(false);
      }
    };
    fetchTotalCVs();
  }, [userId]);

  // Fetch last CV
  useEffect(() => {
    const fetchLastCv = async () => {
      if (!userId) return;
      setLoadingLastCv(true);
      try {
        const response = await axiosInstance.get(`/cvs/users/${userId}/last`);
        setLastCvTitle(response.data.title || "...");
      } catch (err) {
        setLastCvTitle("...");
        console.error("Erreur lors de la récupération du dernier CV :", err);
      } finally {
        setLoadingLastCv(false);
      }
    };
    fetchLastCv();
  }, [userId]);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
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
  }, []);

  // Fetch CVs
  // useEffect(() => {
  //   const fetchCVs = async () => {
  //     if (!userId) return;
  //     setLoadingCVs(true);
  //     try {
  //       const res = await axiosInstance.get(`/cvs/user/${userId}`);
  //       const cvs = res.data.cvs.map(cv => ({
  //         id: cv.id,
  //         name: cv.title,
  //         date: new Date(cv.updated_at).toLocaleDateString("fr-FR"),
  //         progress: cv.completion_percentage ?? 0
  //       }));
  //       setExistingCVs(cvs);
  //     } catch (err) {
  //       console.error("Erreur lors de la récupération des CV :", err);
  //       setExistingCVs([]);
  //     } finally {
  //       setLoadingCVs(false);
  //     }
  //   };
  //   fetchCVs();
  // }, [userId]);
  // Fetch CVs
  useEffect(() => {
    const fetchCVs = async () => {
      if (!userId) return;
      setLoadingCVs(true);
      try {
        const res = await axiosInstance.get(`/cvs/user/${userId}`);

        const sorted = res.data.cvs.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );

        const lastFive = sorted.slice(0, 5);

        const cvs = lastFive.map(cv => ({
          id: cv.id,
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


  const openConfirmPopup = (message, onConfirm, onCancel) => {
    setConfirmPopup({
      visible: true,
      message,
      onConfirm,
      onCancel,
    });
  };
  // Delete CV
  const handleDelete = (cvId) => {
    openConfirmPopup(
      "Voulez-vous vraiment supprimer ce CV ?",
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

  const items = [
    {
      title: "Améliorer votre CV",
      desc: "Découvrez comment optimiser vos CV pour chaque poste visé.",
      icon: <FiBarChart2 className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Templates modernes",
      desc: "Explorez des modèles de CV adaptés aux secteurs technologiques.",
      icon: <FiLayers className="w-6 h-6" />,
      gradient: "from-violet-500 to-purple-600",
    },
    {
      title: "Conseils entretien",
      desc: "Préparez-vous aux entretiens avec des astuces simples et efficaces.",
      icon: <FiUserCheck className="w-6 h-6" />,
      gradient: "from-emerald-400 to-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 border-blue-900">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r  rounded-3xl blur opacity-10"></div>
          <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Bonjour {user?.username || " "}, Bienvenue sur votre Dashboard
            </h1>
            <p className="text-gray-600 mt-4 text-lg max-w-2xl">
              Gérez facilement vos CV et découvrez des conseils pour booster votre carrière.
            </p>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="relative group">
            <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-500 text-sm font-medium">Nombre de CV</span>
                  <span className="block text-3xl font-bold text-gray-900 mt-2">
                    {loadingTotalCVs ? <ClipLoader color="#2563EB" size={20} /> : totalCVs ?? "..."}
                  </span>
                </div>
                <div className="p-3 bg-blue-50 rounded-2xl">
                  <FiFileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-emerald-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-500 text-sm font-medium">Dernier CV modifié</span>
                  <span className="block text-xl font-semibold text-gray-900 mt-2 truncate max-w-[120px]">
                    {loadingLastCv ? <ClipLoader color="#2563EB" size={20} /> : lastCvTitle ?? "..."}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl">
                  <FiTrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-amber-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-500 text-sm font-medium">CV Complétés</span>
                  <span className="block text-3xl font-bold text-gray-900 mt-2">
                    {loadingStats ? <ClipLoader color="#2563EB" size={20} /> : stats.completed_cvs ?? "..."}
                  </span>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl">
                  <FiStar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-violet-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-500 text-sm font-medium">En progression</span>
                  <span className="block text-3xl font-bold text-gray-900 mt-2">
                    {loadingStats ? <ClipLoader color="#2563EB" size={20} /> : stats.in_progress_cvs ?? "..."}
                  </span>
                </div>
                <div className="p-3 bg-violet-50 rounded-2xl">
                  <FiTrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Rapides */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Actions Rapides</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => modalRef.current?.openModal('create')}
              className="group relative flex items-center px-8 py-4 bg-white text-blue-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold hover:scale-105"
            >
              <FiPlus className="mr-3 w-5 h-5" />
              <span className="relative">Nouveau CV</span>
            </button>

            <button
              onClick={handleImportCV}
              className="group relative flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl shadow-2xl hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold hover:scale-105"
            >
              <FiUpload className="mr-3 w-5 h-5" />
              <span className="relative">Importer un CV</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>
          <Modal ref={modalRef} />
        </div>
      </div>

      {/* Liste des CV */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Mes CV</h2>
          <button
            onClick={() => navigate("/utilisateur/mes_cvs")}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
            Voir tout <FiChevronRight className="ml-1 w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
              <FiInbox className="w-14 h-14 mb-4 mr-4" />
              <p className="text-lg font-medium">Aucun CV enregistré pour l'instant</p>
            </div>
          )}
        </div>
      </div>

      {/* Conseils & Templates */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Conseils & Templates</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
            Explorer <FiChevronRight className="ml-1 w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white mb-4`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              <div className="flex items-center text-blue-600 font-medium mt-4 group-hover:translate-x-1 transition-transform duration-200">
                Découvrir <FiChevronRight className="ml-1 w-4 h-4" />
              </div>
            </div>
          ))}
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
            </div>
          </div>
        </div>
      )}



      {confirmPopup.visible && (
        <div className="fixed inset-0  bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirmation
            </h3>
            <p className="text-gray-600 mb-6">{confirmPopup.message}</p>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => {
                  confirmPopup.onCancel && confirmPopup.onCancel();
                }}
                className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium text-gray-800"
              >
                Annuler
              </button>

              <button
                onClick={() => {
                  confirmPopup.onConfirm && confirmPopup.onConfirm();
                }}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
