import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const JobDetails = () => {
  const {
    jobsData,
    isJobApplied,
    setIsJobApplied,
    toggleSavedJob,
    savedJobs,
    api, // ✅ use correct axios instance
  } = useContext(AppContext);

  const { id } = useParams();

  const job = jobsData?.find((job) => job._id === id);

  if (!job) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const isSaved = savedJobs?.some(saved => 
      (typeof saved === 'string' ? saved : saved._id) === job._id
  );

  // ===========================
  // ✅ APPLY JOB
  // ===========================
  const handleApplyJob = async (id) => {
    try {
      const { data } = await api.post("/application/apply", {
        jobId: id,
      });

      if (data.success) {
        setIsJobApplied(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="py-16">
      <h1 className="text-2xl md:text-5xl text-gray-800 font-semibold text-center">
        Job Details
      </h1>

      <div className="w-full flex flex-col md:flex-row items-start justify-center mt-10 gap-10 px-4">
        
        {/* LEFT SECTION */}
        <div className="flex flex-col max-w-2xl w-full">
          
          {/* Company Info */}
          <div className="flex items-center gap-5">
            <img
              src={
                job?.company?.logo
                  ? `/uploads/${job.company.logo}` // ✅ proxy fixed
                  : ""
              }
              alt=""
              className="w-[80px] h-[80px] object-cover rounded"
            />
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">
                {job.title}
              </h2>
              <p className="text-sm md:text-base">
                at {job?.company?.name}
                <span className="bg-green-200/40 px-2 py-1 rounded ml-2 text-xs">
                  {job.type}
                </span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="my-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Job Description
            </h4>
            <p className="text-gray-700 mt-1">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="my-2">
            <h4 className="text-lg font-semibold text-gray-800">
              Job Requirements
            </h4>
            <ul className="list-disc pl-5">
              {job?.requirements?.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="my-2">
            <h4 className="text-lg font-semibold text-gray-800">
              Job Benefits
            </h4>
            <ul className="list-disc pl-5">
              {job?.benefits?.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col w-full max-w-md gap-4">

          {/* Buttons */}
          <div className="flex gap-4 items-center">
            <button 
                className={`transition-colors p-2 rounded-full border ${isSaved ? 'text-primary border-primary bg-primary/10' : 'text-gray-400 border-gray-300 hover:text-primary hover:border-primary bg-white'}`} 
                onClick={() => toggleSavedJob(job)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>

            <button
              onClick={() => handleApplyJob(job._id)}
              disabled={isJobApplied}
              className={`px-6 py-2 rounded-full text-white transition ${
                isJobApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:opacity-90"
              }`}
            >
              {isJobApplied ? "Applied" : "Apply Now"}
            </button>
          </div>

          {/* Salary & Location */}
          <div className="border border-gray-300 p-4 rounded">
            <p className="text-base font-medium text-gray-800">
              Salary: ₹{job.salary}
            </p>

            <div className="flex gap-2 mt-2">
              <p className="font-medium">Location:</p>
              <p>{job.location}</p>
            </div>
          </div>

          {/* Overview */}
          <div className="border border-gray-300 p-4 rounded">
            <p className="text-lg font-bold text-gray-800 mb-2">
              Job Overview
            </p>

            <div className="flex flex-col gap-1 text-sm">
              <p>
                Posted:{" "}
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>Level: {job.jobLevel}</p>
              <p>Education: {job.education}</p>
              <p>Experience: {job.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
