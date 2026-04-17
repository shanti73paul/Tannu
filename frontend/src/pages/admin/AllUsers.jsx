import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";



const AllUsers = () => {

  const {axios,admin}=useContext(AppContext);
   const [students,setStudents]=useState([]);
  const fetchAllStudents=async()=>{
    try {

      const {data}=await axios.get(`http://localhost:5000/user/all-students`);
      if(data.success) {
        setStudents(data.students);
      }
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(()=>{
    
    fetchAllStudents();
    
  },[]);
  return (
    <div className="p-4">
     <h2 className="text-2xl font-medium text-gray-800">Students List</h2>
     <div className="overflow-auto mt-12">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden"> 
        <thead className="bg-gray-100 text-gray-700 text-left">
         <tr>
           <th className="px-4 py-2">Image</th>
           <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
             <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Location</th>
               <th className="px-4 py-2">Education</th>
                <th className="px-4 py-2">Exp</th>
                 <th className="px-4 py-2">Skills</th>
                  <th className="px-4 py-2">bio</th>
                   <th className="px-4 py-2">Resume</th>
         </tr>
        </thead>
        <tbody>
          {
            students.map((student)=>(
              <tr key={student._id || student.id} className="border-t">
                <td className="px-4 py-2">
                    <img src={student?.image ? `http://localhost:5000/uploads/${student.image}` : ""} alt="profile" className="w-12 h-12 rounded-full object-cover" />
                  </td>
                   <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.phone}</td>
                  <td className="px-4 py-2">{student.location}</td>
                  <td className="px-4 py-2">{student.education}</td>
                  <td className="px-4 py-2">{student.experience}</td>
                  <td className="px-4 py-2">{student.skills}</td>
                  <td className="px-4 py-2">{student.bio}</td>
                  
                    <td className="px-4 py-2">
                     <a href={student?.resume ? `http://localhost:5000/uploads/${student.resume}` : "#"} className="text-blue-500 hover:underline">Resume</a>
                    </td>
              </tr>

            )
            )
          }
        </tbody>
      </table>

     </div>
    </div>
  )
}

export default AllUsers