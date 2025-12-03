// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { FiDownload, FiShare2, FiFileText, FiMoreVertical, FiEdit3, FiEye, FiCheck } from "react-icons/fi";
// // import axiosInstance from "../../../api/axiosInstance";
// // import html2pdf from "html2pdf.js";

// // const Spinner = () => (
// //     <div className="flex justify-center items-center">
// //         <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
// //     </div>
// // );
// // const GlobalProcessingOverlay = () => (
// //     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]">
// //         <div className="p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
// //             <Spinner />
// //             <span className="text-white font-medium">
// //                 Traitement en cours...
// //             </span>
// //         </div>
// //     </div>
// // );


// // const DownloadMenu = ({ onDownloadPDF, onDownloadHTML, onShare, processing }) => {
// //     const [isOpen, setIsOpen] = useState(false);

// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (!event.target.closest(".download-menu")) setIsOpen(false);
// //         };

// //         if (isOpen) document.addEventListener("click", handleClickOutside);
// //         return () => document.removeEventListener("click", handleClickOutside);
// //     }, [isOpen]);

// //     return (
// //         <div className="download-menu relative">
// //             <button
// //                 onClick={() => setIsOpen(!isOpen)}
// //                 className="flex items-center gap-3 px-5 py-3 bg-white text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
// //             >
// //                 <FiDownload className="text-gray-600" size={18} />
// //                 Exporter
// //                 <FiMoreVertical size={16} className="text-gray-400" />
// //             </button>

// //             {isOpen && (
// //                 <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-64 z-50 animate-fade-in">
// //                     <div className="px-4 py-3 border-b border-gray-100">
// //                         <p className="font-semibold text-gray-900 text-sm">Exporter le CV</p>
// //                         <p className="text-gray-500 text-xs mt-1">Format de sortie</p>
// //                     </div>

// //                     <div className="p-2 space-y-1">
// //                         <button
// //                             onClick={() => {
// //                                 onDownloadPDF();
// //                                 setIsOpen(false);
// //                             }}
// //                             disabled={processing}
// //                             className="flex items-center gap-3 w-full px-3 py-3 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 disabled:opacity-50 text-sm"
// //                         >
// //                             <div className="p-2 bg-blue-100 rounded-md">
// //                                 <FiFileText className="text-blue-600" size={16} />
// //                             </div>
// //                             <div className="flex-1">
// //                                 <p className="font-medium text-gray-900">PDF Professionnel</p>
// //                                 <p className="text-gray-500 text-xs">Optimisé impression</p>
// //                             </div>
// //                             {processing && <Spinner size="w-4 h-4" />}
// //                         </button>

// //                         <button
// //                             onClick={() => {
// //                                 onDownloadHTML();
// //                                 setIsOpen(false);
// //                             }}
// //                             disabled={processing}
// //                             className="flex items-center gap-3 w-full px-3 py-3 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 disabled:opacity-50 text-sm"
// //                         >
// //                             <div className="p-2 bg-green-100 rounded-md">
// //                                 <FiDownload className="text-green-600" size={16} />
// //                             </div>
// //                             <div className="flex-1">
// //                                 <p className="font-medium text-gray-900">HTML Éditable</p>
// //                                 <p className="text-gray-500 text-xs">Code source</p>
// //                             </div>
// //                             {processing && <Spinner size="w-4 h-4" />}
// //                         </button>

// //                         <div className="border-t border-gray-100 my-1"></div>

// //                         <button
// //                             onClick={() => {
// //                                 onShare();
// //                                 setIsOpen(false);
// //                             }}
// //                             className="flex items-center gap-3 w-full px-3 py-3 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 text-sm"
// //                         >
// //                             <div className="p-2 bg-purple-100 rounded-md">
// //                                 <FiShare2 className="text-purple-600" size={16} />
// //                             </div>
// //                             <div className="flex-1">
// //                                 <p className="font-medium text-gray-900">Partager le lien</p>
// //                                 <p className="text-gray-500 text-xs">Copier l'URL</p>
// //                             </div>
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // const PreviewHeader = ({ cvData, downloadMenu }) => (
// //     <div className="bg-white border-b border-gray-200 px-8 py-2">
// //         <div className="max-w-7xl mx-auto">
// //             <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-4">
// //                     <div className="flex items-center gap-3">
// //                         <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-blue-700 rounded-lg flex items-center justify-center">
// //                             <FiEdit3 className="text-white" size={20} />
// //                         </div>
// //                         <div>
// //                             <h1 className="text-2xl font-semibold text-blue-900 tracking-tight">
// //                                 {cvData?.title || "Curriculum Vitae"}
// //                             </h1>
// //                             <p className="text-gray-500 text-sm mt-0.5">
// //                                 Aperçu • {new Date().toLocaleDateString('fr-FR')}
// //                             </p>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className="flex items-center gap-3">
// //                     {downloadMenu}
// //                 </div>
// //             </div>
// //         </div>
// //     </div>
// // );

// // const CVPreviewContainer = ({ templateHtml }) => (
// //     <div className="flex-1 w-3/6 bg-gray-50">
// //         <div className="max-w-4xl mx-auto p-2">
// //             <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
// //                 <div className="border-b border-gray-200 bg-white px-6 py-4">
// //                     <div className="flex items-center justify-between">
// //                         <div className="flex items-center gap-2">
// //                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //                             <span className="text-sm font-medium text-gray-700">Aperçu </span>
// //                         </div>
// //                         <div className="text-xs text-gray-500">
// //                             Mode visualisation
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div className="p-1">
// //                     <div className="border border-gray-200 rounded bg-white">
// //                         <iframe
// //                             title="Aperçu CV"
// //                             srcDoc={templateHtml}
// //                             className="w-full h-[1100px] border-none"
// //                             sandbox="allow-same-origin allow-scripts"
// //                             loading="eager"
// //                         />
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     </div>
// // );

// // const SuccessToast = ({ message, description, onClose }) => (
// //     <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
// //         <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
// //             <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
// //                 <FiCheck size={12} className="text-white" />
// //             </div>
// //             <div className="flex-1 min-w-0">
// //                 <p className="font-medium text-sm truncate">{message}</p>
// //                 {description && (
// //                     <p className="text-gray-300 text-xs truncate">{description}</p>
// //                 )}
// //             </div>
// //             <button
// //                 onClick={onClose}
// //                 className="text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
// //             >
// //                 <FiCheck size={16} />
// //             </button>
// //         </div>
// //     </div>
// // );

// // const LoadingState = () => (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
// //         <div className="text-center">
// //             <Spinner />
// //             <h3 className="text-lg font-medium text-gray-900 mb-2">Chargement du CV</h3>
// //             <p className="text-gray-500 text-sm">Préparation de l'aperçu...</p>
// //         </div>
// //     </div>
// // );

// // // ===================== MAIN PREVIEW COMPONENT =====================
// // export default function Preview() {
// //     const [cvData, setCvData] = useState(null);
// //     const [templateHtml, setTemplateHtml] = useState("");
// //     const [loading, setLoading] = useState(true);
// //     const [processing, setProcessing] = useState(false);
// //     const [showToast, setShowToast] = useState(false);

// //     const { cvId } = useParams();

// //     useEffect(() => {
// //         if (!cvId) return;

// //         const fetchCV = async () => {
// //             try {
// //                 setLoading(true);
// //                 const { data: cv } = await axiosInstance.get(`/cvs/${cvId}`);
// //                 setCvData(cv);

// //                 const { data: template } = await axiosInstance.get(`/templates/${cv.template_id}/file`);
// //                 const html = injectCVData(template, cv);
// //                 setTemplateHtml(html);
// //             } catch (error) {
// //                 console.error("Erreur lors du chargement du CV :", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchCV();
// //     }, [cvId]);

// //     const injectCVData = (html, data) => {
// //         if (!html || !data) return "";

// //         let output = html;

// //         // Personal Info
// //         const info = data.personal_info || {};
// //         Object.keys(info).forEach((key) => {
// //             const regex = new RegExp(`{{\\s*personal_info.${key}\\s*}}`, "g");
// //             output = output.replace(regex, info[key] || "");
// //         });

// //         // Arrays: experiences, education, projects, skills, languages, certifications
// //         const arrays = ["experiences", "education", "projects", "skills", "languages", "certifications"];
// //         arrays.forEach((field) => {
// //             if (!data[field] || data[field].length === 0) {
// //                 output = output.replace(new RegExp(`{{\\s*${field}\\s*}}`, "g"), "");
// //                 return;
// //             }

// //             let htmlList = "";
// //             switch (field) {
// //                 case "experiences":
// //                     htmlList = data.experiences.map(exp => `
// //             <div class="item">
// //               <strong>${exp.position}</strong> - ${exp.company}
// //               <em>(${exp.start_date} - ${exp.end_date || "Présent"})</em>
// //               <p>${exp.description || ""}</p>
// //             </div>`).join("");
// //                     break;
// //                 case "education":
// //                     htmlList = data.education.map(ed => `
// //             <div class="item">
// //               <strong>${ed.degree_name}</strong> - ${ed.institution}
// //               <em>(${ed.start_date} - ${ed.end_date || "Présent"})</em>
// //             </div>`).join("");
// //                     break;
// //                 case "projects":
// //                     htmlList = data.projects.map(pr => `
// //             <div class="item">
// //               <strong>${pr.name}</strong>
// //               <em>(${pr.start_date} - ${pr.end_date || "Présent"})</em>
// //               <p>${pr.description || ""}</p>
// //             </div>`).join("");
// //                     break;
// //                 case "skills":
// //                     htmlList = data.skills.map(sk => `<div class="skill">${sk.name}</div>`).join("");
// //                     break;
// //                 case "languages":
// //                     htmlList = data.languages.map(l => `<div class="lang-item">${l.name} - Niveau : ${l.level}</div>`).join("");
// //                     break;
// //                 case "certifications":
// //                     htmlList = data.certifications.map(c => `
// //             <div class="certif-item">
// //               <strong>${c.title}</strong> - ${c.organization}
// //               <em>(${c.date_obtained})</em>
// //               ${c.url ? `<p><a href="${c.url}" target="_blank">${c.url}</a></p>` : ""}
// //             </div>`).join("");
// //                     break;
// //             }

// //             output = output.replace(new RegExp(`{{\\s*${field}\\s*}}`, "g"), htmlList);
// //         });

// //         return output;
// //     };

// //     const handleDownloadPDF = async () => {
// //         if (!templateHtml) return;
// //         setProcessing(true);

// //         try {
// //             const element = document.createElement("div");
// //             element.innerHTML = templateHtml;

// //             const opt = {
// //                 margin: 0.5,
// //                 filename: `${cvData?.title || "cv"}.pdf`,
// //                 image: { type: "jpeg", quality: 0.98 },
// //                 html2canvas: { scale: 2 },
// //                 jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
// //             };

// //             await html2pdf().set(opt).from(element).save();
// //         } catch (error) {
// //             console.error("Erreur lors de la génération du PDF :", error);
// //         } finally {
// //             setProcessing(false);
// //         }
// //     };

// //     const handleDownloadHTML = () => {
// //         if (!templateHtml) return;
// //         setProcessing(true);

// //         try {
// //             const blob = new Blob([templateHtml], { type: "text/html" });
// //             const url = URL.createObjectURL(blob);
// //             const a = document.createElement("a");
// //             a.href = url;
// //             a.download = `${cvData?.title || "cv"}.html`;
// //             a.click();
// //             URL.revokeObjectURL(url);
// //         } catch (error) {
// //             console.error("Erreur lors du téléchargement HTML :", error);
// //         } finally {
// //             setProcessing(false);
// //         }
// //     };

// //     const handleShareLink = () => {
// //         try {
// //             navigator.clipboard.writeText(window.location.href);
// //             setShowToast(true);
// //             setTimeout(() => setShowToast(false), 3000);
// //         } catch (e) {
// //             console.error("Impossible de copier le lien :", e);
// //         }
// //     };

// //     if (loading) {
// //         return <LoadingState />;
// //     }

// //     return (
// //         <div className="min-h-screen bg-gray-50 flex flex-col">
// //             <PreviewHeader
// //                 cvData={cvData}
// //                 downloadMenu={
// //                     <DownloadMenu
// //                         onDownloadPDF={handleDownloadPDF}
// //                         onDownloadHTML={handleDownloadHTML}
// //                         onShare={handleShareLink}
// //                         processing={processing}
// //                     />
// //                 }
// //             />

// //             <CVPreviewContainer templateHtml={templateHtml} />

// //             {showToast && (
// //                 <SuccessToast
// //                     message="Lien copié"
// //                     description="Le lien a été copié dans le presse-papier"
// //                     onClose={() => setShowToast(false)}
// //                 />
// //             )}

// //             <style>{`
// //                 @keyframes slide-down {
// //                     from { 
// //                         opacity: 0; 
// //                         transform: translateY(-20px) translateX(-50%); 
// //                     }
// //                     to { 
// //                         opacity: 1; 
// //                         transform: translateY(0) translateX(-50%); 
// //                     }
// //                 }
// //                 @keyframes fade-in {
// //                     from { 
// //                         opacity: 0; 
// //                         transform: scale(0.95); 
// //                     }
// //                     to { 
// //                         opacity: 1; 
// //                         transform: scale(1); 
// //                     }
// //                 }
// //                 .animate-slide-down { 
// //                     animation: slide-down 0.2s ease-out; 
// //                 }
// //                 .animate-fade-in { 
// //                     animation: fade-in 0.15s ease-out; 
// //                 }
// //             `}</style>
// //             {processing && <GlobalProcessingOverlay />}

// //         </div>
// //     );
// // }

// // PreviewWithTemplates.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../../api/axiosInstance";
// import {
//     FiDownload,
//     FiShare2,
//     FiFileText,
//     FiMoreVertical,
//     FiEdit3,
//     FiCheck,
//     FiLoader 
// } from "react-icons/fi";
// import html2pdf from "html2pdf.js";

// /* ----------------------- petits composants UI ----------------------- */
// const Spinner = ({ size = 6 }) => (
//     <div className={`flex justify-center items-center`}>
//         <div
//             className={`animate-spin rounded-full border-${size} border-blue-600 border-t-transparent`}
//             style={{ width: `${size}px`, height: `${size}px`, borderWidth: 3 }}
//         />
//     </div>
// );

// const SectionOverlay = ({ message }) => (
//     <div className="absolute inset-0 bg-white/70 z-40 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//             <div className="animate-spin">
//                 <FiLoader className="w-6 h-6 text-gray-700" />
//             </div>
//             <div className="text-gray-700 font-medium">{message}</div>
//         </div>
//     </div>
// );

// const SuccessToast = ({ message, onClose }) => (
//     <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
//         <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
//             <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                 <FiCheck className="text-white" size={12} />
//             </div>
//             <div className="flex-1 min-w-0">
//                 <p className="font-medium text-sm truncate">{message}</p>
//             </div>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-200">✕</button>
//         </div>
//     </div>
// );

// /* ----------------------- composant principal ----------------------- */
// export default function PreviewWithTemplates() {
//     const { cvId } = useParams();

//     // données
//     const [cvData, setCvData] = useState(null);
//     const [templates, setTemplates] = useState([]);
//     const [selectedTemplate, setSelectedTemplate] = useState(null);
//     const [templateHtml, setTemplateHtml] = useState("");

//     // états de chargement séparés
//     const [loadingCV, setLoadingCV] = useState(true);
//     const [loadingTemplates, setLoadingTemplates] = useState(true);
//     const [loadingTemplateFile, setLoadingTemplateFile] = useState(false);
//     const [updatingTemplate, setUpdatingTemplate] = useState(false);
//     const [processingExport, setProcessingExport] = useState(false);
//     const [showToast, setShowToast] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");

//     // fetch CV initial
//     useEffect(() => {
//         if (!cvId) return;
//         const fetchCVAndTemplates = async () => {
//             setLoadingCV(true);
//             setLoadingTemplates(true);
//             try {
//                 // fetch CV
//                 const { data: cv } = await axiosInstance.get(`/cvs/${cvId}`);
//                 setCvData(cv);

//                 // fetch templates
//                 const resTemplates = await axiosInstance.get("/templates");
//                 const tData = Array.isArray(resTemplates.data)
//                     ? resTemplates.data
//                     : Array.isArray(resTemplates.data.templates)
//                         ? resTemplates.data.templates
//                         : [];
//                 setTemplates(tData);

//                 // set selected template (the one referenced in the CV if exists)
//                 const cvTemplateId = cv.template_id;
//                 const found = tData.find((t) => t._id === cvTemplateId || t.id === cvTemplateId || t.id === String(cvTemplateId));
//                 setSelectedTemplate(found || tData[0] || null);

//                 // load template file if exists
//                 const toLoad = found || (tData[0] ? tData[0] : null);
//                 if (toLoad) await loadTemplateFile(toLoad);
//             } catch (err) {
//                 console.error("Erreur initialisation preview:", err);
//                 setErrorMessage("Erreur lors du chargement initial.");
//             } finally {
//                 setLoadingCV(false);
//                 setLoadingTemplates(false);
//             }
//         };

//         fetchCVAndTemplates();
//     }, [cvId]);

//     // helper: injecte les données du CV dans le HTML du template
//     const injectCVData = (html, data) => {
//         if (!html || !data) return "";
//         let output = html;

//         const info = data.personal_info || {};
//         Object.keys(info).forEach((key) => {
//             const regex = new RegExp(`{{\\s*personal_info.${key}\\s*}}`, "g");
//             output = output.replace(regex, info[key] || "");
//         });

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
//               <em>(${exp.start_date || ""} - ${exp.end_date || "Présent"})</em>
//               <p>${exp.description || ""}</p>
//             </div>`).join("");
//                     break;
//                 case "education":
//                     htmlList = data.education.map(ed => `
//             <div class="item">
//               <strong>${ed.degree_name}</strong> - ${ed.institution}
//               <em>(${ed.start_date || ""} - ${ed.end_date || "Présent"})</em>
//             </div>`).join("");
//                     break;
//                 case "projects":
//                     htmlList = data.projects.map(pr => `
//             <div class="item">
//               <strong>${pr.name}</strong>
//               <em>(${pr.start_date || ""} - ${pr.end_date || "Présent"})</em>
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
//               <em>(${c.date_obtained || ""})</em>
//             </div>`).join("");
//                     break;
//             }

//             output = output.replace(new RegExp(`{{\\s*${field}\\s*}}`, "g"), htmlList);
//         });

//         return output;
//     };

//     // charge le fichier (HTML) du template et injecte les données CV actuelles
//     const loadTemplateFile = async (template) => {
//         if (!template) return;
//         setLoadingTemplateFile(true);
//         try {
//             // endpoint attendu: /templates/{id}/file (comme dans ton code précédent)
//             const { data: fileRes } = await axiosInstance.get(`/templates/${template._id || template.id}/file`);
//             const html = injectCVData(fileRes, cvData || {});
//             setTemplateHtml(html);
//             setSelectedTemplate(template);
//         } catch (err) {
//             console.error("Erreur récupération fichier template :", err);
//             setTemplateHtml("");
//             setErrorMessage("Impossible de charger le template sélectionné.");
//         } finally {
//             setLoadingTemplateFile(false);
//         }
//     };

//     // action: utilisateur clique "Utiliser ce modèle" sur un template
//     const handleSelectTemplate = async (template) => {
//         if (!cvData || !template) return;
//         setUpdatingTemplate(true);
//         setErrorMessage("");
//         try {
//             // PATCH /cvs/{cvId} -> body { template_id: template._id } (ou id selon ton backend)
//             await axiosInstance.patch(`/cvs/${cvId}`, { template_id: template._id || template.id });
//             // on met à jour localement et on recharge le template file
//             const updatedCv = { ...cvData, template_id: template._id || template.id };
//             setCvData(updatedCv);
//             await loadTemplateFile(template);
//             setShowToast(true);
//             setTimeout(() => setShowToast(false), 2500);
//         } catch (err) {
//             console.error("Erreur mise à jour template CV :", err);
//             setErrorMessage("Échec de la mise à jour du template.");
//         } finally {
//             setUpdatingTemplate(false);
//         }
//     };

//     /* ----------------------- export / partage ----------------------- */
//     const handleDownloadPDF = async () => {
//         if (!templateHtml) return;
//         setProcessingExport(true);
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
//         } catch (err) {
//             console.error("Erreur génération PDF :", err);
//             setErrorMessage("Impossible de générer le PDF.");
//         } finally {
//             setProcessingExport(false);
//         }
//     };

//     const handleDownloadHTML = () => {
//         if (!templateHtml) return;
//         setProcessingExport(true);
//         try {
//             const blob = new Blob([templateHtml], { type: "text/html" });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement("a");
//             a.href = url;
//             a.download = `${cvData?.title || "cv"}.html`;
//             a.click();
//             URL.revokeObjectURL(url);
//         } catch (err) {
//             console.error("Erreur téléchargement HTML :", err);
//             setErrorMessage("Impossible de télécharger le HTML.");
//         } finally {
//             setProcessingExport(false);
//         }
//     };

//     const handleShare = () => {
//         try {
//             navigator.clipboard.writeText(window.location.href);
//             setShowToast(true);
//             setTimeout(() => setShowToast(false), 2000);
//         } catch (err) {
//             console.error("Erreur copie lien :", err);
//             setErrorMessage("Impossible de copier le lien.");
//         }
//     };

//     /* ----------------------- rendu ----------------------- */
//     return (
//         <div className="min-h-screen bg-gray-50 p-4">
//             <div className="max-w-7xl mx-auto">
//                 <div className="mb-6">
//                     <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900">
//                                     Aperçu du CV
//                                 </h1>
//                                 <p className="text-sm text-gray-600 mt-1">Choisissez un template à gauche pour l'appliquer au CV.</p>
//                             </div>

//                             <div className="flex items-center gap-3">
//                                 <button
//                                     onClick={handleDownloadPDF}
//                                     disabled={processingExport}
//                                     className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
//                                 >
//                                     Exporter PDF
//                                 </button>
//                                 <button
//                                     onClick={handleShare}
//                                     className="px-3 py-2 bg-white border rounded-md text-sm hover:bg-gray-50"
//                                 >
//                                     Partager
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* layout: left templates + right preview */}
//                 <div className="flex gap-6">
//                     {/* --------- LEFT: templates list (scroll independant) ---------- */}
//                     <div className="w-1/3 bg-white rounded-lg border border-gray-200 shadow-sm p-4 overflow-hidden">
//                         <h2 className="text-lg font-semibold mb-3">Templates disponibles</h2>

//                         {loadingTemplates ? (
//                             <div className="flex items-center justify-center py-20">
//                                 <Spinner size={24} />
//                             </div>
//                         ) : (
//                             <div className="overflow-y-auto max-h-[70vh] pr-2 space-y-3">
//                                 {templates.length === 0 && (
//                                     <div className="text-sm text-gray-500">Aucun template trouvé.</div>
//                                 )}

//                                 {templates.map((tpl) => {
//                                     const isSelected = selectedTemplate && (tpl._id === (selectedTemplate._id || selectedTemplate.id));
//                                     return (
//                                         <div key={tpl._id || tpl.id} className={`p-3 border rounded-lg flex items-center gap-3 ${isSelected ? "ring-2 ring-blue-200 bg-blue-50" : "bg-white"}`}>
//                                             <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
//                                                 {tpl.preview_image ? (
//                                                     // image preview
//                                                     // user may store full url or path; keep simple
//                                                     <img src={tpl.preview_image} alt={tpl.name} className="object-cover w-full h-full" />
//                                                 ) : (
//                                                     <div className="text-xs text-gray-500 px-2">Aperçu</div>
//                                                 )}
//                                             </div>

//                                             <div className="flex-1">
//                                                 <div className="flex items-center justify-between">
//                                                     <div>
//                                                         <div className="font-medium text-sm text-gray-800">{tpl.name}</div>
//                                                         <div className="text-xs text-gray-500">{tpl.is_premium ? "Premium" : "Gratuit"}</div>
//                                                     </div>

//                                                     <div className="text-right">
//                                                         <button
//                                                             onClick={() => handleSelectTemplate(tpl)}
//                                                             disabled={updatingTemplate}
//                                                             className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//                                                         >
//                                                             {updatingTemplate && isSelected ? "Mise à jour..." : "Utiliser ce modèle"}
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 <div className="text-xs text-gray-500 mt-2 line-clamp-2">{tpl.file_link || ""}</div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}
//                     </div>

//                     {/* --------- RIGHT: CV Preview (scroll independant) ---------- */}
//                     <div className="w-2/3 relative bg-white rounded-lg border border-gray-200 shadow-sm p-3 overflow-hidden">
//                         {/* header for preview */}
//                         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//                             <div>
//                                 <h3 className="text-lg font-semibold text-gray-800">{cvData?.title || "Curriculum Vitae"}</h3>
//                                 <div className="text-sm text-gray-500">Aperçu • {new Date().toLocaleDateString('fr-FR')}</div>
//                             </div>

//                             <div className="text-sm text-gray-500">{selectedTemplate ? selectedTemplate.name : "Aucun template sélectionné"}</div>
//                         </div>

//                         <div className="p-4 overflow-auto max-h-[72vh]">
//                             {/* si on charge le fichier template */}
//                             {loadingCV || loadingTemplateFile ? (
//                                 <div className="flex items-center justify-center h-64">
//                                     <Spinner size={32} />
//                                 </div>
//                             ) : templateHtml ? (
//                                 <div className="bg-white rounded shadow-inner border border-gray-100">
//                                     <iframe
//                                         title="Aperçu CV"
//                                         srcDoc={templateHtml}
//                                         className="w-full min-h-[800px] border-none"
//                                         sandbox="allow-same-origin allow-scripts"
//                                         loading="eager"
//                                     />
//                                 </div>
//                             ) : (
//                                 <div className="text-gray-600 text-center py-20">
//                                     Aucun aperçu disponible. Sélectionne un template à gauche.
//                                 </div>
//                             )}
//                         </div>

//                         {/* overlay durant update */}
//                         {updatingTemplate && <SectionOverlay message="Application du template en cours..." />}
//                     </div>
//                 </div>

//                 {/* toast + erreurs */}
//                 {showToast && <SuccessToast message="Template appliqué avec succès !" onClose={() => setShowToast(false)} />}
//                 {errorMessage && (
//                     <div className="fixed bottom-6 right-6 z-50">
//                         <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-md shadow">{errorMessage}</div>
//                     </div>
//                 )}
//             </div>

//             {/* animations css */}
//             <style>{`
//         @keyframes slide-down { from { opacity: 0; transform: translateY(-8px) translateX(-50%);} to { opacity:1; transform: translateY(0) translateX(-50%);} }
//         .animate-slide-down { animation: slide-down 0.18s ease-out; }
//       `}</style>
//         </div>
//     );
// }







import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import {
    FiDownload,
    FiShare2,
    FiFileText,
    FiMoreVertical,
    FiEdit3,
    FiCheck,
    FiLoader,
    FiChevronRight,
    FiExternalLink
} from "react-icons/fi";
import html2pdf from "html2pdf.js";

/* ----------------------- Composants UI ----------------------- */
const Spinner = ({ size = 20 }) => (
    <div className="flex items-center justify-center">
        <div
            className="animate-spin rounded-full  border-4 border-gray-300 border-t-blue-600"
            style={{ width: `${size}px`, height: `${size}px` }}
        />
    </div>
);

const SuccessToast = ({ message, onClose }) => (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
        <div className="bg-white text-black px-5 py-3.5 rounded-lg shadow-xl flex items-center gap-3 max-w-sm">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCheck className="text-black" size={12} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{message}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">✕</button>
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
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
                <FiDownload className="text-gray-600" size={16} />
                <span className="text-sm font-medium">Exporter</span>
                <FiMoreVertical size={14} className="text-gray-400 ml-1" />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-56 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 text-sm">Exporter le CV</p>
                        <p className="text-gray-500 text-xs mt-1">Choisir un format</p>
                    </div>

                    <div className="p-2 space-y-1">
                        <button
                            onClick={() => {
                                onDownloadPDF();
                                setIsOpen(false);
                            }}
                            disabled={processing}
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 disabled:opacity-50 text-sm"
                        >
                            <div className="p-1.5 bg-blue-100 rounded">
                                <FiFileText className="text-blue-600" size={14} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">PDF Professionnel</p>
                                <p className="text-gray-500 text-xs">Optimisé pour impression</p>
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                onDownloadHTML();
                                setIsOpen(false);
                            }}
                            disabled={processing}
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 disabled:opacity-50 text-sm"
                        >
                            <div className="p-1.5 bg-green-100 rounded">
                                <FiDownload className="text-green-600" size={14} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">HTML Éditable</p>
                                <p className="text-gray-500 text-xs">Code source</p>
                            </div>
                        </button>

                        <div className="border-t border-gray-100 my-1"></div>

                        <button
                            onClick={() => {
                                onShare();
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 text-sm"
                        >
                            <div className="p-1.5 bg-purple-100 rounded">
                                <FiShare2 className="text-purple-600" size={14} />
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

/* ----------------------- Composant principal ----------------------- */
export default function PreviewWithTemplates() {
    const { cvId } = useParams();

    // États
    const [cvData, setCvData] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [templateHtml, setTemplateHtml] = useState("");
    const [loadingCV, setLoadingCV] = useState(true);
    const [loadingTemplates, setLoadingTemplates] = useState(true);
    const [loadingTemplateFile, setLoadingTemplateFile] = useState(false);
    const [updatingTemplate, setUpdatingTemplate] = useState(false);
    const [processingExport, setProcessingExport] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Chargement initial
    useEffect(() => {
        if (!cvId) return;
        
        const fetchCVAndTemplates = async () => {
            setLoadingCV(true);
            setLoadingTemplates(true);
            try {
                // Charger le CV
                const { data: cv } = await axiosInstance.get(`/cvs/${cvId}`);
                setCvData(cv);

                // Charger les templates
                const resTemplates = await axiosInstance.get("/templates");
                const tData = Array.isArray(resTemplates.data)
                    ? resTemplates.data
                    : Array.isArray(resTemplates.data.templates)
                        ? resTemplates.data.templates
                        : [];
                setTemplates(tData);

                // Définir le template sélectionné
                const cvTemplateId = cv.template_id;
                const found = tData.find((t) => 
                    t._id === cvTemplateId || 
                    t.id === cvTemplateId || 
                    t.id === String(cvTemplateId)
                );
                setSelectedTemplate(found || tData[0] || null);

                // Charger le fichier template
                const toLoad = found || (tData[0] ? tData[0] : null);
                if (toLoad) await loadTemplateFile(toLoad);
            } catch (err) {
                console.error("Erreur initialisation preview:", err);
                setErrorMessage("Erreur lors du chargement initial.");
            } finally {
                setLoadingCV(false);
                setLoadingTemplates(false);
            }
        };

        fetchCVAndTemplates();
    }, [cvId]);

    // Injection des données dans le template
    const injectCVData = (html, data) => {
        if (!html || !data) return "";
        let output = html;

        const info = data.personal_info || {};
        Object.keys(info).forEach((key) => {
            const regex = new RegExp(`{{\\s*personal_info.${key}\\s*}}`, "g");
            output = output.replace(regex, info[key] || "");
        });

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
                            <em>(${exp.start_date || ""} - ${exp.end_date || "Présent"})</em>
                            <p>${exp.description || ""}</p>
                        </div>`).join("");
                    break;
                case "education":
                    htmlList = data.education.map(ed => `
                        <div class="item">
                            <strong>${ed.degree_name}</strong> - ${ed.institution}
                            <em>(${ed.start_date || ""} - ${ed.end_date || "Présent"})</em>
                        </div>`).join("");
                    break;
                case "projects":
                    htmlList = data.projects.map(pr => `
                        <div class="item">
                            <strong>${pr.name}</strong>
                            <em>(${pr.start_date || ""} - ${pr.end_date || "Présent"})</em>
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
                            <em>(${c.date_obtained || ""})</em>
                        </div>`).join("");
                    break;
            }

            output = output.replace(new RegExp(`{{\\s*${field}\\s*}}`, "g"), htmlList);
        });

        return output;
    };

    // Chargement du fichier template
    const loadTemplateFile = async (template) => {
        if (!template) return;
        setLoadingTemplateFile(true);
        try {
            const { data: fileRes } = await axiosInstance.get(`/templates/${template._id || template.id}/file`);
            const html = injectCVData(fileRes, cvData || {});
            setTemplateHtml(html);
            setSelectedTemplate(template);
        } catch (err) {
            console.error("Erreur récupération fichier template :", err);
            setTemplateHtml("");
            setErrorMessage("Impossible de charger le template sélectionné.");
        } finally {
            setLoadingTemplateFile(false);
        }
    };

    // Sélection d'un template
    const handleSelectTemplate = async (template) => {
        if (!cvData || !template) return;
        setUpdatingTemplate(true);
        setErrorMessage("");
        try {
            await axiosInstance.patch(`/cvs/${cvId}`, { 
                template_id: template._id || template.id 
            });
            
            const updatedCv = { ...cvData, template_id: template._id || template.id };
            setCvData(updatedCv);
            await loadTemplateFile(template);
            
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
        } catch (err) {
            console.error("Erreur mise à jour template CV :", err);
            setErrorMessage("Échec de la mise à jour du template.");
        } finally {
            setUpdatingTemplate(false);
        }
    };

    /* ----------------------- Export / Partage ----------------------- */
    const handleDownloadPDF = async () => {
        if (!templateHtml) return;
        setProcessingExport(true);
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
        } catch (err) {
            console.error("Erreur génération PDF :", err);
            setErrorMessage("Impossible de générer le PDF.");
        } finally {
            setProcessingExport(false);
        }
    };

    const handleDownloadHTML = () => {
        if (!templateHtml) return;
        setProcessingExport(true);
        try {
            const blob = new Blob([templateHtml], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${cvData?.title || "cv"}.html`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Erreur téléchargement HTML :", err);
            setErrorMessage("Impossible de télécharger le HTML.");
        } finally {
            setProcessingExport(false);
        }
    };

    const handleShare = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (err) {
            console.error("Erreur copie lien :", err);
            setErrorMessage("Impossible de copier le lien.");
        }
    };

    // Menu de téléchargement
    const downloadMenu = (
        <DownloadMenu
            onDownloadPDF={handleDownloadPDF}
            onDownloadHTML={handleDownloadHTML}
            onShare={handleShare}
            processing={processingExport}
        />
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-3">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-gradient-to-br from-blue-700 to-blue-600 rounded-lg flex items-center justify-center">
                                    <FiEdit3 className="text-white" size={18} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                                        {cvData?.title || "Curriculum Vitae"}
                                    </h1>
                                    <p className="text-gray-500 text-xs mt-0.5">
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

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex gap-6">
                    {/* Sidebar Templates */}
                    <div className="w-1/3">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Templates disponibles</h2>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {templates.length} modèles
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm mt-1">Cliquez pour appliquer un template</p>
                            </div>

                            <div className="p-4">
                                {loadingTemplates ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Spinner size={24} />
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-2">
                                        {templates.length === 0 && (
                                            <div className="text-center py-8 text-gray-500">
                                                Aucun template disponible
                                            </div>
                                        )}

                                        {templates.map((tpl) => {
                                            const isSelected = selectedTemplate && 
                                                (tpl._id === (selectedTemplate._id || selectedTemplate.id));
                                            return (
                                                <div 
                                                    key={tpl._id || tpl.id} 
                                                    className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer hover:border-blue-300 hover:shadow-sm ${
                                                        isSelected 
                                                            ? "border-blue-500 bg-blue-50 ring-1 ring-blue-200" 
                                                            : "border-gray-200"
                                                    }`}
                                                    onClick={() => handleSelectTemplate(tpl)}
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                                                                tpl.is_premium 
                                                                    ? "bg-amber-100 text-amber-800 border border-amber-200" 
                                                                    : "bg-blue-100 text-blue-800 border border-blue-200"
                                                            }`}>
                                                                {tpl.is_premium ? "Premium" : "Gratuit"}
                                                            </div>
                                                            <h3 className="font-medium text-gray-900 text-sm">
                                                                {tpl.name}
                                                            </h3>
                                                        </div>
                                                        {isSelected && (
                                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <div className="w-20 h-12 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-50 flex items-center justify-center">
                                                            {tpl.preview_image ? (
                                                                <img 
                                                                    src={tpl.preview_image} 
                                                                    alt={tpl.name} 
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <FiFileText className="text-gray-400" size={18} />
                                                            )}
                                                        </div>
                                                        
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                                                                {tpl.description || "Template professionnel"}
                                                            </p>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs text-gray-500">
                                                                    {tpl.file_type || "HTML"}
                                                                </span>
                                                                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                                                                    Appliquer
                                                                    <FiChevronRight size={12} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="w-2/3">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
                            {/* Preview Header */}
                            <div className="px-5 py-4 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Aperçu du CV</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm text-gray-600">
                                                Template : 
                                            </span>
                                            <span className="text-sm font-medium text-blue-700">
                                                {selectedTemplate?.name || "Aucun template"}
                                            </span>
                                            {selectedTemplate?.is_premium && (
                                                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                                                    Premium
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="text-xs text-gray-500">
                                        {cvData?.updated_at 
                                            ? `Mis à jour le ${new Date(cvData.updated_at).toLocaleDateString('fr-FR')}`
                                            : "Non sauvegardé"}
                                    </div>
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className="flex-1 p-4 overflow-auto">
                                {loadingCV || loadingTemplateFile ? (
                                    <div className="flex items-center justify-center h-64">
                                        <div className="text-center">
                                            <Spinner size={32} />
                                            <p className="text-gray-600 text-sm mt-3">Chargement de l'aperçu...</p>
                                        </div>
                                    </div>
                                ) : templateHtml ? (
                                    <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="absolute top-3 right-3 z-10">
                                            <div className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
                                                Aperçu interactif
                                            </div>
                                        </div>
                                        <iframe
                                            title="Aperçu CV"
                                            srcDoc={templateHtml}
                                            className="w-full h-[calc(100vh-250px)] border-0"
                                            sandbox="allow-same-origin allow-scripts"
                                            loading="eager"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <FiExternalLink className="text-gray-400" size={24} />
                                        </div>
                                        <h4 className="text-gray-700 font-medium mb-2">Aperçu non disponible</h4>
                                        <p className="text-gray-500 text-sm max-w-md">
                                            Sélectionnez un template dans la liste à gauche pour prévisualiser votre CV.
                                        </p>
                                    </div>
                                )}

                                {/* Overlay pendant la mise à jour */}
                                {updatingTemplate && (
                                    <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-10 flex items-center justify-center rounded-lg">
                                        <div className="text-center">
                                            <Spinner size={32} />
                                            <p className="text-white text-xl mt-3 font-medium">
                                                Application du template en cours...
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast & Error Messages */}
            {showToast && (
                <SuccessToast 
                    message="Template appliqué avec succès !" 
                    onClose={() => setShowToast(false)} 
                />
            )}
            
            {errorMessage && (
                <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">{errorMessage}</span>
                        <button 
                            onClick={() => setErrorMessage("")}
                            className="text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Styles d'animation */}
            <style>{`
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px) translateX(-50%); }
                    to { opacity: 1; transform: translateY(0) translateX(-50%); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-down { animation: slide-down 0.2s ease-out; }
                .animate-slide-up { animation: slide-up 0.2s ease-out; }
                .animate-fade-in { animation: fade-in 0.15s ease-out; }
            `}</style>
        </div>
    );
}