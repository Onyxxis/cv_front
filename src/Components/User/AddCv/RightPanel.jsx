import { motion } from 'framer-motion';
import CVForm from './CVForm';
import TemplateSelector from './TemplateSelector';

const RightPanel = ({
  activeSection,
  cvData,
  updateSectionData,
  updateItemInSection,
  removeItemFromSection,
  isChoosingTemplate,
  templates,
  onTemplateSelect
}) => {

  if (isChoosingTemplate) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full bg-white p-6 overflow-y-auto"
      >
        <TemplateSelector
          templates={Array.isArray(templates) ? templates : []}
          onSelect={onTemplateSelect}
        />

      </motion.div>
    );
  }

  if (!activeSection) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-blue-400"
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
            <h3 className="text-3xl font-bold text-gray-700 mb-2">
              Commencez à créer votre CV
            </h3>
            <p className="text-gray-500">
              Veuillez sélectionner un des sections pour commencer à remplir.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed p-6">
              Pour une meilleure expérience de navigation, nous vous recommandons de réduire la barre latérale.
              Cela vous permettra d’avoir une vue plus large et plus confortable de l’ensemble des éléments présents sur la page.
            </p>

          </div>

        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-white p-8"
    >
      <CVForm
        section={activeSection}
        data={cvData[activeSection]}
        updateData={(newData) => updateSectionData(activeSection, newData)}
        updateItem={updateItemInSection}
        removeItem={removeItemFromSection}
      />
    </motion.div>
  );
};
export default RightPanel;
