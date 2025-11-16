import { useState, useEffect } from "react";
import { Trash2, Plus, Link, Calendar } from "lucide-react";

const CertificationForm = ({ data = [], onUpdate }) => {
  const [certifications, setCertifications] = useState(data);

  // 🌀 Synchronisation avec le parent si data change
  useEffect(() => {
    setCertifications(data || []);
  }, [data]);

  // 🧩 Conversion vers format backend
  // const toBackendFormat = (certList) =>
  //   certList.map((cert) => ({
  //     title: cert.titre?.trim() || "",
  //     organization: cert.organisation?.trim() || "",
  //     date_obtained: cert.date_obtention || "",
  //     url: cert.url?.trim() || "",
  //   })
  // );

  // 🔁 Met à jour le state + notifie le parent
  const sync = (newCerts) => {
    setCertifications(newCerts);
    // onUpdate(toBackendFormat(newCerts));
    onUpdate(newCerts);

  };

  // ➕ Ajout d'une certification
  const addCertification = () => {
    const newCert = {
      titre: "",
      organisation: "",
      date_obtention: "",
      url: "",
    };
    sync([...certifications, newCert]);
  };

  // ✏️ Mise à jour d’un champ
  const updateCertification = (index, field, value) => {
    const updated = certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    sync(updated);
  };

  // ❌ Suppression d'une certification
  const removeCertification = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    sync(updated);
  };

  // 💡 Ajout rapide à partir d'une suggestion
  const addFromSuggestion = (titre, organisation) => {
    const newCert = {
      titre,
      organisation,
      date_obtention: "",
      url: "",
    };
    sync([...certifications, newCert]);
  };

  return (
    <div className="space-y-6">
      {/* Liste des certifications */}
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="bg-gray-50 p-6 rounded-xl border border-gray-200"
        >
          {/* En-tête */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Certification {index + 1}
            </h3>
            <button
              onClick={() => removeCertification(index)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>

          {/* Champs du formulaire */}
          <div className="space-y-4">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la certification *
              </label>
              <input
                type="text"
                value={cert.titre}
                onChange={(e) =>
                  updateCertification(index, "titre", e.target.value)
                }
                placeholder="AWS Certified Solutions Architect"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Organisation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organisation *
              </label>
              <input
                type="text"
                value={cert.organisation}
                onChange={(e) =>
                  updateCertification(index, "organisation", e.target.value)
                }
                placeholder="Amazon Web Services"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Date d’obtention */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date d'obtention *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  value={cert.date_obtention}
                  onChange={(e) =>
                    updateCertification(index, "date_obtention", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lien de vérification
              </label>
              <div className="relative">
                <Link
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="url"
                  value={cert.url}
                  onChange={(e) =>
                    updateCertification(index, "url", e.target.value)
                  }
                  placeholder="https://www.credly.com/badges/..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Aperçu rapide */}
            {(cert.titre || cert.organisation) && (
              <div className="bg-white p-4 rounded-lg border-2 border-blue-200 mt-4">
                <h4 className="font-bold text-blue-800 text-lg mb-1">
                  {cert.titre || "Titre de certification"}
                </h4>
                <p className="text-sm text-gray-600">
                  <strong>Organisation:</strong>{" "}
                  {cert.organisation || "Non spécifiée"}
                </p>
                {cert.date_obtention && (
                  <p className="text-sm text-gray-600">
                    <strong>Obtenue le:</strong>{" "}
                    {new Date(cert.date_obtention).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Bouton d’ajout */}
      <button
        onClick={addCertification}
        className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all"
      >
        <Plus size={20} />
        <span className="font-medium">Ajouter une certification</span>
      </button>

      {/* Suggestions de certifications populaires */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">
          Certifications populaires
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              titre: "AWS Certified Solutions Architect",
              org: "Amazon Web Services",
            },
            {
              titre: "Google Professional Cloud Architect",
              org: "Google Cloud",
            },
            {
              titre: "Microsoft Certified: Azure Fundamentals",
              org: "Microsoft",
            },
            { titre: "Scrum Master Certified", org: "Scrum Alliance" },
            { titre: "Project Management Professional", org: "PMI" },
            { titre: "TOEIC", org: "ETSou" },
          ].map((cert, i) => (
            <button
              key={i}
              onClick={() => addFromSuggestion(cert.titre, cert.org)}
              className="text-left p-3 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <div className="font-medium text-gray-800 text-sm">
                {cert.titre}
              </div>
              <div className="text-xs text-gray-600">{cert.org}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationForm;
