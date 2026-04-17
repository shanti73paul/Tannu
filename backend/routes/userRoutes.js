import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getAllStudents, getLoggedInUser, updateProfile, toggleSavedJob, getSavedJobs } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";


const userRouter=express.Router();
userRouter.get("/me",isAuthenticated, getLoggedInUser);
userRouter.put(
    "/update-profile/:id",
    isAuthenticated,
     upload.fields([
        {name:"profileImage",maxCount:1},
        {name:"resume",maxCount:1},
     ]),
     updateProfile
    );
userRouter.get("/all-students",isAuthenticated,isAdmin, getAllStudents);
userRouter.post("/toggle-save", isAuthenticated, toggleSavedJob);
userRouter.get("/saved-jobs", isAuthenticated, getSavedJobs);

export default userRouter;