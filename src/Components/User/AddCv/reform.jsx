
import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { FiX } from "react-icons/fi";

export default function Reform({ text, context, onReformulated }) {
    const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
    const [loading, setLoading] = useState(false);

    // Affichage du popup
    const showPopup = (message, type) => {
        setPopup({ visible: true, message, type });
        setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 4000);
    };

    const closePopup = () => {
        setPopup({ visible: false, message: "", type: "" });
    };

    // Fonction principale
    const handleReformulate = async () => {
        if (!text) return;

        try {
            setLoading(true);

            const response = await axiosInstance.post("/reformulate/", {
                text,
                context,
            });

            const reformulatedText = response.data.reformulated_text;

            if (onReformulated) onReformulated(reformulatedText);

            showPopup("Texte reformulé avec succès !", "success");

        } catch (error) {
            console.error("Erreur lors de la reformulation :", error);
            showPopup("Impossible de reformuler pour le moment.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={handleReformulate}
                disabled={loading}
                className={`group relative outline-0 
                    h-9 px-3.5 min-w-[110px]
                    border border-solid border-transparent rounded-md 
                    flex items-center justify-center gap-1.5 cursor-pointer 
                    transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                    bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-700 hover:to-blue-700
                    shadow-sm hover:shadow
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
            >
                {loading ? (
                    <span className="text-white text-xs">Patiente...</span>
                ) : (
                    <>
                        <svg
                            className="h-4 w-4 text-white transition-all duration-200 group-hover:rotate-12"
                            stroke="none"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                            ></path>
                        </svg>
                        <span className="text-xs font-medium text-white">
                            Reformuler
                        </span>
                    </>
                )}
            </button>

            {popup.visible && (
                <div
                    className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full 
                        animate-slide-in-right
                        ${popup.type === "success"
                            ? "bg-green-50 border-green-200"
                            : popup.type === "error"
                                ? "bg-red-50 border-red-200"
                                : "bg-blue-50 border-blue-200"
                        }
                        border rounded-xl shadow-lg p-4`}
                >
                    <div className="flex items-start gap-3">
                        <div
                            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center 
                                ${popup.type === "success"
                                    ? "bg-green-500"
                                    : popup.type === "error"
                                        ? "bg-red-500"
                                        : "bg-blue-500"
                                }
                                text-white text-sm font-bold`}
                        >
                            {popup.type === "success" ? "✓" : "!"}
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {popup.message}
                            </p>
                        </div>

                        <button
                            onClick={closePopup}
                            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
