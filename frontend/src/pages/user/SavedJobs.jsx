import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import JobCard from "../../components/JobCard";
import { motion } from "framer-motion";

const SavedJobs = () => {
    const { savedJobs } = useContext(AppContext);

    return (
        <div className="py-16 max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="text-center max-w-2xl mx-auto mb-16"
            >
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Saved Jobs</h1>
                <p className="text-gray-500 text-base md:text-lg">Your bookmarked career opportunities</p>
            </motion.div>

            {!savedJobs || savedJobs.length === 0 ? (
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.2 }}
                   className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl mx-auto"
                >
                    <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Saved Jobs Yet</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't bookmarked any jobs. Browse our listings and save roles that interest you to apply later.</p>
                </motion.div>
            ) : (
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {savedJobs.map((job, index) => (
                        <JobCard key={job._id || index} job={job} />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default SavedJobs;
