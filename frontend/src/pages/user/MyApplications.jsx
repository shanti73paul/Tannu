import { useContext, useEffect,useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const MyApplications = () => {
const {axios,navigate}=useContext(AppContext);
const [appliedJobs,setAppliedJobs]=useState([]);
const fetchAppliedJobs=async()=>{
    try {
        const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/application/student-applications`);
        if(data.success) {
            setAppliedJobs(data.applications);
        } else{
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
};
useEffect(()=>{
    fetchAppliedJobs();
},[]);
const getStatusColor=(status)=>{
    switch (status?.toLowerCase()) {
        case "pending":
          return "bg-yellow-100 text-yellow-800";  
            case "approved":
             case "hired":
            return "bg-green-100 text-green-800";
            case "rejected":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
    }
};

const getTypeColor=(type)=>{
    switch (type?.toLowerCase()) {
        case "full-time":
          return "bg-purple-100 text-purple-800";  
            case "part-time":
             return "bg-orange-100 text-orange-800";
            case "contract":
                return "bg-indigo-100 text-indigo-800";
                case "internship":
                    return "bg-pink-100 text-pink-800";
            default:
                return "bg-gray-100 text-gray-800";
    }
};
  return (
    <div className="py-16 max-w-7xl mx-auto bg-gradient-to-b from-purple-200/70">
    <h1 className="text-2xl md:text-5xl font-medium text-gray-800 mb-8">Applied Jobs</h1> 
    {!appliedJobs || appliedJobs.length === 0 ? (
    <div className="text-center py-12">
           <div className="text-gray-400 text-lg">No Job Applied</div>
           <p className="text-gray-400 mt-4">Your job applications will appear here once you start applying.</p>
         </div> 
         ): <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Salary
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        appliedJobs.map((job,index)=>(
                                <tr className="hover:bg-gray-50 transition-colors hover:cursor-pointer"
                                onClick={()=>navigate(`/job-details/${job._id}`)} key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{job.job.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{job.employer.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{job.job.type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{job.job.location}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">${job.job.salary}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{job.status }</div>
                                    </td>

                                </tr>

                        )
                        
                        )
                    }
                </tbody>
              </table>
            </div>
            </div>}   
        </div>
  );
};

export default MyApplications;
