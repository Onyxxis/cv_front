

import { useState, useEffect } from 'react';
import Reform from '../reform';

const PersonalInfoForm = ({ data = {}, onUpdate }) => {
  const defaultData = {
    first_name: "",
    last_name: "",
    birthdate: "",
    gender: "",
    email: "",
    phone: "",
    nationality: "",
    job_title: "",
    description: "",
    link: ""
  };


  const [formData, setFormData] = useState({ ...defaultData, ...data });

  // Mise à jour uniquement si data change réellement
  useEffect(() => {
    setFormData(prev => ({ ...prev, ...data }));
  }, [data]);

  const handleChange = (field, value) => {
    // contrôle spécial pour la date de naissance
    if (field === 'birthdate') {
      const today = new Date().toISOString().split('T')[0];
      if (value > today) value = today;
    }

    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  // Date max pour input type date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Votre prénom"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance *</label>
          <input
            type="date"
            value={formData.birthdate}
            onChange={(e) => handleChange('birthdate', e.target.value)}
            max={today}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Sélectionnez</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Non preciser</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationalité *</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => handleChange('nationality', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Ex: Française"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="email@exemple.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="+33 1 23 45 67 89"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Poste *</label>
          <input
            type="text"
            value={formData.job_title}
            onChange={(e) => handleChange('job_title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Développeur Full Stack"
          />
        </div>
      </div>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description / Profil</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          placeholder="Décrivez votre profil professionnel..."
        />
      </div> */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description / Profil
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
          placeholder="Décrivez votre profil professionnel..."
        />
        <div className="absolute bottom-3 right-3">
          {/* <Reform /> */}
          <Reform
            text={formData.description}
            // context={formData.job_title || "information personnelle"}
            context={`Profil professionnel : ${formData.job_title || "Votre poste"} - Fournis une description complète et engageante de votre profil, incluant vos compétences clés, expériences pertinentes, qualités professionnelles et atouts pour un CV efficace.`}
            onReformulated={(newText) =>
              handleChange('description', newText)
            }
          />
        </div>
      </div>

      <div >
        <label className="block text-sm font-medium text-gray-700 mb-2">Lien (LinkedIn / Portfolio)</label>
        <input
          type="text"
          value={formData.link}
          onChange={(e) => handleChange('link', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          placeholder="https://"
        />
      </div>
      <br />
    </div>
  );
};

export default PersonalInfoForm;
