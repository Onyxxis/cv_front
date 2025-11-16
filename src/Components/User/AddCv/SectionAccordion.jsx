import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus } from 'lucide-react';

const SectionAccordion = ({
  section,
  isActive,
  isOpen,
  onToggle,
  onSelect,
  data,
  onAddItem
}) => {
  const handleClick = () => {
    onSelect();
    if (!isOpen) onToggle();
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div className="mb-2 bg-blue-400/20 rounded-xl overflow-hidden">
      <div
        className={`p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${isActive
            ? 'bg-blue-600 text-white'
            : 'bg-blue-500/10 text-white hover:bg-blue-500/20'
          }`}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3">
          <span className="text-lg">{section.icon}</span>
          <span className="font-medium">{section.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-current cursor-pointer"
          onClick={handleArrowClick}
        >
          <ChevronRight size={20} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-3 bg-white/10">
              {section.hasItems &&
                Array.isArray(data) &&
                data.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 mb-1 bg-white/20 rounded-lg text-white text-sm hover:bg-white/30 transition-colors cursor-pointer"
                    onClick={() => onSelect()}
                  >
                    <span className="truncate">
                      {item.poste ||
                        item.nom_diplome ||
                        item.nom_projet ||
                        item.nom ||
                        item.titre ||
                        `Élément ${index + 1}`}
                    </span>
                  </div>
                ))}

              {section.hasItems && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddItem();
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-2 mt-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
                >
                  <Plus size={16} />
                  <span className="text-sm font-medium">Ajouter</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionAccordion;
