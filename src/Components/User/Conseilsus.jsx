import React from 'react';
import { FiClock, FiTool } from 'react-icons/fi';

export default function Conseilsus() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            {/* Main Card */}
            <div className="relative w-full max-w-md">
                {/* Decorative Background Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-300 rounded-full opacity-60 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-300 rounded-full opacity-40 blur-lg"></div>
                
                {/* Content Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-8 text-center">
                    {/* Icon Container */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <FiClock className="text-white" size={32} />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border border-blue-100 flex items-center justify-center shadow-sm">
                                <FiTool className="text-blue-600 text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                        En cours de développement
                    </h1>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Cette fonctionnalité sera bientôt disponible. 
                        Notre équipe travaille activement pour vous offrir 
                        la meilleure expérience.
                    </p>

                    {/* Status Indicator */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-700">
                            Disponible prochainement
                        </span>
                    </div>
                </div>

                {/* Subtle Pattern */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
}