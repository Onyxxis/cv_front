// import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
// import { createPortal } from 'react-dom';
// import { FiX, FiUpload, FiFileText, FiCheck } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

// export const Modal = forwardRef((props, ref) => {
//     const [isFormOpen, setIsFormOpen] = useState(false);

//     const [formData, setFormData] = useState({
//         title: '',
//         actionType: 'create',
//         uploadedFile: null,
//         jobTitle: ''
//     });
//     const fileInputRef = useRef(null);
//     const navigate = useNavigate();

//     useImperativeHandle(ref, () => ({
//         openModal: (type = 'create', file = null) => {
//             setFormData({
//                 title: file ? file.name.replace(/\.[^/.]+$/, "") : '',
//                 actionType: type,
//                 uploadedFile: file,
//                 jobTitle: ''
//             });
//             setIsFormOpen(true);
//         },
//         getFormData: () => formData
//     }));

//     const handleInputChange = (field, value) =>
//         setFormData(prev => ({ ...prev, [field]: value }));

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (file && (file.type === 'application/pdf' || file.type.includes('word') || file.type === 'application/msword')) {
//             setFormData(prev => ({
//                 ...prev,
//                 uploadedFile: file,
//                 title: file.name.replace(/\.[^/.]+$/, ""),
//                 actionType: 'upload'
//             }));
//         } else {
//             alert('Veuillez sélectionner un fichier PDF ou Word valide.');
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // ✅ Envoi des données au parent
//         if (props.onCreateStart) {
//             props.onCreateStart(formData); // title et jobTitle sont inclus
//         }

//         setIsFormOpen(false);

//         // Navigation optionnelle avec le title dans l'URL
//         navigate(`/utilisateur/creer_un_cv?title=${encodeURIComponent(formData.title)}`);
//     };

//     const handleCancel = () => {
//         setIsFormOpen(false);
//         setFormData({ title: '', actionType: 'create', uploadedFile: null, jobTitle: '' });
//         if (fileInputRef.current) fileInputRef.current.value = '';
//     };

//     const removeUploadedFile = () => {
//         setFormData(prev => ({ ...prev, uploadedFile: null }));
//         if (fileInputRef.current) fileInputRef.current.value = '';
//     };

//     if (!isFormOpen) return null;

//     // ✅ rendu visuel (inchangé)
//     const modalContent = (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
//             <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-auto overflow-hidden animate-scaleIn">
//                 {/* HEADER */}
//                 <div className="relative p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
//                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h2 className="text-xl font-bold text-gray-900">Nouveau Curriculum Vitae</h2>
//                             <p className="text-sm text-gray-600 mt-1">Configurez votre nouveau projet</p>
//                         </div>
//                         <button onClick={handleCancel} className="p-2 hover:bg-white rounded-xl transition-colors duration-200">
//                             <FiX className="w-5 h-5 text-gray-500 hover:text-gray-700" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* FORMULAIRE */}
//                 <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                     {/* Nom du fichier */}
//                     <div>
//                         <label className="block text-sm font-semibold text-gray-800 mb-2">Nom du fichier *</label>
//                         <input
//                             type="text"
//                             required
//                             value={formData.title}
//                             onChange={(e) => handleInputChange('title', e.target.value)}
//                             placeholder="ex: CV_Développeur_Fullstack"
//                             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
//                         />
//                     </div>

//                     {/* Méthode de création */}
//                     <div>
//                         <p className="text-sm font-semibold text-gray-800 mb-3">Méthode de création</p>
//                         <div className="grid grid-cols-2 gap-3">
//                             <button
//                                 type="button"
//                                 onClick={() => handleInputChange('actionType', 'upload')}
//                                 className={`p-4 border-2 rounded-xl flex flex-col items-start transition-all duration-300
//                                     ${formData.actionType === 'upload'
//                                         ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-lg'
//                                         : 'border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
//                                 <div className={`p-2 rounded-lg mb-3 ${formData.actionType === 'upload' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
//                                     <FiUpload className="w-5 h-5" />
//                                 </div>
//                                 <span className={`text-sm font-semibold ${formData.actionType === 'upload' ? 'text-blue-700' : 'text-gray-700'}`}>Importer un CV</span>
//                                 <span className="text-xs text-gray-500 mt-1">PDF ou Word</span>
//                             </button>

//                             <button
//                                 type="button"
//                                 onClick={() => handleInputChange('actionType', 'create')}
//                                 className={`p-4 border-2 rounded-xl flex flex-col items-start transition-all duration-300
//                                     ${formData.actionType === 'create'
//                                         ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-lg'
//                                         : 'border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
//                                 <div className={`p-2 rounded-lg mb-3 ${formData.actionType === 'create' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
//                                     <FiFileText className="w-5 h-5" />
//                                 </div>
//                                 <span className={`text-sm font-semibold ${formData.actionType === 'create' ? 'text-blue-700' : 'text-gray-700'}`}>Créer nouveau</span>
//                                 <span className="text-xs text-gray-500 mt-1">À partir de zéro</span>
//                             </button>
//                         </div>
//                     </div>

//                     {/* Upload Conditionnel */}
//                     {formData.actionType === 'upload' && (
//                         <div className="animate-slideDown">
//                             <label className="block text-sm font-semibold text-gray-800 mb-2">Fichier importé</label>
//                             <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors duration-200">
//                                 {formData.uploadedFile ? (
//                                     <div className="flex items-center justify-between bg-green-50 rounded-lg p-3">
//                                         <div className="flex items-center space-x-3">
//                                             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                                                 <FiCheck className="w-5 h-5 text-green-600" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-sm font-medium text-gray-900">{formData.uploadedFile.name}</p>
//                                                 <p className="text-xs text-gray-500">{(formData.uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                                             </div>
//                                         </div>
//                                         <button type="button" onClick={removeUploadedFile} className="p-1 hover:bg-white rounded-lg transition-colors">
//                                             <FiX className="w-4 h-4 text-gray-500 hover:text-gray-700" />
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <label className="cursor-pointer block">
//                                         <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
//                                         <div className="text-center py-6">
//                                             <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
//                                             <p className="text-sm text-gray-600 font-medium">Cliquez pour sélectionner un fichier</p>
//                                             <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (max. 10MB)</p>
//                                         </div>
//                                     </label>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* Poste ciblé */}
//                     <div>
//                         <label className="block text-sm font-semibold text-gray-800 mb-2">
//                             Poste ciblé <span className="text-gray-500 text-xs font-normal">(optionnel)</span>
//                         </label>
//                         <input
//                             type="text"
//                             value={formData.jobTitle}
//                             onChange={(e) => handleInputChange('jobTitle', e.target.value)}
//                             placeholder="ex: Développeur Fullstack Senior"
//                             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
//                         />
//                     </div>

//                     {/* Boutons */}
//                     <div className="flex space-x-3 pt-4 border-t border-gray-100">
//                         <button
//                             type="button"
//                             onClick={handleCancel}
//                             className="flex-1 py-3.5 px-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
//                         >
//                             Annuler
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={formData.actionType === 'upload' && !formData.uploadedFile}
//                             className="flex-1 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
//                         >
//                             Commencer
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );

//     return createPortal(modalContent, document.getElementById('modal-root'));
// });


import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiUpload, FiFileText, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from "../../../api/axiosInstance"; 

export const Modal = forwardRef((props, ref) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        actionType: 'create',
        uploadedFile: null,
        jobTitle: ''
    });

    const [loadingImport, setLoadingImport] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // ----------------------------------------------------
    // 🔥 Permet au parent d'ouvrir le modal
    // ----------------------------------------------------
    useImperativeHandle(ref, () => ({
        openModal: (type = 'create', file = null) => {
            setFormData({
                title: file ? file.name.replace(/\.[^/.]+$/, "") : '',
                actionType: type,
                uploadedFile: file,
                jobTitle: ''
            });
            setIsFormOpen(true);
        },
        getFormData: () => formData
    }));

    const handleInputChange = (field, value) =>
        setFormData(prev => ({ ...prev, [field]: value }));

    // ----------------------------------------------------
    // 📌 Upload local du fichier (PDF/DOCX)
    // ----------------------------------------------------
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.includes('word') || file.type === 'application/msword')) {
            setFormData(prev => ({
                ...prev,
                uploadedFile: file,
                title: file.name.replace(/\.[^/.]+$/, ""),
                actionType: 'upload'
            }));
        } else {
            alert('Veuillez sélectionner un fichier PDF ou Word valide.');
        }
    };

    // ----------------------------------------------------
    // 🔥 Fonction d'import via API /cvs/import/
    // ----------------------------------------------------
    const importCV = async (file) => {
        try {
            setLoadingImport(true);

            const form = new FormData();
            form.append("file", file);

            const res = await axios.post("/cvs/import/", form, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("CV IMPORT RESULT:", res.data);

            // 🔥 Envoie les données extraites au parent (CVBuilder)
            if (props.onImportedData) {
                props.onImportedData(res.data.data);
            }

        } catch (err) {
            console.error("IMPORT ERROR", err);
            alert("Erreur lors de l'import du CV.");
        }

        setLoadingImport(false);
    };

    // ----------------------------------------------------
    // 🚀 Validation du formulaire
    // ----------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔥 Mode IMPORT
        if (formData.actionType === "upload" && formData.uploadedFile) {
            await importCV(formData.uploadedFile);
        }

        // 🔥 Toujours informer le parent
        if (props.onCreateStart) {
            props.onCreateStart(formData);
        }

        setIsFormOpen(false);

        // Navigation identique, inchangée
        navigate(`/utilisateur/creer_un_cv?title=${encodeURIComponent(formData.title)}`);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setFormData({ title: '', actionType: 'create', uploadedFile: null, jobTitle: '' });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeUploadedFile = () => {
        setFormData(prev => ({ ...prev, uploadedFile: null }));
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    if (!isFormOpen) return null;

    // ----------------------------------------------------
    // 🖼️ rendu visuel — inchangé
    // ----------------------------------------------------
    const modalContent = (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-auto overflow-hidden animate-scaleIn">
                {/* HEADER */}
                <div className="relative p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Nouveau Curriculum Vitae</h2>
                            <p className="text-sm text-gray-600 mt-1">Configurez votre nouveau projet</p>
                        </div>
                        <button onClick={handleCancel} className="p-2 hover:bg-white rounded-xl transition-colors duration-200">
                            <FiX className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* FORMULAIRE */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Nom du fichier */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">Nom du fichier *</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="ex: CV_Développeur_Fullstack"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                        />
                    </div>

                    {/* Méthode de création */}
                    <div>
                        <p className="text-sm font-semibold text-gray-800 mb-3">Méthode de création</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleInputChange('actionType', 'upload')}
                                className={`p-4 border-2 rounded-xl flex flex-col items-start transition-all duration-300
                                    ${formData.actionType === 'upload'
                                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-lg'
                                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
                                <div className={`p-2 rounded-lg mb-3 ${formData.actionType === 'upload' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <FiUpload className="w-5 h-5" />
                                </div>
                                <span className={`text-sm font-semibold ${formData.actionType === 'upload' ? 'text-blue-700' : 'text-gray-700'}`}>Importer un CV</span>
                                <span className="text-xs text-gray-500 mt-1">PDF ou Word</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleInputChange('actionType', 'create')}
                                className={`p-4 border-2 rounded-xl flex flex-col items-start transition-all duration-300
                                    ${formData.actionType === 'create'
                                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-lg'
                                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
                                <div className={`p-2 rounded-lg mb-3 ${formData.actionType === 'create' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <FiFileText className="w-5 h-5" />
                                </div>
                                <span className={`text-sm font-semibold ${formData.actionType === 'create' ? 'text-blue-700' : 'text-gray-700'}`}>Créer nouveau</span>
                                <span className="text-xs text-gray-500 mt-1">À partir de zéro</span>
                            </button>
                        </div>
                    </div>

                    {/* Upload Conditionnel */}
                    {formData.actionType === 'upload' && (
                        <div className="animate-slideDown">
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Fichier importé</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors duration-200">
                                {formData.uploadedFile ? (
                                    <div className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <FiCheck className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{formData.uploadedFile.name}</p>
                                                <p className="text-xs text-gray-500">{(formData.uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={removeUploadedFile} className="p-1 hover:bg-white rounded-lg transition-colors">
                                            <FiX className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer block">
                                        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
                                        <div className="text-center py-6">
                                            <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600 font-medium">Cliquez pour sélectionner un fichier</p>
                                            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (max. 10MB)</p>
                                        </div>
                                    </label>
                                )}
                            </div>

                            {loadingImport && (
                                <p className="text-blue-600 text-sm mt-2 font-medium">
                                    Analyse du CV en cours...
                                </p>
                            )}
                        </div>
                    )}

                    {/* Poste ciblé */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Poste ciblé <span className="text-gray-500 text-xs font-normal">(optionnel)</span>
                        </label>
                        <input
                            type="text"
                            value={formData.jobTitle}
                            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                            placeholder="ex: Développeur Fullstack Senior"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                        />
                    </div>

                    {/* Boutons */}
                    <div className="flex space-x-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 py-3.5 px-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            disabled={formData.actionType === 'upload' && !formData.uploadedFile}
                            className="flex-1 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                        >
                            Commencer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.getElementById('modal-root'));
});

