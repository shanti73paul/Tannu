import { Routes,Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllJobs from "./pages/AllJobs";
import JobDetails from "./pages/JobDetails";
import About from "./pages/About";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster} from "react-hot-toast";
import MyApplications from "./pages/user/MyApplications";
import Profile from "./pages/user/Profile";
import SavedJobs from "./pages/user/SavedJobs";
import EmployerLayout from "./pages/employer/EmployerLayout";
import CompanyList from "./pages/employer/CompaniesList";
import CompaniesList from "./pages/employer/CompaniesList";
import AddCompany from "./pages/employer/AddCompany";
import PostJob from "./pages/employer/PostJob";
import JobsList from "./pages/employer/JobsList";
import Applicants from "./pages/employer/Applicants";
import AdminLayout from "./pages/admin/AdminLayout";
import CategoriesList from "./pages/admin/CategoriesList";
import AddCategory from "./pages/admin/AddCategory";
import AllCompanies from "./pages/admin/AllCompanies";
import AllApplications from "./pages/admin/AllApplications";
import AllUsers from "./pages/admin/AllUsers";
import Jobs from "./pages/admin/Jobs";
const App = () => {
  const adminPath=useLocation().pathname.includes("admin");
  const employerPath=useLocation().pathname.includes("employer");
  return (
   <div className="w-full min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
     {adminPath || employerPath ? null : <Navbar />}
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/all-jobs" element={<AllJobs/>} />
        <Route path="/job-details/:id" element={<JobDetails/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />

        {/*____________user routes_______________*/}
        <Route path="/my-applications" element={<MyApplications/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/saved-jobs" element={<SavedJobs/>} />

            {/*____________employer routes_______________*/}
            <Route path="/employer" element={<EmployerLayout />}>
            <Route index element={<CompaniesList/>} />
            <Route path="add-company" element={<AddCompany />} />
            <Route path="post-job" element={<PostJob/>} />
            <Route path="jobs-list" element={<JobsList/>} />
            <Route path="applicants" element={<Applicants/>} />
             </Route>
                {/*____________admin routes_______________*/}
                <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<CategoriesList/>} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="all-companies" element={<AllCompanies/>} />
            <Route path="all-applications" element={<AllApplications/>} />
            <Route path="all-users" element={<AllUsers/>} />
            <Route path="jobs" element={<Jobs/>} />
             </Route>
       </Routes>
       {adminPath || employerPath ? null : <Footer />}
       <Toaster/>
       </div>
  );
};
export default App;

