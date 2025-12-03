import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiDownload, FiShare2, FiFileText, FiMoreVertical, FiEdit3, FiEye, FiCheck } from "react-icons/fi";
import axiosInstance from "../../../api/axiosInstance";
import html2pdf from "html2pdf.js";

const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
    </div>
);
const GlobalProcessingOverlay = () => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]">
        <div className="p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
            <Spinner />
            <span className="text-white font-medium">
                Traitement en cours...
            </span>
        </div>
    </div>
);


const DownloadMenu = ({ onDownloadPDF, onDownloadHTML, onShare, processing }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".download-menu")) setIsOpen(false);
        };

        if (isOpen) document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen]);

    return (
        <div className="download-menu relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-5 py-3 bg-white text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                <FiDownload className="text-gray-600" size={18} />
                Exporter
                <FiMoreVertical size={16} className="text-gray-400" />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-64 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 text-sm">Exporter le CV</p>
                        <p className="text-gray-500 text-xs mt-1">Format de sortie</p>
                    </div>

                    <div className="p-2 space-y-1">
                        <button
                            onClick={() => {
                                onDownloadPDF();
                                setIsOpen(false);
                            }}
                            disabled={processing}
                            className="flex items-center gap-3 w-full px-3 py-3 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 disabled:opacity-50 text-sm"
                        >
                            <div className="p-2 bg-blue-100 rounded-md">
                                <FiFileText className="text-blue-600" size={16} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">PDF Professionnel</p>
                                <p className="text-gray-500 text-xs">Optimisé impression</p>
                            </div>
                            {processing && <Spinner size="w-4 h-4" />}
                        </button>

                        <button
                            onClick={() => {
                                onDownloadHTML();
                                setIsOpen(false);
                            }}
                            disabled={processing}
                            className="flex items-center gap-3 w-full px-3 py-3 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 disabled:opacity-50 text-sm"
                        >
                            <div className="p-2 bg-green-100 rounded-md">
                                <FiDownload className="text-green-600" size={16} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">HTML Éditable</p>
                                <p className="text-gray-500 text-xs">Code source</p>
                            </div>
                            {processing && <Spinner size="w-4 h-4" />}
                        </button>

                        <div className="border-t border-gray-100 my-1"></div>

                        <button
                            onClick={() => {
                                onShare();
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-3 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 text-sm"
                        >
                            <div className="p-2 bg-purple-100 rounded-md">
                                <FiShare2 className="text-purple-600" size={16} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">Partager le lien</p>
                                <p className="text-gray-500 text-xs">Copier l'URL</p>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const PreviewHeader = ({ cvData, downloadMenu }) => (
    <div className="bg-white border-b border-gray-200 px-8 py-2">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-blue-700 rounded-lg flex items-center justify-center">
                            <FiEdit3 className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-blue-900 tracking-tight">
                                {cvData?.title || "Curriculum Vitae"}
                            </h1>
                            <p className="text-gray-500 text-sm mt-0.5">
                                Aperçu • {new Date().toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {downloadMenu}
                </div>
            </div>
        </div>
    </div>
);

const CVPreviewContainer = ({ templateHtml }) => (
    <div className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto p-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
                <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Aperçu </span>
                        </div>
                        <div className="text-xs text-gray-500">
                            Mode visualisation
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="border border-gray-200 rounded bg-white">
                        <iframe
                            title="Aperçu CV"
                            srcDoc={templateHtml}
                            className="w-full h-[1100px] border-none"
                            sandbox="allow-same-origin allow-scripts"
                            loading="eager"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const SuccessToast = ({ message, description, onClose }) => (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
        <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCheck size={12} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{message}</p>
                {description && (
                    <p className="text-gray-300 text-xs truncate">{description}</p>
                )}
            </div>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
            >
                <FiCheck size={16} />
            </button>
        </div>
    </div>
);

const LoadingState = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
            <Spinner />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chargement du CV</h3>
            <p className="text-gray-500 text-sm">Préparation de l'aperçu...</p>
        </div>
    </div>
);

// ===================== MAIN PREVIEW COMPONENT =====================
export default function Preview() {
    const [cvData, setCvData] = useState(null);
    const [templateHtml, setTemplateHtml] = useState("");
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const { cvId } = useParams();

    useEffect(() => {
        if (!cvId) return;

        const fetchCV = async () => {
            try {
                setLoading(true);
                const { data: cv } = await axiosInstance.get(`/cvs/${cvId}`);
                setCvData(cv);

                const { data: template } = await axiosInstance.get(`/templates/${cv.template_id}/file`);
                const html = injectCVData(template, cv);
                setTemplateHtml(html);
            } catch (error) {
                console.error("Erreur lors du chargement du CV :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCV();
    }, [cvId]);

    const injectCVData = (html, data) => {
        if (!html || !data) return "";

        let output = html;

        // Personal Info
        const info = data.personal_info || {};
        Object.keys(info).forEach((key) => {
            const regex = new RegExp(`{{\\s*personal_info.${key}\\s*}}`, "g");
            output = output.replace(regex, info[key] || "");
        });

        // Arrays: experiences, education, projects, skills, languages, certifications
        const arrays = ["experiences", "education", "projects", "skills", "languages", "certifications"];
        arrays.forEach((field) => {
            if (!data[field] || data[field].length === 0) {
                output = output.replace(new RegExp(`{{\\s*${field}\\s*}}`, "g"), "");
                return;
            }

            let htmlList = "";
            switch (field) {
                case "experiences":
                    htmlList = data.experiences.map(exp => `
            <div class="item">
              <strong>${exp.position}</strong> - ${exp.company}
              <em>(${exp.start_date} - ${exp.end_date || "Présent"})</em>
              <p>${exp.description || ""}</p>
            </div>`).join("");
                    break;
                case "education":
                    htmlList = data.education.map(ed => `
            <div class="item">
              <strong>${ed.degree_name}</strong> - ${ed.institution}
              <em>(${ed.start_date} - ${ed.end_date || "Présent"})</em>
            </div>`).join("");
                    break;
                case "projects":
                    htmlList = data.projects.map(pr => `
            <div class="item">
              <strong>${pr.name}</strong>
              <em>(${pr.start_date} - ${pr.end_date || "Présent"})</em>
              <p>${pr.description || ""}</p>
            </div>`).join("");
                    break;
                case "skills":
                    htmlList = data.skills.map(sk => `<div class="skill">${sk.name}</div>`).join("");
                    break;
                case "languages":
                    htmlList = data.languages.map(l => `<div class="lang-item">${l.name} - Niveau : ${l.level}</div>`).join("");
                    break;
                case "certifications":
                    htmlList = data.certifications.map(c => `
            <div class="certif-item">
              <strong>${c.title}</strong> - ${c.organization}
              <em>(${c.date_obtained})</em>
              ${c.url ? `<p><a href="${c.url}" target="_blank">${c.url}</a></p>` : ""}
            </div>`).join("");
                    break;
            }

            output = output.replace(new RegExp(`{{\\s*${field}\\s*}}`, "g"), htmlList);
        });

        return output;
    };

    const handleDownloadPDF = async () => {
        if (!templateHtml) return;
        setProcessing(true);

        try {
            const element = document.createElement("div");
            element.innerHTML = templateHtml;

            const opt = {
                margin: 0.5,
                filename: `${cvData?.title || "cv"}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error("Erreur lors de la génération du PDF :", error);
        } finally {
            setProcessing(false);
        }
    };

    const handleDownloadHTML = () => {
        if (!templateHtml) return;
        setProcessing(true);

        try {
            const blob = new Blob([templateHtml], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${cvData?.title || "cv"}.html`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Erreur lors du téléchargement HTML :", error);
        } finally {
            setProcessing(false);
        }
    };

    const handleShareLink = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (e) {
            console.error("Impossible de copier le lien :", e);
        }
    };

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PreviewHeader
                cvData={cvData}
                downloadMenu={
                    <DownloadMenu
                        onDownloadPDF={handleDownloadPDF}
                        onDownloadHTML={handleDownloadHTML}
                        onShare={handleShareLink}
                        processing={processing}
                    />
                }
            />

            <CVPreviewContainer templateHtml={templateHtml} />

            {showToast && (
                <SuccessToast
                    message="Lien copié"
                    description="Le lien a été copié dans le presse-papier"
                    onClose={() => setShowToast(false)}
                />
            )}

            <style>{`
                @keyframes slide-down {
                    from { 
                        opacity: 0; 
                        transform: translateY(-20px) translateX(-50%); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) translateX(-50%); 
                    }
                }
                @keyframes fade-in {
                    from { 
                        opacity: 0; 
                        transform: scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1); 
                    }
                }
                .animate-slide-down { 
                    animation: slide-down 0.2s ease-out; 
                }
                .animate-fade-in { 
                    animation: fade-in 0.15s ease-out; 
                }
            `}</style>
            {processing && <GlobalProcessingOverlay />}

        </div>
    );
}