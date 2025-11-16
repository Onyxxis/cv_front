import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import FormationForm from './forms/FormationForm';
import CompetenceForm from './forms/CompetenceForm';
import ProjetForm from './forms/ProjetForm';
import LangueForm from './forms/LangueForm';
import CertificationForm from './forms/CertificationForm';

const CVForm = ({ section, data, updateData, updateItem, removeItem }) => {
  const renderForm = () => {
    switch (section) {
      case 'informations_personnelles':
        return (
          <PersonalInfoForm
            data={data}
            onUpdate={updateData}
          />
        );
      case 'experiences':
        return (
          <ExperienceForm
            data={data}
            onUpdate={updateData}
            onUpdateItem={updateItem}
            onRemoveItem={removeItem}
          />
        );
      case 'formations':
        return (
          <FormationForm
            data={data}
            onUpdate={updateData}
            onUpdateItem={updateItem}
            onRemoveItem={removeItem}
          />
        );
      case 'competences':
        return (
          <CompetenceForm
            data={data}
            onUpdate={updateData}
          />
        );
      case 'projets':
        return (
          <ProjetForm
            data={data}
            onUpdate={updateData}
            onUpdateItem={updateItem}
            onRemoveItem={removeItem}
          />
        );
      case 'langues':
        return (
          <LangueForm
            data={data}
            onUpdate={updateData}
            onUpdateItem={updateItem}
            onRemoveItem={removeItem}
          />
        );
      case 'certifications':
        return (
          <CertificationForm
            data={data}
            onUpdate={updateData}
            onUpdateItem={updateItem}
            onRemoveItem={removeItem}
          />
        );
      default:
        return <div>Section non reconnue</div>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {getSectionTitle(section)}
        </h2>
        <p className="text-gray-600">
          {getSectionDescription(section)}
        </p>
      </div>

      {renderForm()}

      <div className="mt-4 mb-6 pt-6 ">
        <button className="bg-blue-500 text-white px-8 py-3 rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 font-medium">
          Enregistrer et continuer
        </button>
      </div>
    </div>
  );
};

const getSectionTitle = (section) => {
  const titles = {
    informations_personnelles: 'Informations Personnelles',
    experiences: 'Expériences Professionnelles',
    formations: 'Formations',
    competences: 'Compétences',
    projets: 'Projets',
    langues: 'Langues',
    certifications: 'Certifications'
  };
  return titles[section] || section;
};

const getSectionDescription = (section) => {
  const descriptions = {
    informations_personnelles: 'Renseignez vos informations de base pour votre CV',
    experiences: 'Ajoutez vos expériences professionnelles',
    formations: 'Indiquez vos formations et diplômes',
    competences: 'Listez vos compétences techniques et professionnelles',
    projets: 'Présentez vos projets personnels ou professionnels',
    langues: 'Indiquez les langues que vous maîtrisez',
    certifications: 'Ajoutez vos certifications et attestations'
  };
  return descriptions[section] || 'Remplissez cette section';
};

export default CVForm;

