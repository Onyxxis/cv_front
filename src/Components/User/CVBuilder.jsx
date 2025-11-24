 
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
        const [currentCV, setCurrentCV] = useState(null); // <-- CV créé




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


    //   Création du CV
    const handleCreateCV = async () => {
        const modalData = modalRef.current?.getFormData?.() || {};
        const titleToUse = cvData.title?.trim() || modalData.title?.trim();

        if (!titleToUse) {
            setTempTitle('');
            setShowTitlePopup(true);
            return;
        }

        if (!cvData.template_id) {
            alert("Veuillez sélectionner un modèle de CV avant de continuer !");
            return;
        }

        try {
            const payload = normalizeCVData({ ...cvData, user_id: userId });
            console.log(" Données normalisées envoyées :", payload);

            const response = await axiosInstance.post("/cvs/", payload);

            if (response.status === 200 || response.status === 201) {
                alert("CV créé avec succès !");

                console.log("CV sauvegardé :", response.data);
                const createdCV = response.data.cv;
                setCurrentCV(createdCV);
                console.log("CV créé pour analyse ATS :", createdCV);
                await fetchATSAnalysis(createdCV);
                // navigate(`/utilisateur/preview/${response.data.cv.id}`);
            } else {
                console.error("Erreur lors de la création du CV :", response.data);
                alert("Erreur lors de la création du CV !");
            }
        } catch (error) {
            console.error(" Erreur réseau :", error);
            alert("Erreur lors de la création du CV !");
        }
    };


    // Fonction pour naviguer vers la page de preview d'un CV existant
    const previewCV = () => {
        if (!currentCV || !currentCV.id) {
            console.error("CV invalide pour la  :", currentCV,error);
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



    return (
        <div className="flex h-full bg-gray-50 relative">
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
                <div className="w-2/3 min-h-[calc(100vh-2rem)] bg-white rounded-t-3xl rounded-b-3xl shadow-md m-1 overflow-y-auto">
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
                        analysis={atsAnalysis}
                        score={atsScore}
                        loading={atsLoading}
                        onPreview={previewCV}            // ← CV créé

                    />

                </div>
            </div>
            {showTitlePopup && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-xl p-4 z-50 w-100">
                    <h3 className="text-gray-800 font-semibold mb-2">Veuillez saisir un titre pour votre CV</h3>
                    <input
                        type="text"
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        placeholder="Ex: CV Développeur Fullstack"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setShowTitlePopup(false)}
                            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                        >
                            Annuler
                        </button>
                        <button
                            disabled={!tempTitle.trim()}
                            onClick={() => {
                                if (!tempTitle.trim()) return;
                                setCvData((prev) => ({ ...prev, title: tempTitle.trim() }));
                                setShowTitlePopup(false);
                                handleCreateCV();
                            }}
                            className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            OK
                        </button>
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