import React from 'react'
import { assets } from '../assets/assets';
import { heroData } from '../assets/assets';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="py-20 lg:py-28 bg-gradient-to-b from-blue-50/50 to-white relative overflow-hidden" >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
           {/*left section */}
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="w-full md:w-1/2 flex flex-col gap-6 relative z-10"
           >
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 text-primary text-sm font-medium w-fit border border-blue-200"
             >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                #1 Job Portal Platform
             </motion.div>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight"
             >
               Find a job that suits your <span className="text-primary">interest</span> & skills.
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.4 }}
               className="text-base lg:text-lg text-gray-600 max-w-lg leading-relaxed"
             >
               Discover your dream job or hire top talent effortlessly with our modern, professional job portal platform designed for success.
             </motion.p>
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.5 }}
               className="flex items-center gap-4 mt-2"
             >
                <button className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
                    Get Started
                </button>
             </motion.div>
           </motion.div>
           
           {/*right section */}
           <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
             className="w-full md:w-1/2 relative flex justify-end"
           >
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl opacity-60 z-0"></div>
             <img src={assets.hero_img} alt="Hero" className="w-full max-w-[500px] object-contain relative z-10 drop-shadow-2xl transition-transform duration-700 hover:-translate-y-2" />
           </motion.div>
        </div>

      {/*hero data section*/}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 pb-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.6 }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8"
        >
          {heroData.map((item) => (
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              key={item._id} 
              className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-gray-100 transition-shadow duration-300 hover:shadow-md group"
            >
              <div className="bg-blue-50/50 p-3 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                 <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" /> 
              </div>
              <div className="flex flex-col">
                 <p className="text-xl md:text-2xl font-bold text-gray-900">{item.count}</p>
                 <p className="text-sm font-medium text-gray-500">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
