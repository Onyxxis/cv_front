 
import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";

const LangueForm = ({ data = [], onUpdate }) => {
  const [langues, setLangues] = useState(
    data.length > 0
      ? data
      : [
          {
            nom: "",
            nom_custom: "",
            niveau: "debutant",
          },
        ]
  );

  useEffect(() => {
    if (data && data.length > 0) setLangues(data);
  }, [data]);

  // ✅ Envoi des données normalisées au parent
  const emitUpdate = (updatedLangues) => {
    const filtered = updatedLangues
      .filter((l) =>
        l.nom === "Autre" ? l.nom_custom.trim() : l.nom.trim()
      )
      .map(({ nom, nom_custom, niveau }) => ({
        name: nom === "Autre" ? nom_custom.trim() : nom.trim(),
        level: convertLevelToEnglish(niveau),
      }));
    if (onUpdate) onUpdate(filtered);
  };

  const convertLevelToEnglish = (niveau) => {
    const map = {
      debutant: "Debutant",
      intermediaire: "Intermediaire",
      courant: "Courant",
      avance: "Avance",
      bilingue: "Bilingue",
    };
    return map[niveau] || "Debutant";
  };

  // Ajout d’une nouvelle langue
  const addLangue = () => {
    const newLangues = [
      ...langues,
      { nom: "", nom_custom: "", niveau: "debutant" },
    ];
    setLangues(newLangues);
    emitUpdate(newLangues);
  };

  // Mise à jour d’un champ
  const updateLangue = (index, field, value) => {
    const newLangues = langues.map((langue, i) =>
      i === index ? { ...langue, [field]: value } : langue
    );
    setLangues(newLangues);
    emitUpdate(newLangues);
  };

  // Suppression d’une langue
  const removeLangue = (index) => {
    const newLangues = langues.filter((_, i) => i !== index);
    setLangues(newLangues.length ? newLangues : [
      { nom: "", nom_custom: "", niveau: "debutant" },
    ]);
    emitUpdate(newLangues);
  };

  // Apparence du niveau
  const getNiveauText = (niveau) => {
    const niveaux = {
      debutant: "Débutant",
      intermediaire: "Intermédiaire",
      courant: "Courant",
      avance: "Avancé",
      bilingue: "Bilingue",
    };
    return niveaux[niveau] || niveau;
  };

  const getNiveauColor = (niveau) => {
    const colors = {
      debutant: "bg-red-100 text-red-800",
      intermediaire: "bg-orange-100 text-orange-800",
      courant: "bg-yellow-100 text-yellow-800",
      avance: "bg-green-100 text-green-800",
      bilingue: "bg-blue-100 text-blue-800",
    };
    return colors[niveau] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {langues.map((langue, index) => (
        <div
          key={index}
          className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Langue {index + 1}
            </h3>
            {langues.length > 1 && (
              <button
                onClick={() => removeLangue(index)}
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Sélecteur de langue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Langue *
              </label>
              <select
                value={langue.nom}
                onChange={(e) => updateLangue(index, "nom", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">-- Sélectionnez une langue --</option>
                <option value="Français">Français</option>
                <option value="Anglais">Anglais</option>
                <option value="Espagnol">Espagnol</option>
                <option value="Allemand">Allemand</option>
                <option value="Italien">Italien</option>
                <option value="Chinois">Chinois</option>
                <option value="Arabe">Arabe</option>
                <option value="Portugais">Portugais</option>
                <option value="Russe">Russe</option>
                <option value="Japonais">Japonais</option>
                <option value="Néerlandais">Néerlandais</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Si "Autre", champ personnalisé */}
            {langue.nom === "Autre" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom personnalisé
                </label>
                <input
                  type="text"
                  value={langue.nom_custom}
                  onChange={(e) =>
                    updateLangue(index, "nom_custom", e.target.value)
                  }
                  placeholder="Entrez le nom de la langue"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            )}

            {/* Niveau */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau *
              </label>
              <select
                value={langue.niveau}
                onChange={(e) => updateLangue(index, "niveau", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="debutant">Débutant (A1-A2)</option>
                <option value="intermediaire">Intermédiaire (B1-B2)</option>
                <option value="courant">Courant (C1)</option>
                <option value="avance">Avancé (C2)</option>
                <option value="bilingue">Bilingue / Natif</option>
              </select>
            </div>

            {/* Aperçu */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">
                  {langue.nom === "Autre"
                    ? langue.nom_custom || "Langue personnalisée"
                    : langue.nom || "Langue non définie"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getNiveauColor(
                    langue.niveau
                  )}`}
                >
                  {getNiveauText(langue.niveau)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    langue.niveau === "debutant"
                      ? "bg-red-500 w-1/5"
                      : langue.niveau === "intermediaire"
                      ? "bg-orange-500 w-2/5"
                      : langue.niveau === "courant"
                      ? "bg-yellow-500 w-3/5"
                      : langue.niveau === "avance"
                      ? "bg-green-500 w-4/5"
                      : "bg-blue-500 w-full"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Bouton Ajouter */}
      <button
        onClick={addLangue}
        className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
      >
        <Plus size={20} />
        <span className="font-medium">Ajouter une langue</span>
      </button>

      {/* Légende des niveaux */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-3">
          Échelle des niveaux linguistiques
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>🟥 Débutant (A1-A2) : notions de base</li>
          <li>🟧 Intermédiaire (B1-B2) : conversation autonome</li>
          <li>🟨 Courant (C1) : usage professionnel</li>
          <li>🟩 Avancé (C2) : maîtrise complète</li>
          <li>🟦 Bilingue : niveau natif</li>
        </ul>
      </div>
    </div>
  );
};

export default LangueForm;




// import { useState, useEffect } from 'react';
// import { Trash2, Plus } from 'lucide-react';

// const LangueForm = ({ data, onUpdate, onUpdateItem, onRemoveItem }) => {
//   const [langues, setLangues] = useState(data || []);

//   useEffect(() => {
//     setLangues(data || []);
//   }, [data]);

//   const addLangue = () => {
//     const newLangue = {
//       nom: "",
//       niveau: "debutant",
//       nom_custom: ""
//     };
//     const newLangues = [...langues, newLangue];
//     setLangues(newLangues);

//     if (onUpdate) {
//       const filtered = newLangues.map(({ nom, nom_custom, niveau }) => ({
//         name: nom === "Autre" ? nom_custom : nom,
//         level: niveau
//       }));
//       onUpdate(filtered);
//     }
//   };

//   const updateLangue = (index, field, value) => {
//     const newLangues = langues.map((langue, i) =>
//       i === index ? { ...langue, [field]: value } : langue
//     );
//     setLangues(newLangues);

//     if (onUpdateItem) {
//       const { nom, nom_custom, niveau } = newLangues[index];
//       onUpdateItem('langues', index, {
//         name: nom === "Autre" ? nom_custom : nom,
//         level: niveau
//       });
//     }
//   };

//   const removeLangue = (index) => {
//     const newLangues = langues.filter((_, i) => i !== index);
//     setLangues(newLangues);
//     if (onRemoveItem) {
//       onRemoveItem('langues', index);
//     }
//   };

//   const getNiveauText = (niveau) => {
//     const niveaux = {
//       debutant: "Débutant",
//       intermediaire: "Intermédiaire",
//       courant: "Courant",
//       avance: "Avancé",
//       bilingue: "Bilingue"
//     };
//     return niveaux[niveau] || niveau;
//   };

//   const getNiveauColor = (niveau) => {
//     const colors = {
//       debutant: "bg-red-100 text-red-800",
//       intermediaire: "bg-orange-100 text-orange-800",
//       courant: "bg-yellow-100 text-yellow-800",
//       avance: "bg-green-100 text-green-800",
//       bilingue: "bg-blue-100 text-blue-800"
//     };
//     return colors[niveau] || "bg-gray-100 text-gray-800";
//   };

//   const getBarWidth = (niveau) => {
//     switch (niveau) {
//       case 'debutant': return '20%';
//       case 'intermediaire': return '40%';
//       case 'courant': return '60%';
//       case 'avance': return '80%';
//       case 'bilingue': return '100%';
//       default: return '0%';
//     }
//   };

//   const getBarColor = (niveau) => {
//     switch (niveau) {
//       case 'debutant': return 'bg-red-500';
//       case 'intermediaire': return 'bg-orange-500';
//       case 'courant': return 'bg-yellow-500';
//       case 'avance': return 'bg-green-500';
//       case 'bilingue': return 'bg-blue-500';
//       default: return 'bg-gray-400';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {langues.map((langue, index) => (
//         <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">
//               Langue {index + 1}
//             </h3>
//             <button
//               onClick={() => removeLangue(index)}
//               className="text-red-500 hover:text-red-700 transition-colors duration-300"
//             >
//               <Trash2 size={20} />
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Langue *
//               </label>
//               <select
//                 value={langue.nom}
//                 onChange={(e) => updateLangue(index, 'nom', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//               >
//                 <option value="">Sélectionnez une langue</option>
//                 <option value="Français">Français</option>
//                 <option value="Anglais">Anglais</option>
//                 <option value="Espagnol">Espagnol</option>
//                 <option value="Allemand">Allemand</option>
//                 <option value="Italien">Italien</option>
//                 <option value="Chinois">Chinois</option>
//                 <option value="Arabe">Arabe</option>
//                 <option value="Portugais">Portugais</option>
//                 <option value="Russe">Russe</option>
//                 <option value="Japonais">Japonais</option>
//                 <option value="Néerlandais">Néerlandais</option>
//                 <option value="Autre">Autre</option>
//               </select>
//             </div>

//             {langue.nom === "Autre" && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Nom de la langue
//                 </label>
//                 <input
//                   type="text"
//                   value={langue.nom_custom}
//                   onChange={(e) => updateLangue(index, 'nom_custom', e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                   placeholder="Entrez le nom de la langue"
//                 />
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Niveau *
//               </label>
//               <select
//                 value={langue.niveau}
//                 onChange={(e) => updateLangue(index, 'niveau', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//               >
//                 <option value="debutant">Débutant (A1-A2)</option>
//                 <option value="intermediaire">Intermédiaire (B1-B2)</option>
//                 <option value="courant">Courant (C1)</option>
//                 <option value="avance">Avancé (C2)</option>
//                 <option value="bilingue">Bilingue / Natif</option>
//               </select>
//             </div>

//             {/* Aperçu du niveau */}
//             <div className="bg-white p-4 rounded-lg border">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="font-medium text-gray-700">
//                   {langue.nom_custom || langue.nom || "Langue"}
//                 </span>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getNiveauColor(langue.niveau)}`}>
//                   {getNiveauText(langue.niveau)}
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className={`h-2 rounded-full transition-all duration-500 ${getBarColor(langue.niveau)}`}
//                   style={{ width: getBarWidth(langue.niveau) }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={addLangue}
//         className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
//       >
//         <Plus size={20} />
//         <span className="font-medium">Ajouter une langue</span>
//       </button>

//       {/* Légende des niveaux */}
//       <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
//         <h4 className="font-medium text-blue-800 mb-3">Échelle des niveaux linguistiques</h4>
//         <div className="space-y-2 text-sm text-blue-700">
//           <div className="flex items-center justify-between">
//             <span>Débutant (A1-A2):</span>
//             <span>Notions de base, communication simple</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span>Intermédiaire (B1-B2):</span>
//             <span>Conversations courantes, autonomie</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span>Courant (C1):</span>
//             <span>Expression fluide, usage professionnel</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span>Avancé (C2):</span>
//             <span>Maîtrise complète, niveau expert</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span>Bilingue:</span>
//             <span>Niveau natif ou équivalent</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LangueForm;
