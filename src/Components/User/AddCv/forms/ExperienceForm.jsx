 
import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

const ExperienceForm = ({ data = [], onUpdate, onUpdateItem }) => {
  const [experiences, setExperiences] = useState(data);

  // Synchronisation initiale ou quand "data" change réellement
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(experiences)) {
      setExperiences(data);
    }
  }, [data]);

  
  const addExperience = () => {
    const newExperience = {
      position: "",
      company: "",
      description: "",
      start_date: "",
      end_date: ""
    };
    const newExperiences = [...experiences, newExperience];
    setExperiences(newExperiences);
    if (onUpdate) onUpdate(newExperiences);
  };

  const updateExperience = (index, field, value) => {
    const newExperiences = experiences.map((exp, i) => {
      if (i === index) {
        let newValue = value;

        // Contrôle des dates
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        if (field === 'start_date') {
          if (newValue > today) newValue = today;
          if (exp.end_date && newValue > exp.end_date) newValue = exp.end_date;
        }
        if (field === 'end_date') {
          if (exp.start_date && newValue < exp.start_date) newValue = exp.start_date;
        }

        return { ...exp, [field]: newValue };
      }
      return exp;
    });

    setExperiences(newExperiences);
    if (onUpdateItem) onUpdateItem('experiences', index, newExperiences[index]);
    if (onUpdate) onUpdate(newExperiences);
  };

  const removeExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
    if (onUpdate) onUpdate(newExperiences);
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Expérience {index + 1}
            </h3>
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poste *
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Développeur Frontend"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise *
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Nom de l'entreprise"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de début *
                </label>
                <input
                  type="date"
                  value={exp.start_date}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={exp.end_date}
                  min={exp.start_date || undefined}
                  onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="En cours"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Décrivez vos missions et responsabilités..."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
      >
        <Plus size={20} />
        <span className="font-medium">Ajouter une expérience</span>
      </button>
    </div>
  );
};

export default ExperienceForm;
