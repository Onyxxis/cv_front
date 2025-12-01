// import React, { useState, useContext } from "react";
// import axiosInstance from "../../../api/axiosInstance";
// import { AuthContext } from "../../../context/AuthContext";
// import { FiX, FiUpload, FiImage, FiStar, FiFileText, FiCheck } from "react-icons/fi";

// const Spinner = () => (
//   <div className="flex justify-center items-center">
//     <div className="relative">
//       <div className="w-6 h-6 border-4 border-blue-100 rounded-full"></div>
//       <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
//     </div>
//   </div>
// );

// export default function TemplateEditor({ onClose, onTemplateCreated }) {
//   const { user } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     name: "",
//     file_link: "",
//     preview_image: "",
//     is_premium: false,
//   });

//   const [loadingUpload, setLoadingUpload] = useState({
//     file_link: false,
//     preview_image: false,
//   });
//   const [loadingSubmit, setLoadingSubmit] = useState(false);
//   const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

//   // ----------------------
//   // UPLOAD FILE
//   // ----------------------
//   const handleFileUpload = async (event, fieldName) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoadingUpload(prev => ({ ...prev, [fieldName]: true }));

//     const form = new FormData();
//     form.append("file", file);
//     form.append("folder", "cv_templates");

//     try {
//       const response = await axiosInstance.post("/upload/", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const fileUrl = response.data.raw_link || response.data.secure_url;
//       setFormData(prev => ({ ...prev, [fieldName]: fileUrl }));
//       showPopup("Fichier uploadé avec succès !", "success");
//     } catch (err) {
//       console.error("Upload error:", err);
//       showPopup(err.response?.data?.detail || "Erreur lors du téléversement du fichier !", "error");
//     }

//     setLoadingUpload(prev => ({ ...prev, [fieldName]: false }));
//   };

//   // ----------------------
//   // SUBMIT FORM
//   // ----------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoadingSubmit(true);

//     if (!user || !user.user_id) {
//       showPopup("Utilisateur non authentifié !", "error");
//       setLoadingSubmit(false);
//       return;
//     }

//     if (!formData.file_link) {
//       showPopup("Veuillez uploader le fichier HTML du template !", "error");
//       setLoadingSubmit(false);
//       return;
//     }

//     try {
//       await axiosInstance.post("/templates", { ...formData, user_id: user.user_id });
//       showPopup("Template créé avec succès !", "success");

//       // Réinitialiser le formulaire
//       setFormData({ name: "", file_link: "", preview_image: "", is_premium: false });

//       if (onTemplateCreated) {
//         onTemplateCreated();
//       }
//     } catch (err) {
//       console.error("Submit error:", err);
//       showPopup(err.response?.data?.detail || "Erreur lors de la création du template !", "error");
//     }

//     setLoadingSubmit(false);
//   };

//   const showPopup = (message, type) => {
//     setPopup({ visible: true, message, type });
//     setTimeout(() => {
//       setPopup({ visible: false, message: "", type: "" });
//       if (type === "success" && onClose) {
//         setTimeout(() => onClose(), 500);
//       }
//     }, 3000);
//   };

//   const removeFile = (fieldName) => {
//     setFormData(prev => ({ ...prev, [fieldName]: "" }));
//   };

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50"
//         onClick={onClose} // fermer si clic en dehors du modal
//       >
//         {/* Modal */}
//         <div
//           className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in"
//           onClick={(e) => e.stopPropagation()} // éviter de fermer si clic à l'intérieur
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
//                 <FiFileText size={24} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">Nouveau Template</h2>
//                 <p className="text-gray-600">Créez un nouveau template de CV</p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 z-50"
//             >
//               <FiX size={24} />
//             </button>
//           </div>

//           {/* Form Content */}
//           <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Name */}
//               <div>
//                 <label className="block text-lg font-semibold text-gray-700 mb-3">
//                   Nom du template *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={e => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:border-blue-300 text-lg"
//                   placeholder="Ex: Template Moderne Bleu"
//                   required
//                 />
//               </div>

//               {/* File Upload */}
//               <div>
//                 <label className="block text-lg font-semibold text-gray-700 mb-3">Fichier Template *</label>
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept=".html,.pdf,.png,.jpg,.jpeg"
//                       onChange={e => handleFileUpload(e, "file_link")}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                       id="template-file"
//                     />
//                     <label
//                       htmlFor="template-file"
//                       className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
//                     >
//                       {loadingUpload.file_link ? <Spinner /> : <FiUpload className="text-gray-400" size={24} />}
//                       <div className="text-center">
//                         <span className="font-medium text-gray-700">
//                           {loadingUpload.file_link ? "Upload en cours..." : "Choisir le fichier template"}
//                         </span>
//                         <p className="text-sm text-gray-500 mt-1">HTML, PDF, PNG, JPG, JPEG</p>
//                       </div>
//                     </label>
//                   </div>

//                   {formData.file_link && (
//                     <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl">
//                       <div className="flex items-center gap-3">
//                         <FiCheck className="text-green-500" size={20} />
//                         <span className="font-medium text-green-800">Fichier uploadé</span>
//                         <a href={formData.file_link} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 underline text-sm">
//                           Voir le fichier
//                         </a>
//                       </div>
//                       <button type="button" onClick={() => removeFile("file_link")} className="text-red-400 hover:text-red-600 transition-colors duration-300">
//                         <FiX size={18} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Preview Image */}
//               <div>
//                 <label className="block text-lg font-semibold text-gray-700 mb-3">Image d'aperçu</label>
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={e => handleFileUpload(e, "preview_image")}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                       id="preview-image"
//                     />
//                     <label
//                       htmlFor="preview-image"
//                       className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
//                     >
//                       {loadingUpload.preview_image ? <Spinner /> : <FiImage className="text-gray-400" size={24} />}
//                       <div className="text-center">
//                         <span className="font-medium text-gray-700">{loadingUpload.preview_image ? "Upload en cours..." : "Choisir l'image d'aperçu"}</span>
//                         <p className="text-sm text-gray-500 mt-1">PNG, JPG, JPEG</p>
//                       </div>
//                     </label>
//                   </div>

//                   {formData.preview_image && (
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl">
//                         <div className="flex items-center gap-3">
//                           <FiCheck className="text-green-500" size={20} />
//                           <span className="font-medium text-green-800">Image uploadée</span>
//                         </div>
//                         <button type="button" onClick={() => removeFile("preview_image")} className="text-red-400 hover:text-red-600 transition-colors duration-300">
//                           <FiX size={18} />
//                         </button>
//                       </div>
//                       <img src={formData.preview_image} alt="Aperçu" className="w-full max-w-xs h-48 object-cover border-2 border-gray-200 rounded-2xl shadow-sm mx-auto" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Premium Option */}
//               <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="p-3 bg-amber-100 rounded-xl">
//                       <FiStar className="text-amber-600" size={24} />
//                     </div>
//                     <div>
//                       <label className="block font-semibold text-gray-900 text-lg">Template Premium</label>
//                       <p className="text-sm text-gray-600">Réservé aux utilisateurs premium</p>
//                     </div>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input type="checkbox" checked={formData.is_premium} onChange={e => setFormData({ ...formData, is_premium: e.target.checked })} className="sr-only peer" />
//                     <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
//                   </label>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-6 border-t border-gray-200">
//                 <button
//                   type="submit"
//                   disabled={loadingUpload.file_link || loadingUpload.preview_image || loadingSubmit}
//                   className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loadingSubmit ? (
//                     <>
//                       <Spinner />
//                       <span>Création en cours...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FiCheck size={24} />
//                       <span>Créer le Template</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Popup de notification */}
//       {popup.visible && (
//         <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] px-8 py-4 rounded-2xl shadow-2xl border-l-4 ${popup.type === "success" ? "bg-green-50 text-green-800 border-green-500" : "bg-red-50 text-red-800 border-red-500"} animate-slide-down max-w-md w-full`}>
//           <div className="flex items-center gap-4">
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${popup.type === "success" ? "bg-green-500" : "bg-red-500"} text-white font-bold`}>
//               {popup.type === "success" ? "✓" : "!"}
//             </div>
//             <div>
//               <span className="font-semibold text-lg block">{popup.message}</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// import React, { useState, useContext, useEffect } from "react";
// import axiosInstance from "../../../api/axiosInstance";
// import { AuthContext } from "../../../context/AuthContext";
// import { FiX, FiUpload, FiImage, FiStar, FiFileText, FiCheck } from "react-icons/fi";

// const Spinner = () => (
//   <div className="flex justify-center items-center">
//     <div className="relative">
//       <div className="w-6 h-6 border-4 border-blue-100 rounded-full"></div>
//       <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
//     </div>
//   </div>
// );

// export default function TemplateEditor({ onClose, onTemplateCreated, templateToEdit }) {
//   const { user } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     name: "",
//     file_link: "",
//     preview_image: "",
//     is_premium: false,
//   });

//   const [loadingUpload, setLoadingUpload] = useState({
//     file_link: false,
//     preview_image: false,
//   });
//   const [loadingSubmit, setLoadingSubmit] = useState(false);
//   const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

//   // Préremplir le formulaire si on édite un template
//   useEffect(() => {
//     if (templateToEdit) {
//       setFormData({
//         name: templateToEdit.name || "",
//         file_link: templateToEdit.file_link || "",
//         preview_image: templateToEdit.preview_image || "",
//         is_premium: templateToEdit.is_premium || false,
//       });
//     }
//   }, [templateToEdit]);

//   // ----------------------
//   // UPLOAD FILE
//   // ----------------------
//   const handleFileUpload = async (event, fieldName) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoadingUpload(prev => ({ ...prev, [fieldName]: true }));

//     const form = new FormData();
//     form.append("file", file);
//     form.append("folder", "cv_templates");

//     try {
//       const response = await axiosInstance.post("/upload/", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const fileUrl = response.data.raw_link || response.data.secure_url;
//       setFormData(prev => ({ ...prev, [fieldName]: fileUrl }));
//       showPopup("Fichier uploadé avec succès !", "success");
//     } catch (err) {
//       console.error("Upload error:", err);
//       showPopup(err.response?.data?.detail || "Erreur lors du téléversement du fichier !", "error");
//     }

//     setLoadingUpload(prev => ({ ...prev, [fieldName]: false }));
//   };

//   // ----------------------
//   // SUBMIT FORM (création ou édition)
//   // ----------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoadingSubmit(true);

//     if (!user || !user.user_id) {
//       showPopup("Utilisateur non authentifié !", "error");
//       setLoadingSubmit(false);
//       return;
//     }

//     if (!formData.file_link) {
//       showPopup("Veuillez uploader le fichier HTML du template !", "error");
//       setLoadingSubmit(false);
//       return;
//     }

//     try {
//       if (templateToEdit?.id) {
//         // Update
//         await axiosInstance.put(`/templates/${templateToEdit.id}`, { ...formData, user_id: user.user_id });
//         showPopup("Template modifié avec succès !", "success");
//       } else {
//         // Create
//         await axiosInstance.post("/templates", { ...formData, user_id: user.user_id });
//         showPopup("Template créé avec succès !", "success");
//       }

//       // Réinitialiser le formulaire
//       setFormData({ name: "", file_link: "", preview_image: "", is_premium: false });

//       if (onTemplateCreated) {
//         onTemplateCreated();
//       }
//     } catch (err) {
//       console.error("Submit error:", err);
//       showPopup(err.response?.data?.detail || "Erreur lors de la création du template !", "error");
//     }

//     setLoadingSubmit(false);
//   };

//   const showPopup = (message, type) => {
//     setPopup({ visible: true, message, type });
//     setTimeout(() => {
//       setPopup({ visible: false, message: "", type: "" });
//       if (type === "success" && onClose) {
//         setTimeout(() => onClose(), 500);
//       }
//     }, 3000);
//   };

//   const removeFile = (fieldName) => {
//     setFormData(prev => ({ ...prev, [fieldName]: "" }));
//   };

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50"
//         onClick={onClose}
//       >
//         {/* Modal */}
//         <div
//           className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
//                 <FiFileText size={24} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {templateToEdit ? "Modifier Template" : "Nouveau Template"}
//                 </h2>
//                 <p className="text-gray-600">{templateToEdit ? "Modifiez votre template de CV" : "Créez un nouveau template de CV"}</p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 z-50"
//             >
//               <FiX size={24} />
//             </button>
//           </div>

//           {/* Form Content */}
//           <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Name */}
//               <div>
//                 <label className="block text-lg font-semibold text-gray-700 mb-3">
//                   Nom du template *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={e => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:border-blue-300 text-lg"
//                   placeholder="Ex: Template Moderne Bleu"
//                   required
//                 />
//               </div>

//               {/* File Upload */}
//               <div>
//                 <label className="block text-lg font-semibold text-gray-700 mb-3">Fichier Template *</label>
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept=".html,.pdf,.png,.jpg,.jpeg"
//                       onChange={e => handleFileUpload(e, "file_link")}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                       id="template-file"
//                     />
//                     <label
//                       htmlFor="template-file"
//                       className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
//                     >
//                       {loadingUpload.file_link ? <Spinner /> : <FiUpload className="text-gray-400" size={24} />}
//                       <div className="text-center">
//                         <span className="font-medium text-gray-700">
//                           {loadingUpload.file_link ? "Upload en cours..." : "Choisir le fichier template"}
//                         </span>
//                         <p className="text-sm text-gray-500 mt-1">HTML, PDF, PNG, JPG, JPEG</p>
//                       </div>
//                     </label>
//                   </div>

//                   {formData.file_link && (
//                     <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl">
//                       <div className="flex items-center gap-3">
//                         <FiCheck className="text-green-500" size={20} />
//                         <span className="font-medium text-green-800">Fichier uploadé</span>
//                         <a href={formData.file_link} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 underline text-sm">
//                           Voir le fichier
//                         </a>
//                       </div>
//                       <button type="button" onClick={() => removeFile("file_link")} className="text-red-400 hover:text-red-600 transition-colors duration-300">
//                         <FiX size={18} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Preview Image */}
//               <div>
//                 <label className="block text-lg font-semibold text-gray-700 mb-3">Image d'aperçu</label>
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={e => handleFileUpload(e, "preview_image")}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                       id="preview-image"
//                     />
//                     <label
//                       htmlFor="preview-image"
//                       className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
//                     >
//                       {loadingUpload.preview_image ? <Spinner /> : <FiImage className="text-gray-400" size={24} />}
//                       <div className="text-center">
//                         <span className="font-medium text-gray-700">{loadingUpload.preview_image ? "Upload en cours..." : "Choisir l'image d'aperçu"}</span>
//                         <p className="text-sm text-gray-500 mt-1">PNG, JPG, JPEG</p>
//                       </div>
//                     </label>
//                   </div>

//                   {formData.preview_image && (
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl">
//                         <div className="flex items-center gap-3">
//                           <FiCheck className="text-green-500" size={20} />
//                           <span className="font-medium text-green-800">Image uploadée</span>
//                         </div>
//                         <button type="button" onClick={() => removeFile("preview_image")} className="text-red-400 hover:text-red-600 transition-colors duration-300">
//                           <FiX size={18} />
//                         </button>
//                       </div>
//                       <img src={formData.preview_image} alt="Aperçu" className="w-full max-w-xs h-48 object-cover border-2 border-gray-200 rounded-2xl shadow-sm mx-auto" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Premium Option */}
//               <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="p-3 bg-amber-100 rounded-xl">
//                       <FiStar className="text-amber-600" size={24} />
//                     </div>
//                     <div>
//                       <label className="block font-semibold text-gray-900 text-lg">Template Premium</label>
//                       <p className="text-sm text-gray-600">Réservé aux utilisateurs premium</p>
//                     </div>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input type="checkbox" checked={formData.is_premium} onChange={e => setFormData({ ...formData, is_premium: e.target.checked })} className="sr-only peer" />
//                     <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
//                   </label>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-6 border-t border-gray-200">
//                 <button
//                   type="submit"
//                   disabled={loadingUpload.file_link || loadingUpload.preview_image || loadingSubmit}
//                   className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loadingSubmit ? (
//                     <>
//                       <Spinner />
//                       <span>{templateToEdit ? "Modification en cours..." : "Création en cours..."}</span>
//                     </>
//                   ) : (
//                     <>
//                       <FiCheck size={24} />
//                       <span>{templateToEdit ? "Modifier le Template" : "Créer le Template"}</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Popup */}
//       {popup.visible && (
//         <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] px-8 py-4 rounded-2xl shadow-2xl border-l-4 ${popup.type === "success" ? "bg-green-50 text-green-800 border-green-500" : "bg-red-50 text-red-800 border-red-500"} animate-slide-down max-w-md w-full`}>
//           <div className="flex items-center gap-4">
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${popup.type === "success" ? "bg-green-500" : "bg-red-500"} text-white font-bold`}>
//               {popup.type === "success" ? "✓" : "!"}
//             </div>
//             <div>
//               <span className="font-semibold text-lg block">{popup.message}</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { AuthContext } from "../../../context/AuthContext";
import { FiX, FiUpload, FiImage, FiStar, FiFileText, FiCheck } from "react-icons/fi";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="relative">
      <div className="w-6 h-6 border-4 border-blue-100 rounded-full"></div>
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
);

export default function TemplateEditor({ onClose, onTemplateCreated, templateToEdit }) {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    file_link: "",
    preview_image: "",
    is_premium: false,
  });

  const [loadingUpload, setLoadingUpload] = useState({
    file_link: false,
    preview_image: false,
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

  useEffect(() => {
    if (templateToEdit) {
      setFormData({
        name: templateToEdit.name || "",
        file_link: templateToEdit.file_link || "",
        preview_image: templateToEdit.preview_image || "",
        is_premium: templateToEdit.is_premium || false,
      });
    }
  }, [templateToEdit]);

  // --------------------------
  // POPUP — avec contrôle fermeture
  // --------------------------
  const showPopup = (message, type, closeAfter = false) => {
    setPopup({ visible: true, message, type });

    setTimeout(() => {
      setPopup({ visible: false, message: "", type: "" });

      // On ne ferme que si closeAfter = true
      if (closeAfter && onClose) {
        setTimeout(() => onClose(), 400);
      }

    }, 3000);
  };

  // --------------------------
  // UPLOAD FILE
  // --------------------------
  const handleFileUpload = async (event, fieldName) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoadingUpload(prev => ({ ...prev, [fieldName]: true }));

    const form = new FormData();
    form.append("file", file);
    form.append("folder", "cv_templates");

    try {
      const response = await axiosInstance.post("/upload/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = response.data.raw_link || response.data.secure_url;

      setFormData(prev => ({ ...prev, [fieldName]: fileUrl }));

      // 🚫 ON NE FERME PAS LE MODAL ICI
      showPopup("Fichier uploadé avec succès !", "success", false);

    } catch (err) {
      console.error("Upload error:", err);
      showPopup("Erreur lors de l’upload !", "error", false);
    }

    setLoadingUpload(prev => ({ ...prev, [fieldName]: false }));
  };

  // --------------------------
  // SUBMIT TEMPLATE
  // --------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    if (!user?.user_id) {
      showPopup("Utilisateur non authentifié !", "error");
      setLoadingSubmit(false);
      return;
    }

    if (!formData.file_link) {
      showPopup("Veuillez uploader le fichier HTML !", "error");
      setLoadingSubmit(false);
      return;
    }

    try {
      if (templateToEdit?.id) {
        await axiosInstance.put(`/templates/${templateToEdit.id}`, {
          ...formData, user_id: user.user_id
        });

        showPopup("Template modifié avec succès !", "success", true);

      } else {
        await axiosInstance.post("/templates", {
          ...formData, user_id: user.user_id
        });

        showPopup("Template créé avec succès !", "success", true);
      }

      setFormData({ name: "", file_link: "", preview_image: "", is_premium: false });

      if (onTemplateCreated) onTemplateCreated();

    } catch (err) {
      console.error("Submit error:", err);
      showPopup("Erreur lors de la création du template !", "error");
    }

    setLoadingSubmit(false);
  };

  const removeFile = (fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: "" }));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                <FiFileText size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {templateToEdit ? "Modifier Template" : "Nouveau Template"}
                </h2>
                <p className="text-gray-600">
                  {templateToEdit ? "Modifiez votre template" : "Créez un nouveau template"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Form */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Nom du template *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 text-lg"
                  placeholder="Ex : Template Moderne Bleu"
                  required
                />
              </div>

              {/* FILE UPLOAD */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Fichier HTML / PDF *
                </label>

                <div className="relative">
                  <input
                    type="file"
                    accept=".html,.pdf,.png,.jpg,.jpeg"
                    onChange={e => handleFileUpload(e, "file_link")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl">
                    {loadingUpload.file_link ? <Spinner /> : <FiUpload size={24} className="text-gray-400" />}
                    <span className="font-medium text-gray-700">
                      {loadingUpload.file_link ? "Upload en cours..." : "Choisir le fichier"}
                    </span>
                  </div>
                </div>

                {formData.file_link && (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl mt-3">
                    <div className="flex items-center gap-3">
                      <FiCheck className="text-green-600" />
                      <span className="font-medium text-green-700">Fichier uploadé</span>
                      <a href={formData.file_link} target="_blank" className="text-blue-600 underline text-sm">
                        Voir
                      </a>
                    </div>
                    <button onClick={() => removeFile("file_link")} className="text-red-500 hover:text-red-700">
                      <FiX size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* PREVIEW IMAGE */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Image d'aperçu
                </label>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, "preview_image")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl">
                    {loadingUpload.preview_image ? <Spinner /> : <FiImage size={24} className="text-gray-400" />}
                    <span className="font-medium text-gray-700">
                      {loadingUpload.preview_image ? "Upload en cours..." : "Choisir une image"}
                    </span>
                  </div>
                </div>

                {formData.preview_image && (
                  <>
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl mt-3">
                      <div className="flex items-center gap-3">
                        <FiCheck className="text-green-600" />
                        <span className="font-medium text-green-700">Image uploadée</span>
                      </div>
                      <button onClick={() => removeFile("preview_image")} className="text-red-500 hover:text-red-700">
                        <FiX size={18} />
                      </button>
                    </div>

                    <img
                      src={formData.preview_image}
                      className="w-full max-w-xs h-48 object-cover rounded-2xl border mt-3 mx-auto"
                      alt="preview"
                    />
                  </>
                )}
              </div>

              {/* PREMIUM */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-200 rounded-xl">
                    <FiStar className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Template Premium</p>
                    <p className="text-sm text-gray-600">Réservé aux membres premium</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_premium}
                    onChange={e => setFormData({ ...formData, is_premium: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 rounded-full peer-checked:bg-amber-500 transition-all relative">
                    <div className="absolute top-0.5 left-0.5 h-6 w-6 bg-white rounded-full transition-all peer-checked:translate-x-7"></div>
                  </div>
                </label>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loadingUpload.file_link || loadingUpload.preview_image || loadingSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loadingSubmit ? <Spinner /> : <FiCheck size={24} />}
                {templateToEdit ? "Modifier le Template" : "Créer le Template"}
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {popup.visible && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] px-8 py-4 rounded-2xl shadow-lg border-l-4 max-w-md w-full animate-slide-down
            ${popup.type === "success"
              ? "bg-green-50 text-green-800 border-green-500"
              : "bg-red-50 text-red-800 border-red-500"
            }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
              ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}
            >
              {popup.type === "success" ? "✓" : "!"}
            </div>
            <span className="font-semibold text-lg">{popup.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
