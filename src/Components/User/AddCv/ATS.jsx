
// import React from "react";
// import {
//     FiCheck,
//     FiStar,
//     FiAlertCircle,
//     FiAward,
//     FiTrendingUp,
//     FiTarget,
//     FiBarChart2
// } from "react-icons/fi";

// // Spinner élégant
// const Spinner = () => (
//     <div className="flex justify-center items-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
//     </div>
// );



// const ATSScoreCard = ({ score, atsAnalysis, atsLoading,previewCV  }) => {
//     const safeScore = typeof score === "number" && !Number.isNaN(score) ? score : null;

//     const getScoreColor = (s) => {
//         if (s >= 80) return "from-emerald-500 to-emerald-600";
//         if (s >= 60) return "from-amber-500 to-amber-600";
//         return "from-rose-500 to-rose-600";
//     };

//     const getScoreTextColor = (s) => {
//         if (s >= 80) return "text-emerald-600";
//         if (s >= 60) return "text-amber-600";
//         return "text-rose-600";
//     };

//     const getScoreBgColor = (s) => {
//         if (s >= 80) return "bg-emerald-50 border-emerald-200";
//         if (s >= 60) return "bg-amber-50 border-amber-200";
//         return "bg-rose-50 border-rose-200";
//     };

//     const getScoreMessage = (s) => {
//         if (s >= 80) return "Votre CV est parfaitement optimisé pour les systèmes ATS";
//         if (s >= 60) return "Votre CV est compétitif mais peut être amélioré";
//         return "Votre CV nécessite des optimisations importantes";
//     };

//     const getScoreLevel = (s) => {
//         if (s >= 80) return "Excellent";
//         if (s >= 60) return "Bon";
//         return "À améliorer";
//     };

//     const getScoreIcon = (s) => {
//         if (s >= 80) return <FiCheck className="text-emerald-500" size={20} />;
//         if (s >= 60) return <FiStar className="text-amber-500" size={20} />;
//         return <FiAlertCircle className="text-rose-500" size={20} />;
//     };

//     /* ---------------------------------------------
//         🎯 — ÉTAT : AUCUNE DONNÉE (État initial)
//     --------------------------------------------- */
//     if (!atsLoading && safeScore === null && (!atsAnalysis || Object.keys(atsAnalysis).length === 0)) {
//         return (
//             <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl shadow-lg border border-gray-100 p-8">
//                 <div className="text-center">
//                     {/* Icone principale */}
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6">
//                         <FiBarChart2 className="text-white text-2xl" />
//                     </div>

//                     <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                         Analyse ATS Professionnelle
//                     </h3>

//                     <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
//                         Obtenez une analyse détaillée de la compatibilité de votre CV
//                         avec les systèmes de recrutement automatisés
//                     </p>

//                     {/* Features grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//                         <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
//                             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
//                                 <FiTarget className="text-blue-600 text-lg" />
//                             </div>
//                             <h4 className="font-semibold text-gray-900 text-sm mb-2">Score ATS</h4>
//                             <p className="text-gray-600 text-xs leading-relaxed">
//                                 Évaluation précise de 0 à 100%
//                             </p>
//                         </div>

//                         <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
//                             <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
//                                 <FiTrendingUp className="text-emerald-600 text-lg" />
//                             </div>
//                             <h4 className="font-semibold text-gray-900 text-sm mb-2">Optimisations</h4>
//                             <p className="text-gray-600 text-xs leading-relaxed">
//                                 Suggestions concrètes d'amélioration
//                             </p>
//                         </div>

//                         <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
//                             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
//                                 <FiAward className="text-purple-600 text-lg" />
//                             </div>
//                             <h4 className="font-semibold text-gray-900 text-sm mb-2">Mots-clés</h4>
//                             <p className="text-gray-600 text-xs leading-relaxed">
//                                 Recommandations de termes stratégiques
//                             </p>
//                         </div>
//                     </div>

//                     {/* Call to action */}
//                     <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-6 backdrop-blur-sm">
//                         <div className="flex items-center justify-center gap-3 mb-3">
//                             <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <FiAward className="text-blue-600 text-sm" />
//                             </div>
//                             <h4 className="font-semibold text-blue-900">
//                                 Prêt pour l'analyse ?
//                             </h4>
//                         </div>
//                         <p className="text-blue-700 text-sm leading-relaxed">
//                             Cliquez sur <strong className="font-semibold">"Analyser mon CV"</strong> pour obtenir
//                             une évaluation complète et des recommandations personnalisées
//                             qui augmenteront vos chances de réussite.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     /* ---------------------------------------------
//         🎯 — ÉTAT : ANALYSE EN COURS
//     --------------------------------------------- */
//     if (atsLoading) {
//         return (
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//                 <div className="text-center">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6">
//                         <FiBarChart2 className="text-white text-2xl" />
//                     </div>

//                     <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                         Analyse en cours
//                     </h3>

//                     <div className="flex justify-center mb-6">
//                         <Spinner />
//                     </div>

//                     <p className="text-gray-600 text-lg">
//                         Notre système analyse votre CV...
//                     </p>
//                     <p className="text-gray-500 text-sm mt-2">
//                         Cette opération peut prendre quelques secondes
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     /* ---------------------------------------------
//         🎯 — ÉTAT : DONNÉES DISPONIBLES
//     --------------------------------------------- */
//     return (
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

//             <div className="w-full p-4">
//                 <button
//                     onClick={previewCV}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-md"
//                 >
//                     Télécharger
//                 </button>
//             </div>


//             <div className="p-6">
//                 {/* Score principal avec design moderne */}
//                 <div className="text-center mb-8">
//                     <div className="relative inline-flex items-center justify-center mb-6">
//                         {/* Cercle de progression externe */}
//                         <div className="w-44 h-44 rounded-full border-8 border-gray-100 flex items-center justify-center shadow-lg">
//                             <div className="text-center">
//                                 <div className={`text-4xl font-black ${getScoreTextColor(safeScore)} mb-2`}>
//                                     {safeScore}%
//                                 </div>
//                                 <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
//                                     Score ATS
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Arc de progression animé */}
//                         <svg className="absolute inset-0 w-44 h-44 transform -rotate-90" viewBox="0 0 100 100">
//                             <circle
//                                 cx="50"
//                                 cy="50"
//                                 r="45"
//                                 fill="none"
//                                 stroke="url(#gradient)"
//                                 strokeWidth="8"
//                                 strokeLinecap="round"
//                                 strokeDasharray="283"
//                                 strokeDashoffset={283 - (283 * safeScore) / 100}
//                                 className="transition-all duration-1000 ease-out"
//                             />
//                             <defs>
//                                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                                     <stop offset="0%" stopColor={safeScore >= 80 ? "#10B981" : safeScore >= 60 ? "#F59E0B" : "#EF4444"} />
//                                     <stop offset="100%" stopColor={safeScore >= 80 ? "#059669" : safeScore >= 60 ? "#D97706" : "#DC2626"} />
//                                 </linearGradient>
//                             </defs>
//                         </svg>
//                     </div>

//                     {/* Message du score */}
//                     <div className="flex items-center justify-center gap-3 mb-4">
//                         {getScoreIcon(safeScore)}
//                         <div className="text-left">
//                             <div className={`text-lg font-bold ${getScoreTextColor(safeScore)}`}>
//                                 {getScoreLevel(safeScore)}
//                             </div>
//                             <div className="text-sm text-gray-600">
//                                 {getScoreMessage(safeScore)}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Barre de progression détaillée */}
//                 <div className="mb-8">
//                     <div className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
//                         <span className="text-gray-500">0%</span>
//                         <span className={`${getScoreTextColor(safeScore)}`}>
//                             Score actuel: {safeScore}%
//                         </span>
//                         <span className="text-gray-500">100%</span>
//                     </div>

//                     <div className="w-full bg-gray-100 rounded-full h-3 shadow-inner overflow-hidden">
//                         <div
//                             className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor(safeScore)} transition-all duration-1000 shadow-md`}
//                             style={{ width: `${safeScore}%` }}
//                         ></div>
//                     </div>

//                     <div className="flex justify-between text-xs text-gray-500 mt-2">
//                         <span>Débutant</span>
//                         <span>Intermédiaire</span>
//                         <span>Expert</span>
//                     </div>
//                 </div>

//                 {/* Contenu de l'analyse */}
//                 <div className="space-y-6">
//                     {/* Suggestions d'amélioration */}
//                     {Array.isArray(atsAnalysis?.improvements) && atsAnalysis.improvements.length > 0 &&  (
//                         <div className="bg-amber-50/80 rounded-xl p-5 border border-amber-200 backdrop-blur-sm">
//                             <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
//                                 <FiAlertCircle className="text-amber-600 text-xl" />
//                                 Points à améliorer
//                             </h4>
//                             <div className="space-y-3">
//                                 {atsAnalysis.improvements.map((item, idx) => (
//                                     <div
//                                         key={idx}
//                                         className="flex items-start gap-3 p-3 bg-white/80 rounded-lg border border-amber-100 shadow-sm"
//                                     >
//                                         <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
//                                         <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Mots-clés recommandés */}
//                     {atsAnalysis?.keyword_recommendations?.length > 0 && (
//                         <div className="bg-emerald-50/80 rounded-xl p-5 border border-emerald-200 backdrop-blur-sm">
//                             <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
//                                 <FiTrendingUp className="text-emerald-600 text-xl" />
//                                 Mots-clés stratégiques
//                             </h4>
//                             <div className="flex flex-wrap gap-2">
//                                 {atsAnalysis.keyword_recommendations.map((kw, idx) => (
//                                     <span
//                                         key={idx}
//                                         className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-200"
//                                     >
//                                         {kw}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* État optimal */}
//                     {!atsAnalysis?.improvements?.length &&
//                         !atsAnalysis?.keyword_recommendations?.length && (
//                             <div className="text-center py-8 bg-emerald-50/80 rounded-xl border border-emerald-200 backdrop-blur-sm">
//                                 <FiCheck className="text-emerald-500 text-4xl mx-auto mb-3" />
//                                 <p className="font-semibold text-emerald-800 text-lg">
//                                     CV parfaitement optimisé
//                                 </p>
//                                 <p className="text-emerald-600 text-sm mt-1">
//                                     Votre CV présente une excellente compatibilité ATS
//                                 </p>
//                             </div>
//                         )}

//                     {/* Résumé de l'analyse */}
//                     {atsAnalysis?.summary && (
//                         <div className="bg-blue-50/80 rounded-xl p-5 border border-blue-200 backdrop-blur-sm">
//                             <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-3">
//                                 <FiBarChart2 className="text-blue-600 text-xl" />
//                                 Synthèse de l'analyse
//                             </h4>
//                             <p className="text-sm text-gray-700 leading-relaxed">
//                                 {atsAnalysis.summary}
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// /* ---------------------------------------------------
//       😎 — COMPOSANT PRINCIPAL
// --------------------------------------------------- */
// function ATS({ score, atsAnalysis, atsLoading,previewCV }) {
//     return (
//         <div className="w-full">
//             <ATSScoreCard
//                 score={score}
//                 atsAnalysis={atsAnalysis}
//                 atsLoading={atsLoading}
//                 previewCV={previewCV}
//             />
//         </div>
//     );
// }

// export default ATS;

import React from "react";
import {
    FiCheck,
    FiStar,
    FiAlertCircle,
    FiAward,
    FiTrendingUp,
    FiTarget,
    FiBarChart2
} from "react-icons/fi";

// Spinner élégant
const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
    </div>
);

const ATSScoreCard = ({ score, atsAnalysis, atsLoading, previewCV }) => {
    const safeScore = typeof score === "number" && !Number.isNaN(score) ? score : null;

    const getScoreColor = (s) => {
        if (s >= 80) return "from-emerald-500 to-emerald-600";
        if (s >= 60) return "from-amber-500 to-amber-600";
        return "from-rose-500 to-rose-600";
    };

    const getScoreTextColor = (s) => {
        if (s >= 80) return "text-emerald-600";
        if (s >= 60) return "text-amber-600";
        return "text-rose-600";
    };

    const getScoreMessage = (s) => {
        if (s >= 80) return "Votre CV est parfaitement optimisé pour les systèmes ATS";
        if (s >= 60) return "Votre CV est compétitif mais peut être amélioré";
        return "Votre CV nécessite des optimisations importantes";
    };

    const getScoreLevel = (s) => {
        if (s >= 80) return "Excellent";
        if (s >= 60) return "Bon";
        return "À améliorer";
    };

    const getScoreIcon = (s) => {
        if (s >= 80) return <FiCheck className="text-emerald-500" size={20} />;
        if (s >= 60) return <FiStar className="text-amber-500" size={20} />;
        return <FiAlertCircle className="text-rose-500" size={20} />;
    };

    /* ---------------------------------------------
        🎯 — ÉTAT : AUCUNE DONNÉE (État initial)
    --------------------------------------------- */
    if (!atsLoading && safeScore === null && (!atsAnalysis || Object.keys(atsAnalysis).length === 0)) {
        return (
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6">
                        <FiBarChart2 className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Analyse ATS Professionnelle
                    </h3>
                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                        Obtenez une analyse détaillée de la compatibilité de votre CV
                        avec les systèmes de recrutement automatisés
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                                <FiTarget className="text-blue-600 text-lg" />
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">Score ATS</h4>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Évaluation précise de 0 à 100%
                            </p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                                <FiTrendingUp className="text-emerald-600 text-lg" />
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">Optimisations</h4>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Suggestions concrètes d'amélioration
                            </p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                                <FiAward className="text-purple-600 text-lg" />
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">Mots-clés</h4>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Recommandations de termes stratégiques
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiAward className="text-blue-600 text-sm" />
                            </div>
                            <h4 className="font-semibold text-blue-900">
                                Prêt pour l'analyse ?
                            </h4>
                        </div>
                        <p className="text-blue-700 text-sm leading-relaxed">
                            Cliquez sur <strong className="font-semibold">"Analyser mon CV"</strong> pour obtenir
                            une évaluation complète et des recommandations personnalisées
                            qui augmenteront vos chances de réussite.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    /* ---------------------------------------------
        🎯 — ÉTAT : ANALYSE EN COURS
    --------------------------------------------- */
    if (atsLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6">
                        <FiBarChart2 className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Analyse en cours
                    </h3>
                    <div className="flex justify-center mb-6">
                        <Spinner />
                    </div>
                    <p className="text-gray-600 text-lg">
                        Notre système analyse votre CV...
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Cette opération peut prendre quelques secondes
                    </p>
                </div>
            </div>
        );
    }

    /* ---------------------------------------------
        🎯 — ÉTAT : DONNÉES DISPONIBLES
    --------------------------------------------- */
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="w-full p-4">
                <button
                    onClick={previewCV}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-md"
                >
                    Télécharger
                </button>
            </div>

            <div className="p-6">
                <div className="text-center mb-8">
                    <div className="relative inline-flex items-center justify-center mb-6">
                        <div className="w-44 h-44 rounded-full border-8 border-gray-100 flex items-center justify-center shadow-lg">
                            <div className="text-center">
                                <div className={`text-4xl font-black ${getScoreTextColor(safeScore)} mb-2`}>
                                    {safeScore}%
                                </div>
                                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                    Score ATS
                                </div>
                            </div>
                        </div>
                        <svg className="absolute inset-0 w-44 h-44 transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * safeScore) / 100}
                                className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor={safeScore >= 80 ? "#10B981" : safeScore >= 60 ? "#F59E0B" : "#EF4444"} />
                                    <stop offset="100%" stopColor={safeScore >= 80 ? "#059669" : safeScore >= 60 ? "#D97706" : "#DC2626"} />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-4">
                        {getScoreIcon(safeScore)}
                        <div className="text-left">
                            <div className={`text-lg font-bold ${getScoreTextColor(safeScore)}`}>
                                {getScoreLevel(safeScore)}
                            </div>
                            <div className="text-sm text-gray-600">
                                {getScoreMessage(safeScore)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
                        <span className="text-gray-500">0%</span>
                        <span className={`${getScoreTextColor(safeScore)}`}>
                            Score actuel: {safeScore}%
                        </span>
                        <span className="text-gray-500">100%</span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-3 shadow-inner overflow-hidden">
                        <div
                            className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor(safeScore)} transition-all duration-1000 shadow-md`}
                            style={{ width: `${safeScore}%` }}
                        ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Débutant</span>
                        <span>Intermédiaire</span>
                        <span>Expert</span>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Suggestions d'amélioration */}
                    {atsAnalysis?.improvements?.length ? (
                        <div className="bg-amber-50/80 rounded-xl p-5 border border-amber-200 backdrop-blur-sm">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <FiAlertCircle className="text-amber-600 text-xl" />
                                Points à améliorer
                            </h4>
                            <div className="space-y-3">
                                {atsAnalysis.improvements.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 p-3 bg-white/80 rounded-lg border border-amber-100 shadow-sm"
                                    >
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {/* Mots-clés recommandés */}
                    {atsAnalysis?.keyword_recommendations?.length ? (
                        <div className="bg-emerald-50/80 rounded-xl p-5 border border-emerald-200 backdrop-blur-sm">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <FiTrendingUp className="text-emerald-600 text-xl" />
                                Mots-clés stratégiques
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {atsAnalysis.keyword_recommendations.map((kw, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}


                    {/* État optimal */}
                    {(!Array.isArray(atsAnalysis?.improvements) || atsAnalysis.improvements.length === 0) &&
                        (!atsAnalysis?.improvements?.length && !atsAnalysis?.keyword_recommendations?.length) && (
                            <div className="text-center py-8 bg-emerald-50/80 rounded-xl border border-emerald-200 backdrop-blur-sm">
                                <FiCheck className="text-emerald-500 text-4xl mx-auto mb-3" />
                                <p className="font-semibold text-emerald-800 text-lg">
                                    CV parfaitement optimisé
                                </p>
                                <p className="text-emerald-600 text-sm mt-1">
                                    Votre CV présente une excellente compatibilité ATS
                                </p>
                            </div>
                        )}

                    {/* Résumé de l'analyse */}
                    {atsAnalysis?.summary && (
                        <div className="bg-blue-50/80 rounded-xl p-5 border border-blue-200 backdrop-blur-sm">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-3">
                                <FiBarChart2 className="text-blue-600 text-xl" />
                                Synthèse de l'analyse
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {atsAnalysis.summary}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

function ATS({ score, atsAnalysis, atsLoading, onPreview  }) {
    return (
        <div className="w-full">
            <ATSScoreCard
                score={score}
                atsAnalysis={atsAnalysis}
                atsLoading={atsLoading}
                previewCV={onPreview}
            />
        </div>
    );
}

export default ATS;
