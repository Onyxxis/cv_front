 
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiX, FiSearch, FiStar } from "react-icons/fi";
import TemplateEditor from "./TemplateEditor/TemplateEditor";

export default function TemplateList() {
    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [viewingTemplate, setViewingTemplate] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState({ visible: false, templateId: null });
    const [filterPremium, setFilterPremium] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch templates
    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const url = filterPremium ? "/templates/filter/premium?is_premium=true" : "/templates";
            const response = await axiosInstance.get(url);
            const templatesData = response.data.templates || [];
            setTemplates(templatesData);
            setFilteredTemplates(templatesData);
        } catch (err) {
            console.error("Erreur lors du fetch des templates :", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTemplates();
    }, [filterPremium]);

    // Filtrage local par nom
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredTemplates(templates);
        } else {
            const filtered = templates.filter(template =>
                template.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTemplates(filtered);
        }
    }, [searchTerm, templates]);

     
    const handleDelete = async (templateId) => {
        try {
            await axiosInstance.delete(`/templates/${templateId}`);
            setShowDeletePopup({ visible: false, templateId: null });
            fetchTemplates();
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="mb-6 lg:mb-0">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Gestion des Templates</h1>
                        <p className="text-lg text-gray-600">Créez et gérez vos modèles de CV personnalisés</p>
                    </div>

                    <button
                        onClick={() => { setEditingTemplate(null); setShowModal(true); }}
                        className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                    >
                        <FiPlus size={20} />
                        Nouveau Template
                    </button>
                </div>

                {/* Recherche et Filtre Premium */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1 max-w-2xl">
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un template par nom..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border-2 border-gray-300">
                                <label className="flex items-center gap-3 cursor-pointer font-medium text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={filterPremium}
                                        onChange={() => setFilterPremium(!filterPremium)}
                                        className="w-4 h-4 accent-amber-500 rounded focus:ring-2 focus:ring-amber-500"
                                    />
                                    Templates Premium uniquement
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 flex items-center justify-center">
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="text-gray-600">Chargement des templates...</p>
                        </div>
                    </div>
                ) : filteredTemplates.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiSearch className="text-gray-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun template trouvé</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || filterPremium
                                ? "Aucun template ne correspond à vos critères de recherche."
                                : "Commencez par créer votre premier template de CV."}
                        </p>
                        <button
                            onClick={() => { setEditingTemplate(null); setShowModal(true); }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold"
                        >
                            Créer un template
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTemplates.map((tpl) => (
                            <div
                                key={tpl.id}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={tpl.preview_image || "https://via.placeholder.com/300x200?text=Template+CV"}
                                        alt={tpl.name}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {tpl.is_premium && (
                                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                                            <FiStar size={12} />
                                            Premium
                                        </div>
                                    )}

                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <button
                                            className="p-2 bg-white rounded-lg shadow-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setViewingTemplate(tpl)}
                                            title="Voir"
                                        >
                                            <FiEye size={16} />
                                        </button>
                                        <button
                                            className="p-2 bg-white rounded-lg shadow-md hover:bg-green-50 hover:text-green-600 transition-colors"
                                            onClick={() => { setEditingTemplate(tpl); setShowModal(true); }}
                                            title="Modifier"
                                        >
                                            <FiEdit2 size={16} />
                                        </button>
                                        <button
                                            className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                                            onClick={() => setShowDeletePopup({ visible: true, templateId: tpl.id })}
                                            title="Supprimer"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{tpl.name}</h3>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>ID: {tpl.id}</span>
                                        <a
                                            href={tpl.file_link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Voir fichier
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal Création / Modification */}
                {showModal && (
                    <TemplateEditor
                        onClose={() => setShowModal(false)}
                        onTemplateCreated={fetchTemplates}
                        templateToEdit={editingTemplate}
                    />
                )}

                {/* Modal Visualisation */}
                {viewingTemplate && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        onClick={() => setViewingTemplate(null)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row animate-scale-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center p-6">
                                <img
                                    src={viewingTemplate.preview_image || "https://via.placeholder.com/400x300?text=Template+CV"}
                                    alt={viewingTemplate.name}
                                    className="w-full h-64 object-contain rounded-lg"
                                />
                            </div>
                            <div className="lg:w-1/2 p-6 overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{viewingTemplate.name}</h2>
                                        {viewingTemplate.is_premium && (
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mt-2">
                                                <FiStar size={14} />
                                                Premium
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setViewingTemplate(null)}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <FiX size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h3 className="font-semibold text-blue-900 mb-2">Informations</h3>
                                        <p className="text-sm"><strong>ID:</strong> {viewingTemplate.id}</p>
                                        <p className="text-sm"><strong>Statut:</strong> {viewingTemplate.is_premium ? "Premium" : "Standard"}</p>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <h3 className="font-semibold text-green-900 mb-2">Fichier Template</h3>
                                        <a
                                            href={viewingTemplate.file_link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                                        >
                                            <FiEye size={16} />
                                            Voir le fichier
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Popup Confirmation Suppression */}
                {showDeletePopup.visible && (
                    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 flex items-center gap-4">
                        <p>Voulez-vous vraiment supprimer ce template ?</p>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            onClick={() => handleDelete(showDeletePopup.templateId)}
                        >
                            Oui
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                            onClick={() => setShowDeletePopup({ visible: false, templateId: null })}
                        >
                            Non
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}