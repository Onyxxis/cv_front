import React from "react";

export default function Popup({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-8 py-6 rounded-2xl shadow-2xl border-l-4 bg-white text-black border-blue-500 animate-slide-down max-w-md w-full">
            <div className="flex items-center gap-4">
                
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold">
                    i
                </div>

                <div className="flex-1">
                    <span className="font-semibold text-lg block text-center">
                        {message}
                    </span>
                </div>

                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
}
