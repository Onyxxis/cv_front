// import { useState, useEffect } from 'react';
// import { Trash2, Plus, Link, Github } from 'lucide-react';

// const ProjetForm = ({ data, onUpdate, onUpdateItem, onRemoveItem }) => {
//   const [projets, setProjets] = useState(data || []);

//   useEffect(() => {
//     setProjets(data || []);
//   }, [data]);

//   const addProjet = () => {
//     const newProjet = {
//       nom_projet: "",
//       description: "",
//       start_date: "",
//       end_date: "",
//       technologies: "",
//       lien: ""
//     };
//     const newProjets = [...projets, newProjet];
//     setProjets(newProjets);
//     onUpdate(newProjets);
//   };

//   const updateProjet = (index, field, value) => {
//     const newProjets = projets.map((projet, i) =>
//       i === index ? { ...projet, [field]: value } : projet
//     );
//     setProjets(newProjets);
//     onUpdateItem('projets', index, newProjets[index]);
//   };

//   const removeProjet = (index) => {
//     const newProjets = projets.filter((_, i) => i !== index);
//     setProjets(newProjets);
//     onRemoveItem('projets', index);
//   };

//   return (
//     <div className="space-y-6">
//       {projets.map((projet, index) => (
//         <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">
//               Projet {index + 1}
//             </h3>
//             <button
//               onClick={() => removeProjet(index)}
//               className="text-red-500 hover:text-red-700 transition-colors duration-300"
//             >
//               <Trash2 size={20} />
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Nom du projet *
//               </label>
//               <input
//                 type="text"
//                 value={projet.nom_projet}
//                 onChange={(e) => updateProjet(index, 'nom_projet', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                 placeholder="Application de gestion de tâches"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 value={projet.description}
//                 onChange={(e) => updateProjet(index, 'description', e.target.value)}
//                 rows={3}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                 placeholder="Décrivez le projet, ses objectifs et fonctionnalités..."
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Date de début
//                 </label>
//                 <input
//                   type="month"
//                   value={projet.start_date}
//                   onChange={(e) => updateProjet(index, 'start_date', e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Date de fin
//                 </label>
//                 <input
//                   type="month"
//                   value={projet.end_date}
//                   onChange={(e) => updateProjet(index, 'end_date', e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                   placeholder="En cours"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Technologies utilisées
//               </label>
//               <input
//                 type="text"
//                 value={projet.technologies}
//                 onChange={(e) => updateProjet(index, 'technologies', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                 placeholder="React, Node.js, MongoDB, TailwindCSS"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Lien (URL)
//               </label>
//               <div className="flex space-x-3">
//                 <div className="flex-1 relative">
//                   <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input
//                     type="url"
//                     value={projet.lien}
//                     onChange={(e) => updateProjet(index, 'lien', e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                     placeholder="https://mon-projet.com"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={addProjet}
//         className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
//       >
//         <Plus size={20} />
//         <span className="font-medium">Ajouter un projet</span>
//       </button>
//     </div>
//   );
// };

// export default ProjetForm;



import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

const ProjetForm = ({ data, onUpdate, onUpdateItem, onRemoveItem }) => {
  const [projets, setProjets] = useState(data || []);

  useEffect(() => {
    setProjets(data || []);
  }, [data]);

  const today = new Date().toISOString().split('T')[0];

  const emitUpdate = (updatedProjets) => {
    // ✅ Format exact attendu par le backend
    const filtered = updatedProjets.map(({ name, description, start_date, end_date }) => ({
      name: name || "",
      description: description || "",
      start_date: start_date || "",
      end_date: end_date || ""
    }));
    if (onUpdate) onUpdate(filtered);
  };

  const addProjet = () => {
    const newProjet = {
      name: "",
      description: "",
      start_date: "",
      end_date: ""
    };
    const newProjets = [...projets, newProjet];
    setProjets(newProjets);
    emitUpdate(newProjets);
  };

  const updateProjet = (index, field, value) => {
    const newProjets = projets.map((projet, i) => {
      if (i === index) {
        let updatedValue = value;

        // ✅ Empêche une date de fin avant la date de début
        if (field === "end_date" && projet.start_date && value && value < projet.start_date) {
          updatedValue = projet.start_date;
        }

        return { ...projet, [field]: updatedValue };
      }
      return projet;
    });

    setProjets(newProjets);
    emitUpdate(newProjets);

    if (onUpdateItem) {
      const { name, description, start_date, end_date } = newProjets[index];
      onUpdateItem("projects", index, { name, description, start_date, end_date });
    }
  };

  const removeProjet = (index) => {
    const newProjets = projets.filter((_, i) => i !== index);
    setProjets(newProjets);
    emitUpdate(newProjets);

    if (onRemoveItem) onRemoveItem("projects", index);
  };

  return (
    <div className="space-y-6">
      {projets.map((projet, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          {/* --- Titre et bouton supprimer --- */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Projet {index + 1}
            </h3>
            <button
              onClick={() => removeProjet(index)}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              <Trash2 size={20} />
            </button>
          </div>

          {/* --- Champs du projet --- */}
          <div className="space-y-4">
            {/* Nom du projet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du projet *
              </label>
              <input
                type="text"
                value={projet.name}
                onChange={(e) => updateProjet(index, 'name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Application de gestion de tâches"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={projet.description}
                onChange={(e) => updateProjet(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Décrivez le projet, ses objectifs et fonctionnalités..."
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              {/* Date de début */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  value={projet.start_date}
                  onChange={(e) => updateProjet(index, 'start_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  max={today}
                />
              </div>

              {/* Date de fin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={projet.end_date}
                  onChange={(e) => updateProjet(index, 'end_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  min={projet.start_date || ""}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* --- Bouton Ajouter --- */}
      <button
        onClick={addProjet}
        className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
      >
        <Plus size={20} />
        <span className="font-medium">Ajouter un projet</span>
      </button>
    </div>
  );
};

export default ProjetForm;
