//  version avant integration de ats score
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiDownload, FiShare2, FiFileText, FiMoreVertical, FiX, FiAward } from "react-icons/fi";
import axiosInstance from "../../../api/axiosInstance";
import html2pdf from "html2pdf.js";

// Spinner component
const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
);

// ATS Score Popup Component
const ATSScorePopup = ({ score, isVisible, onClose, atsAnalysis, atsLoading }) => {
    if (!isVisible) return null;

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getScoreMessage = (score) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Bon";
        return "À améliorer";
    };

    return (
        <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm animate-fade-in-up z-50">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <FiAward className="text-blue-600 text-xl" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Score ATS</h3>
                        <p className="text-sm text-gray-600">Analyse du CV</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FiX className="text-lg" />
                </button>
            </div>

            <div className="text-center mb-4">
                <div className={`text-4xl font-bold mb-2`}>
                    {atsLoading ? <Spinner /> : `${score}%`}
                </div>
                <div className={`text-sm font-medium ${getScoreColor(score)}`}>
                    {atsLoading ? "Chargement..." : getScoreMessage(score)}
                </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                    className={`h-2 rounded-full transition-all duration-500 ${score >= 80 ? "bg-green-500" :
                        score >= 60 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                    style={{ width: `${score}%` }}
                ></div>
            </div>

            <p className="text-xs text-gray-500 text-center mb-4">
                Ce score évalue la compatibilité de votre CV avec les systèmes de suivi des candidats.
            </p>

            {/* Section améliorations et mots-clés */}
            <div className="mt-4 text-left text-sm">
                {atsLoading ? (
                    <div className="flex justify-center"><Spinner /></div>
                ) : (
                    <>
                        {atsAnalysis?.improvements?.length > 0 && (
                            <>
                                <h4 className="font-medium mb-1">Suggestions d'amélioration :</h4>
                                <ul className="list-disc ml-5 mb-2">
                                    {atsAnalysis.improvements.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {atsAnalysis?.keyword_recommendations?.length > 0 && (
                            <>
                                <h4 className="font-medium mb-1">Mots-clés recommandés :</h4>
                                <div className="flex flex-wrap gap-2">
                                    {atsAnalysis.keyword_recommendations.map((kw, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                                        >
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>

    );
};

// Download Menu Component
const DownloadMenu = ({ onDownloadPDF, onDownloadHTML, onShare, processing }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.download-menu')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="download-menu relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
                <FiMoreVertical className="text-gray-700 text-lg" />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 w-64 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Télécharger le CV</p>
                    </div>

                    <button
                        onClick={() => {
                            onDownloadPDF();
                            setIsOpen(false);
                        }}
                        disabled={processing}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <FiFileText className="text-blue-600 text-lg" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Format PDF</p>
                            <p className="text-xs text-gray-500">Optimisé pour l'impression</p>
                        </div>
                        {processing && <Spinner />}
                    </button>

                    <button
                        onClick={() => {
                            onDownloadHTML();
                            setIsOpen(false);
                        }}
                        disabled={processing}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <div className="p-2 bg-green-50 rounded-lg">
                            <FiDownload className="text-green-600 text-lg" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Format HTML</p>
                            <p className="text-xs text-gray-500">Version éditable</p>
                        </div>
                        {processing && <Spinner />}
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                        onClick={() => {
                            onShare();
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <FiShare2 className="text-indigo-600 text-lg" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Partager le lien</p>
                            <p className="text-xs text-gray-500">Copier dans le presse-papier</p>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};

export default function Preview() {
    const [showPopup, setShowPopup] = useState(false);

    const [cvData, setCvData] = useState(null);
    const [templateHtml, setTemplateHtml] = useState("");
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [showATSScore, setShowATSScore] = useState(true);
    const [atsScore, setAtsScore] = useState(null);
    const { cvId } = useParams();
    const [atsAnalysis, setAtsAnalysis] = useState(null);
    const [atsLoading, setAtsLoading] = useState(false);

    useEffect(() => {
    if (!cvId) return;

    const fetchCV = async () => {
        try {
            setLoading(true);

            // Récupération du CV
            const { data: cv } = await axiosInstance.get(`/cvs/${cvId}`);
            setCvData(cv);

            // Injection du template HTML
            const { data: template } = await axiosInstance.get(`/templates/${cv.template_id}/file`);
            const html = injectCVData(template, cv);
            setTemplateHtml(html);

            // Appel à Gemini ATS pour l'analyse réelle
            await fetchATSAnalysis(cv);

        } catch (error) {
            console.error("Erreur lors du chargement du CV :", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchATSAnalysis = async (cv) => {
        try {
            setAtsLoading(true);
            const response = await axiosInstance.post(`/ats/analyze`, cv);
            if (response.data.status === "success") {
                const analysis = response.data.analysis;
                setAtsAnalysis(analysis);
                setAtsScore(analysis.score || 0); // Mettre à jour le score réel
            }
        } catch (error) {
            console.error("Erreur lors de l'analyse ATS :", error);
        } finally {
            setAtsLoading(false);
        }
    };

    fetchCV();
}, [cvId]);


     
    const injectCVData = (html, data) => {
        let output = html;

        // =================== PERSONAL INFO ===================
        const info = data.personal_info || {};
        Object.keys(info).forEach((key) => {
            const regex = new RegExp(`{{\\s*personal_info.${key}\\s*}}`, "g");
            output = output.replace(regex, info[key] || "");
        });

        // =================== ARRAYS ===================
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

    // =================== BUTTONS HANDLERS ===================
    const handleDownloadPDF = async () => {
        if (!templateHtml) return;
        setProcessing(true);

        try {
            const element = document.createElement("div");
            element.innerHTML = templateHtml;

            const opt = {
                margin: 0.5,
                filename: `${cvData.title || "cv"}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
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
            a.download = `${cvData.title || "cv"}.html`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Erreur lors du téléchargement HTML :", error);
        } finally {
            setProcessing(false);
        }
    };

    const handleShareLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowPopup(true); // Affiche le popup

        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col items-center">
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Chargement de votre CV...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header avec le menu de téléchargement */}
                    <div className="w-full max-w-7xl mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Aperçu du CV</h1>
                                <p className="text-gray-600 mt-1">{cvData?.title || "Mon Curriculum Vitae"}</p>
                            </div>

                            <DownloadMenu
                                onDownloadPDF={handleDownloadPDF}
                                onDownloadHTML={handleDownloadHTML}
                                onShare={handleShareLink}
                                processing={processing}
                            />
                        </div>
                    </div>

                    {/* Conteneur principal du CV */}
                    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                        <iframe
                            title="Aperçu CV"
                            srcDoc={templateHtml}
                            className="w-full h-[1200px] border-none"
                            sandbox="allow-same-origin"
                        />
                    </div>

                    {/* Popup du score ATS */}
                    {/* <ATSScorePopup
                        score={atsScore}
                        isVisible={showATSScore}
                        onClose={() => setShowATSScore(false)}
                    /> */}
                    <ATSScorePopup
                        score={atsScore}
                        atsAnalysis={atsAnalysis}
                        atsLoading={atsLoading}
                        isVisible={showATSScore}
                        onClose={() => setShowATSScore(false)}
                    />

                </>
            )}
            {showPopup && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg border-l-4 bg-green-50 text-green-800 border-green-500 animate-slide-down">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500">
                            !
                        </div>
                        <span className="font-medium">Lien copié dans le presse-papier !</span>
                    </div>
                </div>
            )}


            {/* Styles CSS pour les animations */}
            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
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
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}

