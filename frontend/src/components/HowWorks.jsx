import { howWorks } from "../assets/assets";
import { motion } from "framer-motion";

const HowWorks = () => {
  return (
    <div className="py-20 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center max-w-2xl mx-auto mb-16"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">How It Works</h2>
            <p className="text-gray-500 mt-4 text-base md:text-lg">Follow these simple steps to find your dream job or ideal candidate seamlessly.</p>
        </motion.div>
        
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={{
              hidden: { opacity: 0 },
              visible: {
                 opacity: 1,
                 transition: { staggerChildren: 0.15 }
              }
           }}
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
            {howWorks.map((item, index) => (
                <motion.div 
                    variants={{
                       hidden: { opacity: 0, y: 40 },
                       visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                    }}
                    key={index} 
                    className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center group"
                >
                    {/* Optional step number */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                        {index + 1}
                    </div>
                    
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <img src={item.icon} alt={item.title} className="w-8 h-8 opacity-80" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HowWorks;
