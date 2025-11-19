// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FiDownload, FiShare2, FiFileText, FiMoreVertical, FiX, FiAward } from "react-icons/fi";
// import axiosInstance from "../../../api/axiosInstance";
// import html2pdf from "html2pdf.js";

// // ===================== SPINNER COMPONENT =====================
// const Spinner = () => (
//     <div className="flex justify-center items-center">
//         <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//     </div>
// );

// // ===================== ATS SCORE POPUP =====================
// const ATSScorePopup = ({ score, isVisible, onClose, atsAnalysis, atsLoading }) => {
//     if (!isVisible) return null;

//     const safeScore = typeof score === "number" && !Number.isNaN(score) ? score : 0;

//     const getScoreColor = (s) => {
//         if (s >= 80) return "text-green-600";
//         if (s >= 60) return "text-yellow-600";
//         return "text-red-600";
//     };

//     const getScoreMessage = (s) => {
//         if (s >= 80) return "Excellent";
//         if (s >= 60) return "Bon";
//         return "À améliorer";
//     };

//     return (
//         <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm animate-fade-in-up z-50">
//             <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center gap-3">
//                     <div className="p-2 bg-blue-50 rounded-lg">
//                         <FiAward className="text-blue-600 text-xl" />
//                     </div>
//                     <div>
//                         <h3 className="font-semibold text-gray-900">Score ATS</h3>
//                         <p className="text-sm text-gray-600">Analyse du CV</p>
//                     </div>
//                 </div>
//                 <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//                     <FiX className="text-lg" />
//                 </button>
//             </div>

//             <div className="text-center mb-4">
//                 <div className="text-4xl font-bold mb-2">
//                     {atsLoading ? <Spinner /> : `${safeScore}%`}
//                 </div>
//                 <div className={`text-sm font-medium ${getScoreColor(safeScore)}`}>
//                     {atsLoading ? "Chargement..." : getScoreMessage(safeScore)}
//                 </div>
//             </div>

//             <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//                 <div
//                     className={`h-2 rounded-full transition-all duration-500 ${safeScore >= 80 ? "bg-green-500" : safeScore >= 60 ? "bg-yellow-500" : "bg-red-500"
//                         }`}
//                     style={{ width: `${Math.min(Math.max(safeScore, 0), 100)}%` }}
//                 ></div>
//             </div>

//             <p className="text-xs text-gray-500 text-center mb-4">
//                 Ce score évalue la compatibilité de votre CV avec les systèmes de suivi des candidats.
//             </p>

//             <div className="mt-4 text-left text-sm">
//                 {atsLoading ? (
//                     <div className="flex justify-center"><Spinner /></div>
//                 ) : (
//                     <>
//                         {atsAnalysis?.improvements?.length > 0 && (
//                             <>
//                                 <h4 className="font-medium mb-1">Suggestions d'amélioration :</h4>
//                                 <ul className="list-disc ml-5 mb-2">
//                                     {atsAnalysis.improvements.map((item, idx) => (
//                                         <li key={idx}>{item}</li>
//                                     ))}
//                                 </ul>
//                             </>
//                         )}

//                         {atsAnalysis?.keyword_recommendations?.length > 0 && (
//                             <>
//                                 <h4 className="font-medium mb-1">Mots-clés recommandés :</h4>
//                                 <div className="flex flex-wrap gap-2">
//                                     {atsAnalysis.keyword_recommendations.map((kw, idx) => (
//                                         <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
//                                             {kw}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </>
//                         )}

//                         {!atsAnalysis?.improvements?.length && !atsAnalysis?.keyword_recommendations?.length && (
//                             <p className="text-xs text-gray-500">Aucune suggestion disponible.</p>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// // ===================== DOWNLOAD MENU =====================
// const DownloadMenu = ({ onDownloadPDF, onDownloadHTML, onShare, processing }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (!event.target.closest(".download-menu")) setIsOpen(false);
//         };

//         if (isOpen) document.addEventListener("click", handleClickOutside);
//         return () => document.removeEventListener("click", handleClickOutside);
//     }, [isOpen]);

//     return (
//         <div className="download-menu relative">
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
//             >
//                 <FiMoreVertical className="text-gray-700 text-lg" />
//             </button>

//             {isOpen && (
//                 <div className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 w-64 z-50 animate-fade-in">
//                     <div className="px-4 py-2 border-b border-gray-100">
//                         <p className="text-sm font-medium text-gray-900">Télécharger le CV</p>
//                     </div>

//                     <button
//                         onClick={() => {
//                             onDownloadPDF();
//                             setIsOpen(false);
//                         }}
//                         disabled={processing}
//                         className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
//                     >
//                         <div className="p-2 bg-blue-50 rounded-lg">
//                             <FiFileText className="text-blue-600 text-lg" />
//                         </div>
//                         <div className="flex-1">
//                             <p className="text-sm font-medium text-gray-900">Format PDF</p>
//                             <p className="text-xs text-gray-500">Optimisé pour l'impression</p>
//                         </div>
//                         {processing && <Spinner />}
//                     </button>

//                     <button
//                         onClick={() => {
//                             onDownloadHTML();
//                             setIsOpen(false);
//                         }}
//                         disabled={processing}
//                         className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
//                     >
//                         <div className="p-2 bg-green-50 rounded-lg">
//                             <FiDownload className="text-green-600 text-lg" />
//                         </div>
//                         <div className="flex-1">
//                             <p className="text-sm font-medium text-gray-900">Format HTML</p>
//                             <p className="text-xs text-gray-500">Version éditable</p>
//                         </div>
//                         {processing && <Spinner />}
//                     </button>

//                     <div className="border-t border-gray-100 my-1"></div>

//                     <button
//                         onClick={() => {
//                             onShare();
//                             setIsOpen(false);
//                         }}
//                         className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//                     >
//                         <div className="p-2 bg-indigo-50 rounded-lg">
//                             <FiShare2 className="text-indigo-600 text-lg" />
//                         </div>
//                         <div className="flex-1">
//                             <p className="text-sm font-medium text-gray-900">Partager le lien</p>
//                             <p className="text-xs text-gray-500">Copier dans le presse-papier</p>
//                         </div>
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// // ===================== MAIN PREVIEW COMPONENT =====================
// export default function Preview() {
//     const [cvData, setCvData] = useState(null);
//     const [templateHtml, setTemplateHtml] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [processing, setProcessing] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [showATSScore, setShowATSScore] = useState(true);
//     const [atsScore, setAtsScore] = useState(null);
//     const [atsAnalysis, setAtsAnalysis] = useState(null);
//     const [atsLoading, setAtsLoading] = useState(false);

//     const { cvId } = useParams();

//     // ===================== FETCH ATS ANALYSIS =====================
//     const fetchATSAnalysis = async (cv) => {
//         try {
//             setAtsLoading(true);
//             const response = await axiosInstance.post(`/ats/analyze`, cv);

//             if (response?.data?.status === "success") {
//                 const analysis = response.data.analysis || {};
//                 const finalScore = Number(analysis.score);
//                 setAtsAnalysis(analysis);
//                 setAtsScore(Number.isFinite(finalScore) ? finalScore : 0);
//             } else {
//                 console.warn("ATS analyze did not return success:", response?.data);
//             }
//         } catch (error) {
//             console.error("Erreur lors de l'analyse ATS :", error);
//         } finally {
//             setAtsLoading(false);
//         }
//     };

//     // ===================== FETCH CV AND TEMPLATE =====================
//     useEffect(() => {
//         if (!cvId) return;

//         const fetchCV = async () => {
//             try {
//                 setLoading(true);
//                 const { data: cv } = await axiosInstance.get(`/cvs/${cvId}`);
//                 setCvData(cv);

//                 const { data: template } = await axiosInstance.get(`/templates/${cv.template_id}/file`);
//                 const html = injectCVData(template, cv);
//                 setTemplateHtml(html);

//                 await fetchATSAnalysis(cv);
//             } catch (error) {
//                 console.error("Erreur lors du chargement du CV :", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCV();
//     }, [cvId]);

//     // ===================== INJECT CV DATA INTO HTML TEMPLATE =====================
//     const injectCVData = (html, data) => {
//         if (!html || !data) return "";

//         let output = html;

//         // Personal Info
//         const info = data.personal_info || {};
//         Object.keys(info).forEach((key) => {
//             const regex = new RegExp(`{{\\s*personal_info.${key}\\s*}}`, "g");
//             output = output.replace(regex, info[key] || "");
//         });

//         // Arrays: experiences, education, projects, skills, languages, certifications
//         const arrays = ["experiences", "education", "projects", "skills", "languages", "certifications"];
//         arrays.forEach((field) => {
//             if (!data[field] || data[field].length === 0) {
//                 output = output.replace(new RegExp(`{{\\s*${field}\\s*}}`, "g"), "");
//                 return;
//             }

//             let htmlList = "";
//             switch (field) {
//                 case "experiences":
//                     htmlList = data.experiences.map(exp => `
//             <div class="item">
//               <strong>${exp.position}</strong> - ${exp.company}
//               <em>(${exp.start_date} - ${exp.end_date || "Présent"})</em>
//               <p>${exp.description || ""}</p>
//             </div>`).join("");
//                     break;
//                 case "education":
//                     htmlList = data.education.map(ed => `
//             <div class="item">
//               <strong>${ed.degree_name}</strong> - ${ed.institution}
//               <em>(${ed.start_date} - ${ed.end_date || "Présent"})</em>
//             </div>`).join("");
//                     break;
//                 case "projects":
//                     htmlList = data.projects.map(pr => `
//             <div class="item">
//               <strong>${pr.name}</strong>
//               <em>(${pr.start_date} - ${pr.end_date || "Présent"})</em>
//               <p>${pr.description || ""}</p>
//             </div>`).join("");
//                     break;
//                 case "skills":
//                     htmlList = data.skills.map(sk => `<div class="skill">${sk.name}</div>`).join("");
//                     break;
//                 case "languages":
//                     htmlList = data.languages.map(l => `<div class="lang-item">${l.name} - Niveau : ${l.level}</div>`).join("");
//                     break;
//                 case "certifications":
//                     htmlList = data.certifications.map(c => `
//             <div class="certif-item">
//               <strong>${c.title}</strong> - ${c.organization}
//               <em>(${c.date_obtained})</em>
//               ${c.url ? `<p><a href="${c.url}" target="_blank">${c.url}</a></p>` : ""}
//             </div>`).join("");
//                     break;
//             }

//             output = output.replace(new RegExp(`{{\\s*${field}\\s*}}`, "g"), htmlList);
//         });

//         return output;
//     };

//     // ===================== BUTTON HANDLERS =====================
//     const handleDownloadPDF = async () => {
//         if (!templateHtml) return;
//         setProcessing(true);

//         try {
//             const element = document.createElement("div");
//             element.innerHTML = templateHtml;

//             const opt = {
//                 margin: 0.5,
//                 filename: `${cvData?.title || "cv"}.pdf`,
//                 image: { type: "jpeg", quality: 0.98 },
//                 html2canvas: { scale: 2 },
//                 jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//             };

//             await html2pdf().set(opt).from(element).save();
//         } catch (error) {
//             console.error("Erreur lors de la génération du PDF :", error);
//         } finally {
//             setProcessing(false);
//         }
//     };

//     const handleDownloadHTML = () => {
//         if (!templateHtml) return;
//         setProcessing(true);

//         try {
//             const blob = new Blob([templateHtml], { type: "text/html" });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement("a");
//             a.href = url;
//             a.download = `${cvData?.title || "cv"}.html`;
//             a.click();
//             URL.revokeObjectURL(url);
//         } catch (error) {
//             console.error("Erreur lors du téléchargement HTML :", error);
//         } finally {
//             setProcessing(false);
//         }
//     };

//     const handleShareLink = () => {
//         try {
//             navigator.clipboard.writeText(window.location.href);
//             setShowPopup(true);
//             setTimeout(() => setShowPopup(false), 3000);
//         } catch (e) {
//             console.error("Impossible de copier le lien :", e);
//         }
//     };

//     // ===================== RENDER =====================
//     return (
//         <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col items-center">
//             {loading ? (
//                 <div className="flex items-center justify-center min-h-[400px]">
//                     <div className="text-center">
//                         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                         <p className="text-gray-600">Chargement de votre CV...</p>
//                     </div>
//                 </div>
//             ) : (
//                 <>
//                     {/* Header */}
//                     <div className="w-full max-w-7xl mb-8">
//                         <div className="flex justify-between items-center">
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900">Aperçu du CV</h1>
//                                 <p className="text-gray-600 mt-1">{cvData?.title || "Mon Curriculum Vitae"}</p>
//                             </div>

//                             <DownloadMenu
//                                 onDownloadPDF={handleDownloadPDF}
//                                 onDownloadHTML={handleDownloadHTML}
//                                 onShare={handleShareLink}
//                                 processing={processing}
//                             />
//                         </div>
//                     </div>

//                     {/* CV IFRAME */}
//                     <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//                         <iframe
//                             title="Aperçu CV"
//                             srcDoc={templateHtml}
//                             className="w-full h-[1200px] border-none"
//                             sandbox="allow-same-origin allow-scripts"
//                         />
//                     </div>

//                     {/* ATS Popup */}
//                     <ATSScorePopup
//                         score={atsScore}
//                         atsAnalysis={atsAnalysis}
//                         atsLoading={atsLoading}
//                         isVisible={showATSScore}
//                         onClose={() => setShowATSScore(false)}
//                     />
//                 </>
//             )}

//             {/* Lien copié */}
//             {showPopup && (
//                 <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg border-l-4 bg-green-50 text-green-800 border-green-500 animate-slide-down">
//                     <div className="flex items-center gap-3">
//                         <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500">!</div>
//                         <span className="font-medium">Lien copié dans le presse-papier !</span>
//                     </div>
//                 </div>
//             )}

//             {/* Styles animations */}
//             <style>{`
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fade-in {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
//         .animate-fade-in { animation: fade-in 0.2s ease-out; }
//       `}</style>
//         </div>
//     );
// }






import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiDownload, FiShare2, FiFileText, FiMoreVertical, FiX, FiAward, FiStar, FiCheck, FiAlertCircle, FiEdit3 } from "react-icons/fi";
import axiosInstance from "../../../api/axiosInstance";
import html2pdf from "html2pdf.js";

// ===================== SPINNER COMPONENT =====================
const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
);

// ===================== DOWNLOAD MENU =====================
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
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold group"
            >
                <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                    <FiDownload size={20} />
                </div>
                Télécharger
                <FiMoreVertical size={18} className="opacity-80" />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-16 bg-white rounded-2xl shadow-2xl border border-gray-200 py-4 w-80 z-50 animate-fade-in">
                    <div className="px-6 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <p className="text-lg font-bold text-gray-900">Exporter le CV</p>
                        <p className="text-sm text-gray-500 mt-1">Choisissez votre format préféré</p>
                    </div>

                    <div className="p-3 space-y-2">
                        <button
                            onClick={() => {
                                onDownloadPDF();
                                setIsOpen(false);
                            }}
                            disabled={processing}
                            className="flex items-center gap-4 w-full px-4 py-4 text-left hover:bg-blue-50 rounded-xl transition-all duration-200 disabled:opacity-50 group border border-transparent hover:border-blue-200"
                        >
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                                <FiFileText className="text-white text-lg" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-900">PDF Professionnel</p>
                                <p className="text-sm text-gray-500 mt-1">Optimisé pour l'impression</p>
                            </div>
                            {processing && <Spinner />}
                        </button>

                        <button
                            onClick={() => {
                                onDownloadHTML();
                                setIsOpen(false);
                            }}
                            disabled={processing}
                            className="flex items-center gap-4 w-full px-4 py-4 text-left hover:bg-green-50 rounded-xl transition-all duration-200 disabled:opacity-50 group border border-transparent hover:border-green-200"
                        >
                            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300">
                                <FiDownload className="text-white text-lg" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-900">HTML Éditable</p>
                                <p className="text-sm text-gray-500 mt-1">Version modifiable</p>
                            </div>
                            {processing && <Spinner />}
                        </button>

                        <div className="border-t border-gray-100 my-3"></div>

                        <button
                            onClick={() => {
                                onShare();
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-4 w-full px-4 py-4 text-left hover:bg-indigo-50 rounded-xl transition-all duration-200 group border border-transparent hover:border-indigo-200"
                        >
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl group-hover:from-indigo-600 group-hover:to-indigo-700 transition-all duration-300">
                                <FiShare2 className="text-white text-lg" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-900">Partager le lien</p>
                                <p className="text-sm text-gray-500 mt-1">Copier le lien de partage</p>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// ===================== ATS SCORE CARD =====================
const ATSScoreCard = ({ score, atsAnalysis, atsLoading }) => {
    const safeScore = typeof score === "number" && !Number.isNaN(score) ? score : 0;

    const getScoreColor = (s) => {
        if (s >= 80) return "from-green-500 to-green-600";
        if (s >= 60) return "from-yellow-500 to-yellow-600";
        return "from-red-500 to-red-600";
    };

    const getScoreTextColor = (s) => {
        if (s >= 80) return "text-green-600";
        if (s >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getScoreMessage = (s) => {
        if (s >= 80) return "Excellent - Prêt pour les recruteurs";
        if (s >= 60) return "Bon - Score compétitif";
        return "À améliorer - Optimisation nécessaire";
    };

    const getScoreIcon = (s) => {
        if (s >= 80) return <FiCheck className="text-green-500" size={24} />;
        if (s >= 60) return <FiStar className="text-yellow-500" size={24} />;
        return <FiAlertCircle className="text-red-500" size={24} />;
    };

    const getScoreLevel = (s) => {
        if (s >= 80) return "Excellent";
        if (s >= 60) return "Bon";
        return "Faible";
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header avec gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <FiAward className="text-white text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Analyse ATS</h3>
                        <p className="text-blue-100 opacity-90">Compatibilité avec les systèmes de recrutement</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Score Principal avec Cercle */}
                <div className="text-center mb-8">
                    <div className="relative inline-flex items-center justify-center mb-6">
                        <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center shadow-lg">
                            <div className="text-center">
                                <div className={`text-4xl font-black ${getScoreTextColor(safeScore)} mb-2`}>
                                    {atsLoading ? <Spinner /> : `${safeScore}%`}
                                </div>
                                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                    Score ATS
                                </div>
                            </div>
                        </div>

                        {/* Cercle de progression */}
                        <div
                            className="absolute inset-0 rounded-full border-8 border-transparent"
                            style={{
                                background: `conic-gradient(${safeScore >= 80 ? '#10B981' : safeScore >= 60 ? '#F59E0B' : '#EF4444'} 0% ${safeScore}%, #F3F4F6 ${safeScore}% 100%)`
                            }}
                        ></div>

                        {/* Point indicateur */}
                        <div
                            className="absolute top-0 w-3 h-3 rounded-full bg-white border-4 border-current transform -translate-y-1/2"
                            style={{
                                color: safeScore >= 80 ? '#10B981' : safeScore >= 60 ? '#F59E0B' : '#EF4444',
                                transform: `rotate(${safeScore * 3.6 - 90}deg) translateX(80px) rotate(${90 - safeScore * 3.6}deg)`
                            }}
                        ></div>
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-2">
                        {getScoreIcon(safeScore)}
                        <div className="text-left">
                            <div className={`text-lg font-bold ${getScoreTextColor(safeScore)}`}>
                                {getScoreLevel(safeScore)}
                            </div>
                            <div className="text-sm text-gray-600">
                                {atsLoading ? "Analyse en cours..." : getScoreMessage(safeScore)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between text-2xl font-semibold text-gray-700 mb-3">
                        <span>0%</span>
                        <span className={`${getScoreTextColor(safeScore)}`}>{safeScore}%</span>
                        <span>100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div
                            className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor(safeScore)} transition-all duration-1000 shadow-lg`}
                            style={{ width: `${Math.min(Math.max(safeScore, 0), 100)}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Débutant</span>
                        <span>Expert</span>
                    </div>
                </div>

                {/* Contenu de l'Analyse */}
                <div className="space-y-6">
                    {atsAnalysis?.improvements?.length > 0 && (
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <FiAlertCircle className="text-yellow-600 text-xl" />
                                </div>
                                Suggestions d'amélioration
                            </h4>
                            <div className="space-y-3">
                                {atsAnalysis.improvements.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-yellow-100 shadow-sm">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {atsAnalysis?.keyword_recommendations?.length > 0 && (
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <FiCheck className="text-green-600 text-xl" />
                                </div>
                                Mots-clés recommandés
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {atsAnalysis.keyword_recommendations.map((kw, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:from-green-600 hover:to-green-700"
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {!atsAnalysis?.improvements?.length && !atsAnalysis?.keyword_recommendations?.length && !atsLoading && (
                        <div className="text-center py-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                            <FiCheck className="text-green-500 text-4xl mx-auto mb-3" />
                            <p className="font-semibold text-green-800">CV Optimisé</p>
                            <p className="text-green-600 text-sm mt-1">Votre CV est parfaitement adapté aux systèmes ATS</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <p className="text-xs text-blue-700 text-center leading-relaxed">
                        <strong>Le score ATS</strong> mesure la compatibilité de votre CV avec les systèmes de suivi des candidats utilisés par 98% des grandes entreprises.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Preview() {
    const [cvData, setCvData] = useState(null);
    const [templateHtml, setTemplateHtml] = useState("");
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [atsScore, setAtsScore] = useState(null);
    const [atsAnalysis, setAtsAnalysis] = useState(null);
    const [atsLoading, setAtsLoading] = useState(false);

    const { cvId } = useParams();

    const fetchATSAnalysis = async (cv) => {
        try {
            setAtsLoading(true);
            const response = await axiosInstance.post(`/ats/analyze`, cv);

            if (response?.data?.status === "success") {
                const analysis = response.data.analysis || {};
                const finalScore = Number(analysis.score);
                setAtsAnalysis(analysis);
                setAtsScore(Number.isFinite(finalScore) ? finalScore : 0);
            } else {
                console.warn("ATS analyze did not return success:", response?.data);
            }
        } catch (error) {
            console.error("Erreur lors de l'analyse ATS :", error);
        } finally {
            setAtsLoading(false);
        }
    };

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

                await fetchATSAnalysis(cv);
            } catch (error) {
                console.error("Erreur lors du chargement du CV :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCV();
    }, [cvId]);

    // ===================== INJECT CV DATA INTO HTML TEMPLATE =====================
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

    // ===================== BUTTON HANDLERS =====================
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
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (e) {
            console.error("Impossible de copier le lien :", e);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-gray-600 text-xl font-semibold">Chargement de votre CV...</p>
                        <p className="text-gray-500 mt-2">Préparation de l'analyse ATS</p>
                    </div>
                </div>
            ) : (
                <div className="max-w-full mx-auto">
                    <div className="flex justify-between items-center mb-8 p-6 bg-white rounded-2xl  border border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
                                <FiEdit3 className="text-white text-2xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{cvData?.title || "Mon Curriculum Vitae"}</h1>
                                <p className="text-gray-600 mt-1">Aperçu en temps réel • Prêt à être partagé</p>
                            </div>
                        </div>

                        <DownloadMenu
                            onDownloadPDF={handleDownloadPDF}
                            onDownloadHTML={handleDownloadHTML}
                            onShare={handleShareLink}
                            processing={processing}
                        />
                    </div>

                    <div className="flex flex-col xl:flex-row gap-8">
                        <div className="xl:w-3/4">
                            <div className="bg-white rounded-3xl  overflow-hidden border border-gray-200">
                                {/* <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                                    <h3 className="font-bold text-gray-700 text-lg">Aperçu du CV</h3>
                                </div> */}
                                <iframe
                                    title="Aperçu CV"
                                    srcDoc={templateHtml}
                                    className="w-full h-[1200px] border-none"
                                    sandbox="allow-same-origin allow-scripts"
                                />
                            </div>
                        </div>

                        <div className="xl:w-1/4">
                            <ATSScoreCard
                                score={atsScore}
                                atsAnalysis={atsAnalysis}
                                atsLoading={atsLoading}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Lien copié Popup */}
            {showPopup && (
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-8 py-5 rounded-2xl shadow-2xl border-l-4 bg-gradient-to-r from-green-500 to-green-600 text-white animate-slide-down">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-green-600 text-lg font-bold">
                            ✓
                        </div>
                        <div>
                            <span className="font-bold text-lg block">Lien copié !</span>
                            <span className="text-green-100 text-sm">Le lien a été copié dans le presse-papier</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Styles animations */}
            <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
        </div>
    );
}