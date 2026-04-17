import { vacancies } from "../assets/assets";
import { motion } from "framer-motion";

const PopularVacancies = () => {
  return (
    <div className="py-20 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight"> 
              Most Popular Vacancies
            </h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg">Explore the most sought-after roles in the industry.</p>
          </motion.div>
          <motion.button 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="hidden md:block text-primary font-medium hover:text-blue-700 transition-colors"
          >
            View All Job Categories &rarr;
          </motion.button>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
             hidden: { opacity: 0 },
             visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
             }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {vacancies.map((item, index) => {
              const gradients = [
                "bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] shadow-[#7C3AED]/30", // Indigo to Violet
                "bg-gradient-to-br from-[#059669] to-[#10B981] shadow-[#10B981]/30", // Emerald
                "bg-gradient-to-br from-[#EC4899] to-[#E11D48] shadow-[#E11D48]/30", // Pink to Rose
                "bg-gradient-to-br from-[#F59E0B] to-[#EA580C] shadow-[#EA580C]/30", // Amber to Orange
                "bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] shadow-[#3B82F6]/30", // Cyan to Blue
                "bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] shadow-[#D946EF]/30", // Violet to Fuchsia
                "bg-gradient-to-br from-[#14B8A6] to-[#0EA5E9] shadow-[#0EA5E9]/30", // Teal to Sky
                "bg-gradient-to-br from-[#F43F5E] to-[#FB923C] shadow-[#FB923C]/30", // Rose to Orange
              ];
              const colorClass = gradients[index % gradients.length];

              return (
              <motion.div 
                variants={{
                   hidden: { opacity: 0, y: 30, scale: 0.95 },
                   visible: { opacity: 1, y: 0, scale: 1 }
                }}
                key={index} 
                whileHover={{ scale: 1.05, y: -5 }}
                className={`group flex flex-col justify-center gap-4 rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden relative ${colorClass}`}
              > 
                {/* Decorative floating circle */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="flex items-center justify-between relative z-10">
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">{item.title}</h3>
                </div>
                <p className="text-sm font-semibold text-white/90 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full w-fit shadow-sm relative z-10">
                  {item.count} Open Positions
                </p>
              </motion.div>
            )})}
        </motion.div>
      </div>
    </div>
  );
};

export default PopularVacancies;
