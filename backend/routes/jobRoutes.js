import express from "express";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";
import { deleteJob, getAllJobs, getEmployerJobs, postJob, getRecommendedJobs } from "../controllers/jobController.js";



const jobRouter=express.Router();

jobRouter.post("/post",isAuthenticated,postJob);
jobRouter.get("/employer-jobs",isAuthenticated,getEmployerJobs);
jobRouter.get("/all",getAllJobs);
jobRouter.delete("/delete/:jobId",isAuthenticated,deleteJob);
jobRouter.get("/recommended-jobs",isAuthenticated,getRecommendedJobs);

export default jobRouter;