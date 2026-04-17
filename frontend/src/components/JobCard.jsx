import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const JobCard = ({ job }) => {
    const { navigate, savedJobs, toggleSavedJob } = useContext(AppContext);
    
    // Support savedJobs returning full job documents or just IDs depending on how it's populated.
    const isSaved = savedJobs?.some(saved => 
        (typeof saved === 'string' ? saved : saved._id) === job._id
    );

  return (
    <div 
        onClick={() => navigate(`/job-details/${job._id}`)} 
        className="group p-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white cursor-pointer transition-all duration-300 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 w-full"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-xl border border-gray-100 p-2 flex items-center justify-center bg-gray-50">
                <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${job.company?.logo}`} alt={job.company?.name || "Company"} className="max-w-full max-h-full object-contain object-center"/>
            </div>
            <div>
                <h3 className="text-base font-semibold text-gray-900 leading-tight">{job.company?.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{job.location}</p>
            </div>
        </div>
        <button 
            className={`transition-colors p-1 ${isSaved ? 'text-primary' : 'text-gray-400 hover:text-primary'}`} 
            onClick={(e) => { 
                e.stopPropagation(); 
                toggleSavedJob(job); 
            }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
      </div>

      <div>
        <h1 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</h1>
      </div>
      
      <div className="flex gap-3 items-center mt-2" >
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100/50">{job.type}</span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100/50">Salary: ${job.salary}</span>
      </div>
    </div>
  )
};

export default JobCard;
