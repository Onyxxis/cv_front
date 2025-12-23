
import React, { useState, useEffect, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import LeftPanel from "./AddCv/LeftPanel";
import RightPanel from "./AddCv/RightPanel";
import { initialData } from "./AddCv/data/data";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "./AddCv/Modal";
import ATS from "./AddCv/ATS";
import Popup from "./Popup";
import Sidebar from "./Sidebar";

export default function CVBuilder() {
    const [cvData, setCvData] = useState(initialData);
    const [activeSection, setActiveSection] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [isChoosingTemplate, setIsChoosingTemplate] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showTitlePopup, setShowTitlePopup] = useState(false);
    const [tempTitle, setTempTitle] = useState('');
    const [atsAnalysis, setAtsAnalysis] = useState(null);
    const [atsScore, setAtsScore] = useState(0);
    const [atsLoading, setAtsLoading] = useState(false);
    const [currentCV, setCurrentCV] = useState(null);
    const [popupMessage, setPopupMessage] = useState("");




    const { user } = useContext(AuthContext);
    const userId = user?.user_id;

    const navigate = useNavigate();
    const { } = useParams();
    const modalRef = useRef(null);

    useEffect(() => {
        axiosInstance
            .get("/templates")
            .then((res) => {
                console.log("Templates récupérés :", res.data);
                const data = Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res.data.templates)
                        ? res.data.templates
                        : [];
                setTemplates(data);
            })
            .catch((err) => console.error("Erreur de récupération des templates :", err));
    }, []);

    const handleModalSubmit = ({ title, jobTitle }) => {
        setCvData((prev) => ({
            ...prev,
            title: title || prev.title,
            jobTitle: jobTitle || prev.jobTitle,
        }));
    };

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const updateSectionData = (section, data) => {
        setCvData((prev) => ({ ...prev, [section]: data }));
    };

    const addItemToSection = (section, emptyTemplate) => {
        const currentData = cvData[section] || [];
        setCvData((prev) => ({
            ...prev,
            [section]: [...currentData, emptyTemplate],
        }));
    };

    const updateItemInSection = (section, index, data) => {
        const currentData = [...cvData[section]];
        currentData[index] = data;
        setCvData((prev) => ({ ...prev, [section]: currentData }));
    };

    const removeItemFromSection = (section, index) => {
        const currentData = cvData[section].filter((_, i) => i !== index);
        setCvData((prev) => ({ ...prev, [section]: currentData }));
    };

    const handleTemplateSelect = (template) => {
        console.log("Template sélectionné :", template);
        setCvData((prev) => ({ ...prev, template_id: template.id || "" }));
        setSelectedTemplate(template);
        setIsChoosingTemplate(false);
        setActiveSection(null);
    };

    const normalizeCVData = (data) => {
        const modalData = modalRef.current?.getFormData?.() || {};
        const finalTitle = modalData.title?.trim() || data.title?.trim() || "";

        return {
            user_id: data.user_id || "",
            template_id: data.template_id || "",
            title: finalTitle,
            personal_info: data.informations_personnelles || {},
            experiences: data.experiences || [],
            education: data.formations || [],
            projects: data.projets || [],
            skills: data.competences || [],
            languages: data.langues || [],
            certifications: data.certifications?.map(cert => ({
                title: cert.titre?.trim() || "",
                organization: cert.organisation?.trim() || "",
                date_obtained: cert.date_obtention || "",
                url: cert.url?.trim() || ""
            })) || [],
        };
    };

    const fetchATSAnalysis = async (createdCV) => {
        try {
            setAtsLoading(true);

            const response = await axiosInstance.post("/ats/analyze", createdCV);

            if (response?.data?.status === "success") {
                const analysis = response.data.analysis || {};
                const finalScore = Number(analysis.score);

                setAtsAnalysis(analysis);
                setAtsScore(Number.isFinite(finalScore) ? finalScore : 0);
                console.log("Analyse ATS reçue :", analysis);

            } else {
                console.warn("ATS analyze did not return success:", response?.data);
            }
        } catch (error) {
            console.error("Erreur lors de l'analyse ATS :", error);
        } finally {
            setAtsLoading(false);
        }
    };


    const handleCreateCV = async () => {
        const modalData = modalRef.current?.getFormData?.() || {};
        const titleToUse = cvData.title?.trim() || modalData.title?.trim();

        if (!titleToUse) {
            setTempTitle('');
            setShowTitlePopup(true);
            return;
        }

        if (!cvData.template_id) {
            showPopup("Veuillez sélectionner un modèle de CV avant de continuer !");
            return;
        }

        try {
            // 1️⃣ Récupérer les CV existants de l'utilisateur
            const response = await axiosInstance.get(`/cvs/user/${userId}`);
            const existingCVs = response.data.cvs || [];
            const existingCV = existingCVs.find(cv => cv.title?.trim() === titleToUse);

            // 2️⃣ Normaliser les données du CV
            const payload = normalizeCVData({ ...cvData, user_id: userId });
            console.log("Données normalisées envoyées :", payload);

            let savedCV = null;

            if (existingCV) {
                // Mise à jour
                const updateResponse = await axiosInstance.patch(`/cvs/${existingCV.id}`, payload);

                if (updateResponse.status === 200) {
                    showPopup("CV mis à jour avec succès !");
                    savedCV = updateResponse.data.cv;
                    setCurrentCV(savedCV);
                } else {
                    showPopup("Erreur lors de la mise à jour du CV !");
                    return;
                }
            } else {
                // Création
                const createResponse = await axiosInstance.post("/cvs/", payload);

                if (createResponse.status === 200 || createResponse.status === 201) {
                    showPopup("CV créé avec succès !");
                    savedCV = createResponse.data.cv;
                    setCurrentCV(savedCV);
                } else {
                    showPopup("Erreur lors de la création du CV !");
                    return;
                }
            }

            // 3️⃣ Envoyer le même JSON utilisé pour création/mise à jour au endpoint ATS
            if (savedCV) {
                await fetchATSAnalysis(payload);  
            }

        } catch (error) {
            console.error("Erreur réseau :", error);
            showPopup("Erreur lors de l'opération !");
        }
    };



    // const handleCreateCV = async () => {
    //     const modalData = modalRef.current?.getFormData?.() || {};
    //     const titleToUse = cvData.title?.trim() || modalData.title?.trim();

    //     if (!titleToUse) {
    //         setTempTitle('');
    //         setShowTitlePopup(true);
    //         return;
    //     }

    //     if (!cvData.template_id) {
    //         showPopup("Veuillez sélectionner un modèle de CV avant de continuer !");
    //         return;
    //     }

    //     try {
    //         // 1️⃣ Récupérer les CV existants de l'utilisateur
    //         const response = await axiosInstance.get(`/cvs/user/${userId}`);
    //         const existingCVs = response.data.cvs || [];
    //         const existingCV = existingCVs.find(cv => cv.title?.trim() === titleToUse);

    //         const payload = normalizeCVData({ ...cvData, user_id: userId });
    //         console.log("Données normalisées envoyées :", payload);

    //         if (existingCV) {
    //             // Mise à jour
    //             const updateResponse = await axiosInstance.patch(`/cvs/${existingCV.id}`, payload);

    //             if (updateResponse.status === 200) {
    //                 showPopup("CV mis à jour avec succès !");
    //                 setCurrentCV(updateResponse.data.cv);
    //                 await fetchATSAnalysis(updateResponse.data.cv);
    //             } else {
    //                 showPopup("Erreur lors de la mise à jour du CV !");
    //             }
    //         } else {
    //             // Création
    //             const createResponse = await axiosInstance.post("/cvs/", payload);

    //             if (createResponse.status === 200 || createResponse.status === 201) {
    //                 showPopup("CV créé avec succès !");
    //                 setCurrentCV(createResponse.data.cv);
    //                 await fetchATSAnalysis(createResponse.data.cv);
    //             } else {
    //                 showPopup("Erreur lors de la création du CV !");
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Erreur réseau :", error);
    //         showPopup("Erreur lors de l'opération !");
    //     }
    // };



    const previewCV = () => {
        if (!currentCV || !currentCV.id) {
            console.error("CV invalide pour la  :", currentCV, error);
            return;
        }
        console.log("Navigation vers la prévisualisation du CV ID :", currentCV.id);
        navigate(`/utilisateur/preview/${currentCV.id}`);
    };



    // ⚡ Mise à jour du CVBuilder avec les données extraites d'un CV importé
    const handleImportedData = (extractedData) => {
        console.log("Données importées depuis le modal :", extractedData);

        setCvData((prev) => ({
            ...prev,
            title: extractedData.personal_info?.first_name
                ? `${extractedData.personal_info.first_name}_${extractedData.personal_info.last_name}`
                : prev.title,
            jobTitle: extractedData.personal_info?.job_title || prev.jobTitle,
            // informations_personnelles: extractedData.personal_info || {},
            // experiences: extractedData.experiences || [],
            // formations: extractedData.education || [],
            // projects: extractedData.projects || [],
            // competences: extractedData.skills || [],
            // langues: extractedData.languages || [],
            // certifications: extractedData.certifications || [],
            // Clés corrigées
            personal_info: extractedData.personal_info || {},
            experiences: extractedData.experiences || [],
            education: extractedData.education || [],
            projects: extractedData.projects || [],
            skills: extractedData.skills || [],
            languages: extractedData.languages || [],
            certifications: extractedData.certifications || [],
        }));

        // Ouvrir éventuellement la première section pour affichage
        setActiveSection("informations_personnelles");
    };


    const showPopup = (msg) => {
        setPopupMessage(msg);
    };


    return (
        <div className="flex h-full bg-gray-50 relative">
            <Popup
                message={popupMessage}
                onClose={() => setPopupMessage("")}
            />

            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-pink-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="flex flex-1">
                <div className="w-1/4 flex flex-col bg-gray-50 rounded-t-2xl mr-2  ">
                    <LeftPanel
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        openSections={openSections}
                        toggleSection={toggleSection}
                        cvData={cvData}
                        addItemToSection={addItemToSection}
                        onChooseTemplate={() => setIsChoosingTemplate(true)}
                        onCreateCV={handleCreateCV}
                    />
                </div>
                {/* Panneau droit */}
                <div className="w-2/4 min-h-[calc(100vh-2rem)] bg-white rounded-t-3xl rounded-b-3xl shadow-md m-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection || (isChoosingTemplate ? "template" : "default")}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <RightPanel
                                activeSection={activeSection}
                                cvData={cvData}
                                updateSectionData={updateSectionData}
                                updateItemInSection={updateItemInSection}
                                removeItemFromSection={removeItemFromSection}
                                isChoosingTemplate={isChoosingTemplate}
                                templates={templates}
                                onTemplateSelect={handleTemplateSelect}
                                selectedTemplate={selectedTemplate}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="w-1/4 flex flex-col bg-gray-50   ml-2 overflow-y-auto">
                    <ATS
                        atsAnalysis={atsAnalysis}
                        score={atsScore}
                        atsLoading={atsLoading}
                        onPreview={previewCV}
                    />

                </div>
            </div>
            {showTitlePopup && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-5 border-l-blue-600 border-l-4 rounded-2xl shadow-xl border border-gray-200 bg-white animate-slide-down max-w-sm w-full">
                    <div className="flex items-start gap-4">

                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-sm flex-shrink-0 mt-0.5">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-gray-900 font-semibold text-base mb-3 leading-tight">
                                Titre de votre CV
                            </h3>

                            <input
                                type="text"
                                value={tempTitle}
                                onChange={(e) => setTempTitle(e.target.value)}
                                placeholder="Ex: Développeur Fullstack"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                autoFocus
                            />

                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowTitlePopup(false)}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>

                                <button
                                    disabled={!tempTitle.trim()}
                                    onClick={() => {
                                        if (!tempTitle.trim()) return;
                                        setCvData((prev) => ({ ...prev, title: tempTitle.trim() }));
                                        setShowTitlePopup(false);
                                        // handleCreateCV();
                                    }}
                                    className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    ok
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            )}




            {/* Modal */}
            <Modal ref={modalRef}
                onCreateStart={handleModalSubmit}
                onImportedData={handleImportedData}
            />

            {/* Animation blob */}
            <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
        </div>
    );

}
