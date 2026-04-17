import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import toast from "react-hot-toast";

const AllCompanies = () => {
const {companyData}=useContext(AppContext);



  return (
    <div className="max-w-4xl w-full px-6 mx-auto mt-10 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl  font-medium text-gray-800">Company List</h2>
       
      </div>
      <table className="w-full border border-gray-300 rounded overflow-hidden">
       <thead className="bg-gray-50">
        <tr>
          <th className="text-left p-3 border-b">Logo</th>
          <th className="text-left p-3 border-b">Name</th>
          <th className="text-left p-3 border-b">About</th>
         
        </tr>
       </thead>
       <tbody className="divide-y divide-gray-300">
        {
          companyData.map((company)=>(
            <tr key={company._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                 <img src={company?.logo ? `http://localhost:5000/uploads/${company.logo}` : ""} alt="" className="w-16 h-16 object-cover border"/>
                   </td>
                    <td className="p-3 border-b">
                 {company.name}
                   </td>
                     <td className="p-3 border-b">
                 {company.about}
                   </td>
                    
            </tr>

          )
          )
        }

       </tbody>
      </table>
    </div>
  )
};

export default AllCompanies;
