import React from "react";
import hero from "../../assets/hero.png";

const Hero = () => {
  return (
    <div className="min-h-[120vh] mt-4 bg-white flex flex-col items-center justify-center px-2 sm:px-6 lg:px-8 relative overflow-hidden">

       <div className="absolute top-0 left-0 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

       <div className="max-w-3xl mx-auto text-center relative z-10 pt-20">

         <div className="mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-blue-800 text-white text-xs font-medium px-4 py-2 rounded-full shadow-md">
            Adoptez notre outil de création de CV ATS-Friendly
          </span>
        </div>

         <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
          Créez des CV ATS-Friendly simplement avec
          <span className="bg-gradient-to-r from-blue-50 to-pink-50 text-black font-medium px-2  rounded-full">
            KAUZA'CV
          </span>
        </h1>

         <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10">
          KAUZA-CV génère des CV optimisés pour les recruteurs (ATS) et propose
          des conseils IA pour rendre vos candidatures visibles et percutantes.
          Commencez dès maintenant et boostez vos chances de succès professionnel.
        </p>

        {/* Bouton CTA avec nouvelle icône */}
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-base px-10 py-5 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span className="flex items-center justify-center gap-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Commencer dès maintenant
            </span>
          </button>
        </div>

        {/* Indicateur de défilement */}
        <div className="mt-20 mb-2 animate-bounce">
          <svg
            className="w-6 h-6 text-blue-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

      </div>

      {/* Image agrandie en bas */}
      <div className="relative w-full flex justify-center mt-6 mb-10 pb-10">
        <img
          src={hero}
          alt="Illustration"
          className="w-[95%] md:w-[85%] lg:w-[70%] max-h-[700px] object-contain"
        />
      </div>

      {/* Animation des blobs */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
