import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";


const EmployerLayout = () => {

   const { navigate, setUser, api,user} = useContext(AppContext);
   
const sidebarLinks = [
        { name: "Companies", path: "/employer"},
        { name: "add company", path: "/employer/add-company" },
        { name: "Jobs", path: "/employer/jobs-list" },
         { name: "post job", path: "/employer/post-job" },
           { name: "Applicants", path: "/employer/applicants" },
    ];
        
    const logout = async () => {
        try {
            const { data } = await api.get("/auth/logout");
            if (data.success) {
                setUser(false);
                navigate("/");
                toast.success(data.message);
            };
        } catch (error) {
            toast.error(error.response.data.message);
        }
        
    };
    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to={"/employer"}>
               <img src={assets.logo} alt=" " />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! {user?.name}</p>
                    <button 
                    onClick={logout}
                   className='border rounded-full text-sm px-4 py-1'>Logout
                    </button>
                </div>
            </div>
           <div className="flex">
             <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item, index) => (
                    <Link to={item.path} key={index}
                        className={`flex items-center py-3 px-4 gap-3 
                            ${index === 0 ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        
                        <p className="md:block hidden text-center">{item.name}</p>
                   </Link>
                ))}
            </div>
            <Outlet />
           </div>
            
        </>
    );
};
export default EmployerLayout;
