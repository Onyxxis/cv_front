import { useState, useEffect } from 'react';
import { Trash2, Plus, Star } from 'lucide-react';

const CompetenceForm = ({ data, onUpdate }) => {
  const [competences, setCompetences] = useState(data || []);
  const [newCompetence, setNewCompetence] = useState('');

  useEffect(() => {
    setCompetences(data || []);
  }, [data]);
  

  // const addCompetence = () => {
  //   if (newCompetence.trim() && !competences.includes(newCompetence.trim())) {
  //     const newCompetences = [...competences, newCompetence.trim()];
  //     setCompetences(newCompetences);
  //     onUpdate(newCompetences);
  //     setNewCompetence('');
  //   }
  // };

  // const removeCompetence = (index) => {
  //   const newCompetences = competences.filter((_, i) => i !== index);
  //   setCompetences(newCompetences);
  //   onUpdate(newCompetences);
  // };

  const addCompetence = () => {
    if (newCompetence.trim() && !competences.some(c => c.name === newCompetence.trim())) {
      const newCompetenceObj = { name: newCompetence.trim() };
      const newCompetences = [...competences, newCompetenceObj];
      setCompetences(newCompetences);
      onUpdate(newCompetences);
      setNewCompetence('');
    }
  };

  const removeCompetence = (index) => {
    const newCompetences = competences.filter((_, i) => i !== index);
    setCompetences(newCompetences);
    onUpdate(newCompetences);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCompetence();
    }
  };

  return (
    <div className="space-y-6">
      {/* Ajout de nouvelle compétence */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Ajouter une compétence
        </h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={newCompetence}
            onChange={(e) => setNewCompetence(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Ex: React, Python, Gestion de projet..."
          />
          <button
            onClick={addCompetence}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 font-medium flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Ajouter</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Appuyez sur Entrée ou cliquez sur Ajouter pour insérer la compétence
        </p>
      </div>

      {/* Liste des compétences */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Mes Compétences ({competences.length})
        </h3>

        {competences.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Star size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Aucune compétence ajoutée pour le moment</p>
            <p className="text-sm">Commencez par ajouter vos compétences ci-dessus</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {competences.map((competence, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl group hover:bg-blue-100 transition-all duration-300"
              >
                <span className="font-medium text-blue-800">{competence.name}</span>
                <button
                  onClick={() => removeCompetence(index)}
                  className="text-red-400 hover:text-red-600 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggestions de compétences */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Suggestions de compétences</h4>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'React', 'Node.js', 'Python', 'Git', 'MySQL', 'TypeScript', 'TailwindCSS', 'AWS', 'Docker'].map((skill) => (
            <button
              key={skill}
              onClick={() => {
                setNewCompetence(skill);
                addCompetence();
              }}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetenceForm;