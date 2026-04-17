import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// ✅ Axios Global Config
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "/", // proxy or backend URL
    withCredentials: true,
});

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();

    // 🔹 Auth State
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);

    // 🔹 Data State
    const [categoriesData, setCategoriesData] = useState([]);
    const [jobsData, setJobData] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [applicantsData, setApplicantsData] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);

    // 🔹 UI State
    const [query, setQuery] = useState("");
    const [isJobApplied, setIsJobApplied] = useState(false);
    const [savedJobs, setSavedJobs] = useState([]);

    // ===========================
    // 🔹 COMMON ERROR HANDLER
    // ===========================
    const handleError = (error) => {
        const message =
            error.response?.data?.message || "Something went wrong";
        toast.error(message);
    };

    // ===========================
    // 🔹 AUTH: GET LOGGED IN USER & RECOMMENDATIONS
    // ===========================
    
    const fetchRecommendedJobs = async () => {
        try {
            const { data } = await api.get("/job/recommended-jobs");
            if (data.success) {
                setRecommendedJobs(data.jobs);
            }
        } catch (error) {
            // Silent error handling for generic matching
            console.error("Failed to load recommended jobs");
        }
    };

    const fetchLoggedInUser = async () => {
        try {
            const { data } = await api.get("/user/me");

            if (data.success) {
                setUser(data.user);
                setAdmin(data.user.role === "admin");
                
                // Fetch saved jobs for the logged in user
                const savedJobsRes = await api.get("/user/saved-jobs");
                if (savedJobsRes.data.success) {
                    setSavedJobs(savedJobsRes.data.savedJobs);
                }

                // Call the recommendation routine
                fetchRecommendedJobs();
            }
        } catch (error) {
            if (error.response?.status !== 401) {
                handleError(error);
            }
        }
    };

    // ===========================
    // 🔹 FETCH DATA FUNCTIONS
    // ===========================
    const fetchCategories = async () => {
        try {
            const { data } = await api.get("/category/all");

            if (data.success) {
                setCategoriesData(data.categories);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    const fetchJobs = async () => {
        try {
            const { data } = await api.get("/job/all");

            if (data.success) {
                setJobData(data.jobs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    const fetchCompanies = async () => {
        try {
            const { data } = await api.get("/company/all");

            if (data.success) {
                setCompanyData(data.companies);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    const fetchApplicants = async () => {
        try {
            const { data } = await api.get("/application/all-applications");

            if (data.success) {
                setApplicantsData(data.applications);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    // ===========================
    // 🔹 SAVE JOB FUNCTION
    // ===========================
    const toggleSavedJob = async (job) => {
        if(!user) {
            toast.error("Please login to save jobs");
            return navigate("/login");
        }
        try {
            const { data } = await api.post("/user/toggle-save", { jobId: job._id });
            if (data.success) {
                toast.success(data.message);
                setSavedJobs(data.savedJobs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    // ===========================
    // 🔹 USE EFFECTS
    // ===========================
    useEffect(() => {
        fetchLoggedInUser();
        fetchCategories();
        fetchJobs();
    }, []);

    useEffect(() => {
        if (admin) {
            fetchApplicants();
            fetchCompanies();
        }
    }, [admin]);

    // ===========================
    // 🔹 CONTEXT VALUE
    // ===========================
    const value = {
        navigate,

        // Auth
        user,
        setUser,
        admin,
        setAdmin,

        // Data
        categoriesData,
        jobsData,
        companyData,
        applicantsData,
        recommendedJobs,

        // Fetch Functions
        fetchJobs,

        // UI
        query,
        setQuery,
        isJobApplied,
        setIsJobApplied,
        savedJobs,
        setSavedJobs,
        toggleSavedJob,

        // Axios instance
        api,
        axios: api,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;