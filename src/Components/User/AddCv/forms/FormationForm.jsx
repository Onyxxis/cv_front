 
import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid si pas déjà fait

export const emptyEducation = {
  degree_name: "",
  institution: "",
  start_date: "",
  end_date: ""
};

const FormationForm = ({ data = [], onUpdate, onUpdateItem }) => {
  const [formations, setFormations] = useState(
    data.map(f => ({ ...f, id: f.id || uuidv4() }))
  );

  // useEffect(() => {
  //   const dataWithIds = data.map(f => ({ ...f, id: f.id || uuidv4() }));
  //   setFormations(dataWithIds);
  // }, [data]);

  const addFormation = () => {
    const today = new Date().toISOString().split("T")[0];
    const newFormation = { ...emptyEducation, id: uuidv4(), start_date: today };
    const newFormations = [...formations, newFormation];
    setFormations(newFormations);
    if (onUpdate) onUpdate(newFormations);
  };

  const updateFormation = (id, field, value) => {
    const newFormations = formations.map(f => {
      if (f.id === id) {
        let updatedValue = value;

        // Validation de la date de fin côté code
        if (field === "end_date" && f.start_date && value && value < f.start_date) {
          updatedValue = f.start_date; // empêche la date de fin avant la date de début
        }

        if (field === "start_date" && f.end_date && value && value > f.end_date) {
          updatedValue = f.end_date; // empêche la date de début après la date de fin
        }

        return { ...f, [field]: updatedValue };
      }
      return f;
    });

    setFormations(newFormations);

    if (onUpdateItem) {
      const updatedFormation = newFormations.find(f => f.id === id);
      onUpdateItem('formations', id, updatedFormation);
    }
    if (onUpdate) onUpdate(newFormations);
  };

  const removeFormation = (id) => {
    const newFormations = formations.filter(f => f.id !== id);
    setFormations(newFormations);
    if (onUpdate) onUpdate(newFormations);
  };

  return (
    <div className="space-y-6">
      {formations.map((formation) => (
        <div key={formation.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Formation
            </h3>
            <button
              type="button"
              onClick={() => removeFormation(formation.id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diplôme / Formation *
              </label>
              <input
                type="text"
                value={formation.degree_name}
                onChange={(e) => updateFormation(formation.id, 'degree_name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Master en Informatique"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Établissement *
              </label>
              <input
                type="text"
                value={formation.institution}
                onChange={(e) => updateFormation(formation.id, 'institution', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Université Paris-Saclay"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de début *
                </label>
                <input
                  type="date"
                  value={formation.start_date}
                  onChange={(e) => updateFormation(formation.id, 'start_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  max={new Date().toISOString().split('T')[0]} // max aujourd'hui
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={formation.end_date} // <-- on garde juste end_date
                  onChange={(e) => updateFormation(formation.id, 'end_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  min={formation.start_date || undefined} // fin >= début
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addFormation}
        className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
      >
        <Plus size={20} />
        <span className="font-medium">Ajouter une formation</span>
      </button>
    </div>
  );
};

export default FormationForm;
