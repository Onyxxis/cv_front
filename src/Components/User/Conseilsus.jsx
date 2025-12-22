import React, { useState } from 'react';
import {
    FiChevronLeft,
    FiChevronRight,
    FiCheckCircle,
    FiFileText,
    FiUsers,
    FiMessageSquare,
    FiTarget,
    FiEye,
    FiAward,
    FiTrendingUp,
    FiStar,
    FiSearch,
    FiClock,
    FiAlertCircle,FiBell ,FiSettings
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Conseilsus() {
    const [activeSlide, setActiveSlide] = useState(0);

    const conseils = [
        {
            id: 1,
            title: "Optimiser son CV pour les systèmes ATS",
            icon: <FiFileText className="text-blue-500" size={24} />,
            description: "Les systèmes de suivi des candidats (ATS) analysent automatiquement votre CV. Utilisez des mots-clés pertinents, un format simple et évitez les graphiques complexes.",
            tips: [
                "Utilisez des mots-clés du poste",
                "Format Word ou PDF texte",
                "Structure claire avec en-têtes",
                "Police standard (Arial, Calibri)"
            ],
            category: "CV"
        },
        {
            id: 2,
            title: "Préparation aux entretiens",
            icon: <FiUsers className="text-green-500" size={24} />,
            description: "Préparez-vous aux questions courantes et maîtrisez votre parcours professionnel. La pratique et la confiance sont clés.",
            tips: [
                "Préparez vos réalisations",
                "Étudiez l'entreprise",
                "Préparez vos questions",
                "Entraînez-vous avec un ami"
            ],
            category: "Entretien"
        },
        {
            id: 3,
            title: "Mettre en valeur ses réalisations",
            icon: <FiAward className="text-purple-500" size={24} />,
            description: "Utilisez la méthode STAR (Situation, Tâche, Action, Résultat) pour décrire vos expériences de manière impactante.",
            tips: [
                "Chiffrez vos résultats",
                "Utilisez des verbes d'action",
                "Soyez spécifique",
                "Montrez l'impact"
            ],
            category: "CV"
        },
        {
            id: 4,
            title: "Communication non verbale",
            icon: <FiMessageSquare className="text-orange-500" size={24} />,
            description: "Votre langage corporel parle plus fort que vos mots. Maîtrisez votre posture, contact visuel et gestuelle.",
            tips: [
                "Maintenez le contact visuel",
                "Posture droite et ouverte",
                "Sourire naturel",
                "Gestes contrôlés"
            ],
            category: "Entretien"
        },
        {
            id: 5,
            title: "Adapter son CV au poste",
            icon: <FiTarget className="text-red-500" size={24} />,
            description: "Personnalisez votre CV pour chaque candidature en mettant en avant les compétences les plus pertinentes.",
            tips: [
                "Lisez attentivement l'offre",
                "Adaptez le résumé",
                "Réorganisez les sections",
                "Surlignez les compétences clés"
            ],
            category: "CV"
        },
        {
            id: 6,
            title: "Gestion du stress",
            icon: <FiEye className="text-indigo-500" size={24} />,
            description: "Apprenez à gérer votre stress avant et pendant l'entretien pour rester concentré et performant.",
            tips: [
                "Respiration profonde",
                "Visualisation positive",
                "Préparation minutieuse",
                "Acceptez l'imperfection"
            ],
            category: "Entretien"
        },
        {
            id: 7,
            title: "Mots-clés stratégiques",
            icon: <FiSearch className="text-cyan-500" size={24} />,
            description: "Identifiez et intégrez les mots-clés essentiels pour passer les filtres ATS et attirer l'attention des recruteurs.",
            tips: [
                "Analysez plusieurs offres similaires",
                "Incluez les compétences techniques",
                "Utilisez les termes du secteur",
                "Variations de mots-clés"
            ],
            category: "CV"
        },
        {
            id: 8,
            title: "Questions à poser en entretien",
            icon: <FiTrendingUp className="text-emerald-500" size={24} />,
            description: "Préparez des questions pertinentes qui montrent votre intérêt et votre réflexion stratégique.",
            tips: [
                "Demandez sur la culture d'entreprise",
                "Questions sur les défis du poste",
                "Perspectives d'évolution",
                "Attentes pour les 6 premiers mois"
            ],
            category: "Entretien"
        },
        {
            id: 9,
            title: "Formatage optimal",
            icon: <FiStar className="text-yellow-500" size={24} />,
            description: "Un bon formatage rend votre CV lisible aussi bien par les humains que par les machines.",
            tips: [
                "Maximum 2 pages",
                "Marges suffisantes",
                "Hiérarchie visuelle claire",
                "Police 11-12pt"
            ],
            category: "CV"
        },
        {
            id: 10,
            title: "Suivi post-entretien",
            icon: <FiClock className="text-gray-600" size={24} />,
            description: "Le processus ne s'arrête pas à la fin de l'entretien. Un bon suivi peut faire la différence.",
            tips: [
                "Envoyez un email de remerciement",
                "Relancez poliment après délai",
                "Restez professionnel sur réseaux",
                "Mettez à jour votre candidature"
            ],
            category: "Entretien"
        }
    ];

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % conseils.length);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + conseils.length) % conseils.length);
    };

    const goToSlide = (index) => {
        setActiveSlide(index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Conseils Carrière</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Développez vos compétences pour réussir vos candidatures et vos entretiens
                        </p>
                    </div>
                </div>
            </div> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Carousel */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* Carousel Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Conseils Professionnels
                                        </h2>
                                        <p className="text-gray-600 mt-2">
                                            {activeSlide + 1} sur {conseils.length} conseils
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={prevSlide}
                                            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                                        >
                                            <FiChevronLeft className="text-gray-700" size={20} />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                                        >
                                            <FiChevronRight className="text-gray-700" size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="flex space-x-4 mt-6">
                                    <button className={`px-4 py-2 rounded-full font-medium ${conseils[activeSlide].category === 'CV' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                        Optimisation CV
                                    </button>
                                    <button className={`px-4 py-2 rounded-full font-medium ${conseils[activeSlide].category === 'Entretien' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                        Entretiens
                                    </button>
                                </div>
                            </div>

                            {/* Main Carousel */}
                            <div className="relative p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeSlide}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                                                    {conseils[activeSlide].icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900">
                                                        {conseils[activeSlide].title}
                                                    </h3>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${conseils[activeSlide].category === 'CV' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                        {conseils[activeSlide].category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-5xl font-bold text-gray-200">
                                                0{activeSlide + 1}
                                            </div>
                                        </div>

                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            {conseils[activeSlide].description}
                                        </p>

                                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                                                <FiCheckCircle className="mr-2 text-green-500" />
                                                Points Clés à Retenir
                                            </h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {conseils[activeSlide].tips.map((tip, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                        <span className="text-gray-700">{tip}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Slide Indicators */}
                                <div className="flex justify-center space-x-2 mt-8 pt-8 border-t">
                                    {conseils.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-all ${index === activeSlide ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mini Cards Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                            {conseils.slice(0, 5).map((conseil, index) => (
                                <button
                                    key={conseil.id}
                                    onClick={() => goToSlide(index)}
                                    className={`p-4 rounded-xl border transition-all ${activeSlide === index ? 'bg-blue-600 border-blue-600 text-white transform scale-105' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}`}
                                >
                                    <div className={`p-2 rounded-lg inline-block ${activeSlide === index ? 'bg-white/20' : 'bg-blue-50'}`}>
                                        {conseil.icon}
                                    </div>
                                    <p className="text-sm font-medium mt-3 text-left line-clamp-2">
                                        {conseil.title}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Coming Soon Section */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* Coming Soon Card */}
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-8 text-center h-full flex flex-col justify-center">
                                {/* Icon Container */}
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                            <div className="text-white text-3xl"><FiSettings/></div>
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full border border-blue-100 flex items-center justify-center shadow-lg">
                                            <FiAlertCircle className="text-blue-600" size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Offres d'Emploi
                                </h2>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Notre section d'offres d'emploi est en cours de développement.
                                    Nous travaillons activement à vous offrir un service de mise
                                    en relation avec les meilleures opportunités professionnelles.
                                </p>

                                {/* Features List */}
                                <div className="space-y-4 mb-8 text-left">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                            <FiSearch className="text-green-600" size={16} />
                                        </div>
                                        <span className="text-gray-700">Recherche intelligente</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                            <FiTarget className="text-purple-600" size={16} />
                                        </div>
                                        <span className="text-gray-700">Matching personnalisé</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                                            <FiBell className="text-orange-600" size={16} />
                                        </div>
                                        <span className="text-gray-700">Alertes opportunités</span>
                                    </div>
                                </div>

                                {/* Status Indicator */}
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 mb-4">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-semibold text-blue-700">
                                        Disponible bientôt
                                    </span>
                                </div>

                                {/* Countdown */}
                                {/* <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-sm text-gray-500 mb-2">
                                        Lancement prévu dans
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">30</div>
                                            <div className="text-xs text-gray-500">jours</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">15</div>
                                            <div className="text-xs text-gray-500">heures</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">45</div>
                                            <div className="text-xs text-gray-500">minutes</div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* Subscribe CTA */}
                                {/* <button className="mt-8 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
                                    Être notifié au lancement
                                </button> */}
                            </div>

                            {/* Stats Card */}
                            {/* <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-6">
                                <h3 className="font-bold text-gray-900 mb-4">Statistiques</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-600">CV optimisés</span>
                                            <span className="text-sm font-semibold text-blue-600">89%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-600">Entretiens réussis</span>
                                            <span className="text-sm font-semibold text-green-600">76%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}