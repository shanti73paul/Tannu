import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { applyToJob, getAllApplications, getEmployerJobApplicants, getStudentApplication, updateApplicationStatus } from "../controllers/applicationController.js";



const applicationRouter=express.Router();

applicationRouter.post("/apply",isAuthenticated,applyToJob);
applicationRouter.get("/student-applications",isAuthenticated,getStudentApplication);
applicationRouter.get("/employer-job-applicants",isAuthenticated,getEmployerJobApplicants);
applicationRouter.get("/all-applications",isAuthenticated,isAdmin,getAllApplications);
applicationRouter.put("/update-status/:applicationId",isAuthenticated,updateApplicationStatus);


export default applicationRouter;