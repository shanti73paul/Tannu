import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import JobCard from "./JobCard";
import { motion } from "framer-motion";

const Jobs = () => {
   const { jobsData, user, recommendedJobs } = useContext(AppContext);
   
   const displayJobs = user && recommendedJobs && recommendedJobs.length > 0 ? recommendedJobs.slice(0, 6) : jobsData.slice(0, 6);
   const isRecommended = user && recommendedJobs && recommendedJobs.length > 0;
   return (
    <div className="py-20 bg-white"> 
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center mb-12"
        >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">{isRecommended ? "Recommended Jobs" : "Featured Jobs"}</h1>
            <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto ${isRecommended ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                {isRecommended ? "⭐️ Hand-picked opportunities based on your skills and location." : "Explore carefully curated opportunities from top companies."}
            </p>
        </motion.div>
        
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
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayJobs.map((job) => (
              <motion.div 
                 key={job._id}
                 variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                 }}
              >
                 <JobCard job={job} />
              </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="mt-12 text-center"
        >
            <button className="px-8 py-3 outline-none border border-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                Load More Jobs
            </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Jobs;
