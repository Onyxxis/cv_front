import React, { useState, useRef, useEffect } from 'react';

const Fonctionnalite = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      id: 1,
      title: "Téléverse ou crée ton CV",
      description: "Choisis entre téléverser ton CV existant ou créer ton CV de zéro grâce à notre formulaire intelligent guidé.",
      features: [
        "Analyse automatique de ton CV existant",
        "Détection des erreurs et pré-remplissage",
        "Formulaire guidé étape par étape"
      ],
      gradient: "from-blue-500 to-cyan-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      illustration: (
        <div className="relative">
          <div className="w-20 h-24 bg-white rounded-lg shadow-lg transform rotate-3 border-2 border-blue-200"></div>
          <div className="absolute top-2 left-2 w-16 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded transform -rotate-3"></div>
          <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="absolute top-4 left-8 w-8 h-1 bg-blue-300 rounded"></div>
          <div className="absolute top-8 left-4 w-10 h-1 bg-blue-200 rounded"></div>
          <div className="absolute top-10 left-4 w-8 h-1 bg-blue-200 rounded"></div>
        </div>
      )
    },
    {
      id: 2,
      title: "Laisse l'IA analyser ton CV",
      description: "Notre moteur d'analyse ATS vérifie ton CV comme le ferait un recruteur automatique.",
      features: [
        "Score de compatibilité ATS en temps réel",
        "Recommandations concrètes pour t'améliorer",
        "Analyse de structure et de lisibilité"
      ],
      gradient: "from-purple-500 to-pink-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      illustration: (
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Choisis ton template et génère",
      description: "Personnalise ton design parmi nos modèles ATS-friendly optimisés.",
      features: [
        "Modèles ATS-friendly optimisés",
        "Téléchargement en PDF professionnel",
        "Profil digital interactif"
      ],
      gradient: "from-green-500 to-emerald-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      illustration: (
        <div className="relative">
          <div className="w-20 h-16 bg-white rounded-lg shadow-lg border-2 border-green-200 transform rotate-2">
            <div className="absolute top-2 left-2 right-2 h-2 bg-green-100 rounded"></div>
            <div className="absolute top-6 left-2 w-12 h-1 bg-green-200 rounded"></div>
            <div className="absolute top-8 left-2 w-8 h-1 bg-green-200 rounded"></div>
            <div className="absolute top-10 left-2 w-10 h-1 bg-green-200 rounded"></div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg transform -rotate-6 shadow-md"></div>
        </div>
      )
    },
    {
      id: 4,
      title: "Optimise pour une offre d'emploi",
      description: "Téléverse une annonce et obtiens des suggestions pour maximiser ton score.",
      features: [
        "Analyse d'offre d'emploi intelligente",
        "Suggestions de mots-clés pertinents",
        "Optimisation ciblée pour chaque poste"
      ],
      gradient: "from-orange-500 to-red-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      illustration: (
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-orange-500"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full border-2 border-red-500"></div>
        </div>
      )
    }
  ];

  return (
    <section ref={sectionRef} className=" bg-white overflow-hidden">
      
         
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-4">
            Transformez votre CV en atout
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quatre étapes simples pour un CV parfaitement optimisé et prêt à impressionner
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Étape {step.id}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    {step.illustration}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                {/* Features */}
                <div className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-gray-700">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient}`}></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect Line */}
              <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${step.gradient} group-hover:w-full transition-all duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Detailed View */}
        <div className={`bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl border border-gray-100 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Illustration */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center p-6 border border-gray-200">
                  {steps[activeStep].illustration}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${steps[activeStep].gradient} flex items-center justify-center text-white shadow-lg`}>
                    {steps[activeStep].icon}
                  </div>
                  <span className="text-lg font-semibold text-gray-600">Étape {steps[activeStep].id}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  {steps[activeStep].title}
                </h3>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
                  {steps[activeStep].description}
                </p>

                {/* Progress Dots */}
                <div className="flex justify-center lg:justify-start space-x-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeStep 
                          ? `bg-gradient-to-r ${steps[activeStep].gradient} w-8` 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fonctionnalite;