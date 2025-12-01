import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Offres = () => {
    const navigate = useNavigate();
  
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Freemium",
      price: "Gratuit",
      description: "Idéal pour tester l'outil et découvrir nos fonctionnalités",
      buttonText: "Commencer Gratuitement",
      buttonVariant: "outline",
      popular: false,
      features: [
        { text: "Génération de CV ATS-friendly", included: true, limited: "(limité à 1-2 CV)" },
        { text: "Choix limité de templates", included: true },
        { text: "Version PDF uniquement", included: true },
        { text: "Analyse ATS de base", included: true, details: "(score + recommandations générales)" },
        { text: "Stockage limité sur le profil", included: true },
        { text: "Génération illimitée de CV", included: false },
        { text: "Tous les templates disponibles", included: false },
        { text: "Profil digital interactif", included: false },
        { text: "Analyse ATS avancée", included: false },
        { text: "Historique complet et suivi", included: false },
        { text: "Optimisation par offre d'emploi", included: false },
      ]
    },
    {
      name: "Premium",
      price: isAnnual ? "5000fcfa/mois" : "3500fcfa/mois",
      description: "Parfait pour étudiants, jeunes pros et professionnels en reconversion",
      buttonText: "Passer au Premium",
      buttonVariant: "primary",
      popular: true,
      features: [
        { text: "Génération de CV ATS-friendly", included: true, unlimited: true },
        { text: "Choix limité de templates", included: false },
        { text: "Version PDF uniquement", included: false },
        { text: "Analyse ATS de base", included: false },
        { text: "Stockage limité sur le profil", included: false },
        { text: "Génération illimitée de CV", included: true },
        { text: "Tous les templates disponibles", included: true },
        { text: "Profil digital interactif", included: true },
        { text: "Analyse ATS avancée", included: true, details: "(recommandations détaillées)" },
        { text: "Historique complet et suivi", included: true },
        { text: "Optimisation par offre d'emploi", included: true },
        { text: "Priorité sur nouvelles fonctionnalités", included: true },
        { text: "Relier CV au profil KAUZA", included: true },
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent mb-4">
            Choisissez votre formule
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions adaptées à tous les besoins, de l'essai gratuit à l'expertise professionnelle
          </p>
        </div>

        {/* Billing Toggle - Only for Premium */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-1 border border-gray-200">
            <div className="flex items-center space-x-4">
              <span className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                !isAnnual 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md' 
                  : 'text-gray-600'
              }`}>
                Mensuel
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-300 ${
                  isAnnual ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
              <span className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isAnnual 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md' 
                  : 'text-gray-600'
              }`}>
                Annuel
                <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  -30%
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 ${
                plan.popular 
                  ? 'border-blue-500 scale-105' 
                  : 'border-gray-100'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Le Plus Populaire
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {isAnnual && plan.name === "Premium" && (
                      <span className="text-sm text-gray-500 ml-2">/mois</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 mb-8 ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {plan.buttonText}
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        feature.included 
                          ? plan.popular 
                            ? 'bg-blue-50 border border-blue-100' 
                            : 'bg-gray-50 border border-gray-100'
                          : 'opacity-50'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.included
                          ? plan.popular
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-400 text-white'
                          : 'bg-red-100 text-red-500'
                      }`}>
                        {feature.included ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium ${
                          feature.included ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {feature.text}
                        </span>
                        {feature.limited && (
                          <span className="text-sm text-gray-500 ml-1">{feature.limited}</span>
                        )}
                        {feature.unlimited && (
                          <span className="text-sm text-green-600 font-medium ml-1">(Illimité)</span>
                        )}
                        {feature.details && (
                          <span className="text-sm text-gray-500 ml-1">{feature.details}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Premium Info */}
                {plan.popular && isAnnual && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-center space-x-2 text-green-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">Économisez 30% avec l'abonnement annuel</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Questions fréquentes</h3>
            <div className="space-y-4 text-left">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Puis-je changer de formule à tout moment ?</h4>
                <p className="text-gray-600">Oui, vous pouvez passer du Freemium au Premium à tout moment, et vice versa.</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Y a-t-il un engagement ?</h4>
                <p className="text-gray-600">Aucun engagement avec la formule Freemium. Le Premium peut être résilié à tout moment.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Quels moyens de paiement acceptez-vous ?</h4>
                <p className="text-gray-600">Nous acceptons les moyens de payement local comme flooz ou mix by yass, et virements bancaires.</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <div className="flex flex-col py-22 sm:flex-row gap-4 justify-center items-center">
          <button 
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-blue-600 to-pink-800 text-white font-semibold text-base px-6 py-3 rounded-lg hover:from-blue-700 hover:to-pink-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               </svg>
              Essayer maintenant
            </span>
          </button>

           
        </div>
    </section>
  );
};

export default Offres;