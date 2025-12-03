import React, { useState } from 'react';

const TemplateSelector = ({ templates = [], onSelect }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
    };

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Choisissez votre modèle de CV
                    </h1>
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                        Sélectionnez le modèle qui correspond le mieux à votre profil professionnel.
                        Cliquez sur un modèle pour le prévisualiser.
                    </p>
                </div>

                {selectedTemplate && (
                    // <div className="mt-6 mb-4 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                    //     <div className="flex items-center justify-between">
                    //         <div>
                    //             <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    //                 Modèle sélectionné: {selectedTemplate.name}
                    //             </h3>
                    //             <p className="text-gray-600">
                    //                 Prêt à personnaliser votre CV avec ce modèle {selectedTemplate.is_premium ? 'premium' : 'gratuit'}.
                    //             </p>
                    //         </div>
                    //         <button
                    //             className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                    //             onClick={() => {
                    //                 if (selectedTemplate) {
                    //                     onSelect(selectedTemplate);
                    //                 }
                    //             }}
                    //         >
                    //             Utiliser ce modèle
                    //         </button>

                    //     </div>
                    // </div>
                    <div className="mt-4 mb-4 p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 w-full flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${selectedTemplate.is_premium ? 'bg-amber-50' : 'bg-blue-50'}`}>
                                <svg className={`w-4 h-4 ${selectedTemplate.is_premium ? 'text-amber-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">{selectedTemplate.name}</h3>
                                <p className="text-xs text-gray-500">{selectedTemplate.is_premium ? 'Premium' : 'Gratuit'}</p>
                            </div>
                        </div>

                        <button
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2"
                            onClick={() => selectedTemplate && onSelect(selectedTemplate)}
                        >
                            Utiliser ce modele
                        </button>
                    </div>

                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template, index) => (
                        <div
                            key={index}
                            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedTemplate?.file_link === template.file_link
                                ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white shadow-lg rounded-xl'
                                : 'hover:shadow-xl'
                                }`}
                            onClick={() => handleTemplateSelect(template)}
                        >
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                                    <img
                                        src={template.preview_image}
                                        alt={template.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />


                                    {template.is_premium && (
                                        <div className="absolute top-3 right-3">

                                            <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                                                Premium
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-semibold text-gray-900 truncate">
                                            {template.name}
                                        </h3>

                                    </div>

                                    {selectedTemplate?.file_link === template.file_link && (
                                        <div className="flex items-center text-sm mt-3 text-blue-600">
                                            appuyer sur utiliser ce modèle pour selectionner
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>




                {templates.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Aucun modèle disponible
                        </h3>
                        <p className="text-gray-600">
                            Les modèles de CV seront bientôt disponibles.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplateSelector;