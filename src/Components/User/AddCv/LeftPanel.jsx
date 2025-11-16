import { useNavigate } from "react-router-dom";
import SectionAccordion from './SectionAccordion';
import {
  emptyExperience,
  emptyProject,
  emptyLanguage,
  emptyCertification,
  emptyEducation,
  
} from './data/data';

const LeftPanel = ({
  activeSection,
  setActiveSection,
  openSections,
  toggleSection,
  cvData,
  addItemToSection,
  onChooseTemplate,
  onCreateCV,
  onCreateStart,
}) => {

  const navigate = useNavigate();
 
  const sections = [
    { key: 'informations_personnelles', title: 'Informations personnelles', hasItems: false },
    { key: 'experiences', title: 'Expériences', hasItems: true, emptyTemplate: emptyExperience },
    { key: 'formations', title: 'Formations', hasItems: true, emptyTemplate: emptyEducation },
    { key: 'competences', title: 'Compétences', hasItems: true, emptyTemplate: {} },
    { key: 'projets', title: 'Projets', hasItems: true, emptyTemplate: emptyProject },
    { key: 'langues', title: 'Langues', hasItems: true, emptyTemplate: emptyLanguage },
    { key: 'certifications', title: 'Certifications', hasItems: true, emptyTemplate: emptyCertification }
  ];

  return (
    <div className="relative h-full flex flex-col bg-blue-800 rounded-t-3xl p-4 shad">
      <div className="flex justify-between mt-3 mb-4">
        <button
          className="flex-1 mr-2 bg-black hover:bg-red-600 border-black text-white font-bold py-2 px-4 rounded-xl   shadow-2xl"
          onClick={() => navigate("/utilisateur/mes_cvs")}
        >
          Annuler
        </button>
        <button
          className="flex-1 ml-2 bg-blue-600/60 hover:bg-blue-600 text-white font-bold py-2 px-4 border- rounded-xl shadow"
          onClick={onCreateCV}
        >
          Créer le CV
        </button>
      </div>

      <div className="mb-4 text-white">
        <h2 className="text-2xl font-bold mb-1">Mon CV</h2>
        <p className="text-sm">Remplissez les sections pour créer votre CV</p>
      </div>

      <div className="mb-6">
        <button
          className="w-full bg-blue-500/50 hover:bg-blue-500/40 text-white font-bold py-2 px-4 rounded shadow"
          onClick={onChooseTemplate}
        >
          Choisir un template
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
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
  );
};

export default LeftPanel;