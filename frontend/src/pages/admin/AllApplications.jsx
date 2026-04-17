import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const AllApplications = () => {
  const { applicantsData } = useContext(AppContext);

  return (
    <div className="py-16 max-w-7xl mx-auto bg-gradient-to-b from-purple-200/70 px-4">
      
      <h1 className="text-2xl md:text-5xl font-medium text-gray-800 mb-8">
        All Applicants
      </h1>

      {!applicantsData || applicantsData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">
            No Applicants Found
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="overflow-x-auto">
            
            <table className="min-w-full divide-y divide-gray-200">
              
              {/* TABLE HEAD */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-head">Name</th>
                  <th className="table-head">Email</th>
                  <th className="table-head">Phone</th>
                  <th className="table-head">Applied Job</th>
                  <th className="table-head">Application Date</th>
                  <th className="table-head">Resume</th>
                  <th className="table-head">Status</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="bg-white divide-y divide-gray-200">
                {applicantsData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition cursor-pointer"
                  >
                    
                    {/* NAME */}
                    <td className="table-data">
                      {item?.applicant?.name || "N/A"}
                    </td>

                    {/* EMAIL */}
                    <td className="table-data">
                      {item?.applicant?.email || "N/A"}
                    </td>

                    {/* PHONE */}
                    <td className="table-data">
                      {item?.applicant?.phone || "N/A"}
                    </td>

                    {/* JOB TITLE */}
                    <td className="table-data">
                      {item?.job?.title || "N/A"}
                    </td>

                    {/* DATE */}
                    <td className="table-data">
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>

                    {/* RESUME */}
                    <td className="table-data">
                      {item?.applicant?.resume ? (
                        <a
                          href={`/uploads/${item.applicant.resume}`} // ✅ proxy fixed
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        "No Resume"
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="table-data">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200">
                        {item?.status || "Pending"}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllApplications;