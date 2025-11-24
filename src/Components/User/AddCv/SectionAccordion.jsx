// // import { motion, AnimatePresence } from 'framer-motion';
// // import { ChevronRight, Plus } from 'lucide-react';

// // const SectionAccordion = ({
// //   section,
// //   isActive,
// //   isOpen,
// //   onToggle,
// //   onSelect,
// //   data,
// //   onAddItem
// // }) => {
// //   const handleClick = () => {
// //     onSelect();
// //     if (!isOpen) onToggle();
// //   };

// //   const handleArrowClick = (e) => {
// //     e.stopPropagation();
// //     onToggle();
// //   };

// //   return (
// //     <div className="mb-2 bg-blue-400/20 rounded-xl overflow-hidden">
// //       <div
// //         className={`p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${isActive
// //             ? 'bg-blue-600 text-white'
// //             : 'bg-blue-500/10 text-white hover:bg-blue-500/20'
// //           }`}
// //         onClick={handleClick}
// //       >
// //         <div className="flex items-center space-x-3">
// //           <span className="text-lg">{section.icon}</span>
// //           <span className="font-medium">{section.title}</span>
// //         </div>
// //         <motion.div
// //           animate={{ rotate: isOpen ? 90 : 0 }}
// //           transition={{ duration: 0.3 }}
// //           className="text-current cursor-pointer"
// //           onClick={handleArrowClick}
// //         >
// //           <ChevronRight size={20} />
// //         </motion.div>
// //       </div>

// //       <AnimatePresence>
// //         {isOpen && (
// //           <motion.div
// //             initial={{ height: 0, opacity: 0 }}
// //             animate={{ height: 'auto', opacity: 1 }}
// //             exit={{ height: 0, opacity: 0 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             <div className="p-3 bg-white/10">
// //               {section.hasItems &&
// //                 Array.isArray(data) &&
// //                 data.map((item, index) => (
// //                   <div
// //                     key={index}
// //                     className="flex items-center justify-between p-2 mb-1 bg-white/20 rounded-lg text-white text-sm hover:bg-white/30 transition-colors cursor-pointer"
// //                     onClick={() => onSelect()}
// //                   >
// //                     <span className="truncate">
// //                       {item.poste ||
// //                         item.nom_diplome ||
// //                         item.nom_projet ||
// //                         item.nom ||
// //                         item.titre ||
// //                         `Élément ${index + 1}`}
// //                     </span>
// //                   </div>
// //                 ))}

// //               {section.hasItems && (
// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     onAddItem();
// //                   }}
// //                   className="w-full flex items-center justify-center space-x-2 p-2 mt-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
// //                 >
// //                   <Plus size={16} />
// //                   <span className="text-sm font-medium">Ajouter</span>
// //                 </button>
// //               )}
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default SectionAccordion;
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronRight, Plus } from 'lucide-react';

// const SectionAccordion = ({
//   section,
//   isActive,
//   isOpen,
//   onToggle,
//   onSelect,
//   data,
//   onAddItem
// }) => {
//   const handleClick = () => {
//     onSelect();
//     if (!isOpen) onToggle();
//   };

//   const handleArrowClick = (e) => {
//     e.stopPropagation();
//     onToggle();
//   };

//   const getItemCount = () => {
//     if (!section.hasItems || !Array.isArray(data)) return 0;
//     return data.filter(item => 
//       Object.values(item).some(val => val !== null && val !== '' && val !== undefined)
//     ).length;
//   };

//   const itemCount = getItemCount();

//   return (
//     <div className="bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300">
//       {/* Header Section */}
//       <div
//         className={`p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${
//           isActive
//             ? 'bg-gradient-to-r from-blue-600/20 to-blue-600/10 border-l-4 border-l-blue-400'
//             : 'bg-slate-800/20 hover:bg-slate-700/30'
//         }`}
//         onClick={handleClick}
//       >
//         <div className="flex items-center space-x-3 flex-1 min-w-0">
//           <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
//             isActive 
//               ? 'bg-blue-500/20 text-blue-300' 
//               : 'bg-slate-700/50 text-slate-300'
//           }`}>
//             {section.icon}
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="font-medium text-white truncate">
//               {section.title}
//             </div>
//             {section.hasItems && (
//               <div className="text-xs text-slate-400">
//                 {itemCount} élément{itemCount !== 1 ? 's' : ''}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center space-x-2">
//           {section.hasItems && itemCount > 0 && (
//             <div className="px-2 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300 font-medium">
//               {itemCount}
//             </div>
//           )}
//           <motion.div
//             animate={{ rotate: isOpen ? 90 : 0 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className={`p-1 rounded-lg transition-colors ${
//               isActive 
//                 ? 'text-blue-300 hover:bg-blue-500/20' 
//                 : 'text-slate-400 hover:bg-slate-700/50'
//             }`}
//             onClick={handleArrowClick}
//           >
//             <ChevronRight size={16} />
//           </motion.div>
//         </div>
//       </div>

//       {/* Expandable Content */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="overflow-hidden"
//           >
//             <div className="p-3 bg-slate-800/10 border-t border-slate-700/30">
//               {/* Items List */}
//               {section.hasItems && Array.isArray(data) && data.length > 0 && (
//                 <div className="space-y-2 mb-3">
//                   {data.map((item, index) => {
//                     const itemTitle = item.poste || item.nom_diplome || item.nom_projet || item.nom || item.titre || `Élément ${index + 1}`;
//                     const hasContent = Object.values(item).some(val => val !== null && val !== '' && val !== undefined);
                    
//                     return (
//                       <div
//                         key={index}
//                         className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
//                           hasContent
//                             ? 'bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30'
//                             : 'bg-slate-800/20 hover:bg-slate-700/30 border border-slate-700/20 opacity-60'
//                         }`}
//                         onClick={() => onSelect()}
//                       >
//                         <div className="flex items-center space-x-3 flex-1 min-w-0">
//                           <div className={`w-2 h-2 rounded-full ${
//                             hasContent ? 'bg-green-400' : 'bg-slate-500'
//                           }`} />
//                           <span className="text-sm text-white truncate">
//                             {itemTitle}
//                           </span>
//                         </div>
//                         {!hasContent && (
//                           <div className="text-xs text-slate-400 px-2 py-1 bg-slate-700/50 rounded-full">
//                             Vide
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* Add Button */}
//               {section.hasItems && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onAddItem();
//                   }}
//                   className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group"
//                 >
//                   <div className="w-5 h-5 rounded-full bg-slate-600 group-hover:bg-blue-500 flex items-center justify-center transition-colors">
//                     <Plus size={12} className="text-slate-300 group-hover:text-white" />
//                   </div>
//                   <span className="text-sm font-medium">Ajouter</span>
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default SectionAccordion;
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus } from 'lucide-react';

const SectionAccordion = ({
  section,
  isActive,
  isOpen,
  onToggle,
  onSelect,
  data,
  onAddItem
}) => {
  const handleClick = () => {
    onSelect();
    if (!isOpen) onToggle();
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    onToggle();
  };

  const getItemCount = () => {
    if (!section.hasItems || !Array.isArray(data)) return 0;
    return data.filter(item => 
      Object.values(item).some(val => val !== null && val !== '' && val !== undefined)
    ).length;
  };

  const itemCount = getItemCount();

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm">
      {/* Header Section */}
      <div
        className={`p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-l-blue-500'
            : 'bg-white hover:bg-gray-50'
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isActive 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {section.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">
              {section.title}
            </div>
            {section.hasItems && (
              <div className="text-xs text-gray-500">
                {itemCount} élément{itemCount !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {section.hasItems && itemCount > 0 && (
            <div className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
              {itemCount}
            </div>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`p-1 rounded-lg transition-colors ${
              isActive 
                ? 'text-blue-600 hover:bg-blue-100' 
                : 'text-gray-400 hover:bg-gray-100'
            }`}
            onClick={handleArrowClick}
          >
            <ChevronRight size={16} />
          </motion.div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              {/* Items List */}
              {section.hasItems && Array.isArray(data) && data.length > 0 && (
                <div className="space-y-2 mb-3">
                  {data.map((item, index) => {
                    const itemTitle = item.poste || item.nom_diplome || item.nom_projet || item.nom || item.titre || `Élément ${index + 1}`;
                    const hasContent = Object.values(item).some(val => val !== null && val !== '' && val !== undefined);
                    
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          hasContent
                            ? 'bg-white hover:bg-gray-100 border border-gray-200'
                            : 'bg-gray-100 hover:bg-gray-200 border border-gray-300 opacity-70'
                        }`}
                        onClick={() => onSelect()}
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className={`w-2 h-2 rounded-full ${
                            hasContent ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                          <span className="text-sm text-gray-900 truncate">
                            {itemTitle}
                          </span>
                        </div>
                        {!hasContent && (
                          <div className="text-xs text-gray-500 px-2 py-1 bg-gray-200 rounded-full">
                            Vide
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add Button */}
              {section.hasItems && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddItem();
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 transition-all duration-300 group shadow-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-gray-300 group-hover:bg-blue-500 flex items-center justify-center transition-colors">
                    <Plus size={12} className="text-gray-600 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-medium">Ajouter</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionAccordion;