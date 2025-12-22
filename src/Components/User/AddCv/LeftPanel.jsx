import { useNavigate } from "react-router-dom";
import SectionAccordion from "./SectionAccordion";
import {
  emptyExperience,
  emptyProject,
  emptyLanguage,
  emptyCertification,
  emptyEducation
} from "./data/data";

import {
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiZap,
  FiFolder,
  FiGlobe,
  FiAward,
  FiLayers
} from "react-icons/fi";

const LeftPanel = ({
  activeSection,
  setActiveSection,
  openSections,
  toggleSection,
  cvData,
  addItemToSection,
  onChooseTemplate,
  onCreateCV,
}) => {

  const navigate = useNavigate();

  const sections = [
    {
      key: "informations_personnelles",
      title: "Informations personnelles",
      hasItems: false,
      icon: <FiUser size={18} />
    },
    {
      key: "experiences",
      title: "Expériences",
      hasItems: true,
      emptyTemplate: emptyExperience,
      icon: <FiBriefcase size={18} />
    },
    {
      key: "formations",
      title: "Formations",
      hasItems: true,
      emptyTemplate: emptyEducation,
      icon: <FiBookOpen size={18} />
    },
    {
      key: "competences",
      title: "Compétences",
      hasItems: true,
      emptyTemplate: {},
      icon: <FiZap size={18} />
    },
    {
      key: "projets",
      title: "Projets",
      hasItems: true,
      emptyTemplate: emptyProject,
      icon: <FiFolder size={18} />
    },
    {
      key: "langues",
      title: "Langues",
      hasItems: true,
      emptyTemplate: emptyLanguage,
      icon: <FiGlobe size={18} />
    },
    {
      key: "certifications",
      title: "Certifications",
      hasItems: true,
      emptyTemplate: emptyCertification,
      icon: <FiAward size={18} />
    }
  ];

  return (
    <div className="relative h-full w-full flex flex-col bg-gray-100 border-r border-gray-200 p-6 text-gray-900 overflow-hidden">

      {/* ----- Header avec branding ----- */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          Création de CV
        </h2>
        <p className="text-gray-600 text-sm font-light">
          Remplissez les sections pour construire votre CV professionnel
        </p>
      </div>

      {/* ----- Template Selection Card ----- */}
      <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200 backdrop-blur-sm shadow-sm">
        <button
          onClick={onChooseTemplate}
          className="w-full group"
        >
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-gray-300">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <FiLayers className="text-white text-lg" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  Choisir un template
                </div>
                <div className="text-xs text-gray-500 group-hover:text-gray-700">
                  Personnaliser l'apparence
                </div>
              </div>
            </div>
            <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
              →
            </div>
          </div>
        </button>
      </div>

      {/* ----- Navigation Sections ----- */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
            Sections du CV
          </h3>
          <div className="space-y-2">
            {sections.map((section) => (
              <SectionAccordion
                key={section.key}
                section={section}
                isActive={activeSection === section.key}
                isOpen={openSections[section.key]}
                onToggle={() => toggleSection(section.key)}
                onSelect={() => setActiveSection(section.key)}
                data={cvData[section.key]}
                onAddItem={() => addItemToSection(section.key, section.emptyTemplate)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ----- Action Buttons ----- */}
      <div className="mt-8 pt-6 border-t border-gray-300 space-y-3">
        <button
          onClick={onCreateCV}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Continuer
        </button>

        <button
          onClick={() => navigate("/utilisateur/mes_cvs")}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-medium py-3 px-4 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 shadow-sm"
        >
          Annuler
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(209, 213, 219, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.8);
        }
      `}</style>
    </div>
  );
};

export default LeftPanel;