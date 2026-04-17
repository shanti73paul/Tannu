import { useState } from "react";
import  {assets} from "../assets/assets";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {

    const {navigate,setQuery,user,setUser,api}=useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [isOpen,setIsOpen]=useState(false);
    const [input,setInput]=useState("");

    const handleSearch=(e)=>{
        if(e.key === "Enter" && input.trim() !=="") {
            setQuery(input);
            navigate("/all-jobs");
            setInput("");
        }
    };
    const logout = async () => {
        try {
            const{ data } = await api.get("/auth/logout");
            if (data.success) {
                setUser(false);
                navigate("/");
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        
    }
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-all">
         
         <Link to={"/"} className="transition-transform duration-300 hover:scale-105">
            <img src={assets.logo} alt="logo" className="h-8 md:h-10 w-auto" />
         </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 text-gray-700 font-medium tracking-wide">
                <Link to={"/"} className="hover:text-primary transition-colors">Home</Link>
                <Link to={"/all-jobs"} className="hover:text-primary transition-colors">Jobs</Link>
                <Link to={"/about"} className="hover:text-primary transition-colors">About</Link>

                <div className="hidden lg:flex items-center text-sm gap-2 bg-gray-50 border border-gray-200 px-6 py-2 rounded-full focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all shadow-sm">
                    <input 
                     className="w-48 xl:w-64 bg-transparent outline-none placeholder-gray-400 text-gray-800" 
                     type="text"
                     value={input}
                     onChange={(e)=> setInput(e.target.value)}
                     onKeyDown={handleSearch}
                     placeholder="Search jobs, companies..." />
                     <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSearch({key: 'Enter'})}>
                        <path d="M10.836 10.615 15 14.695" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                </div>
                    
                {user ? (
                    <div className="relative inline-block"
                     onMouseEnter={()=>setIsOpen(true)}
                     onMouseLeave={()=>setIsOpen(false)}>
                     <img src={user?.image ? `http://localhost:5000/uploads/${user.image}` : assets.user_profile} alt="profile" className="w-10 h-10 rounded-full cursor-pointer border border-gray-200 object-cover shadow-sm transition-transform hover:scale-105"/>
                     {isOpen && (
                         <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50 overflow-hidden transform opacity-100 transition-opacity duration-200">
                            <p className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors cursor-pointer"
                            onClick={()=>navigate("/my-applications")}>My Applications</p>
                            <p className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors cursor-pointer"
                            onClick={()=>navigate("/profile")}>Profile</p>
                            <p className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors cursor-pointer"
                            onClick={()=>navigate("/saved-jobs")}>Saved Jobs</p>
                            <div className="border-t border-gray-100 my-1"></div>
                            <p className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer font-medium"
                            onClick={logout}>Logout</p>
                         </div>
                     )}
                    </div>
                ) : (
                    <button onClick={() => navigate("/login")}
                     className="cursor-pointer px-7 py-2 bg-primary hover:bg-blue-700 hover:shadow-md transition-all duration-300 text-white font-medium rounded-full text-sm tracking-wide">
                        Login
                    </button>
                )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden text-gray-600 hover:text-primary transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`
                ${open ? 'flex opacity-100' : 'hidden opacity-0'} 
                absolute top-[72px] left-0 w-full bg-white border-b border-gray-200 shadow-lg py-6 flex-col
                 items-start gap-4 px-6 text-base font-medium text-gray-700 md:hidden transition-opacity duration-300`}>
                  <Link to={"/"} onClick={() => setOpen(false)} className="w-full hover:text-primary transition-colors">Home</Link>
                  <Link to={"/all-jobs"} onClick={() => setOpen(false)} className="w-full hover:text-primary transition-colors">Jobs</Link>
                  <Link to={"/about"} onClick={() => setOpen(false)} className="w-full hover:text-primary transition-colors">About</Link>

                  <button
                   onClick={() => { navigate("/login"); setOpen(false); }}
                   className="cursor-pointer w-full text-center py-2.5 mt-2 bg-primary hover:bg-blue-700 transition-colors text-white rounded-full text-sm font-medium shadow-sm">
                    Login
                  </button>
            </div>
        </nav>
    );
}
export default Navbar;