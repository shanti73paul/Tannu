import express from "express";

import { upload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { addCategory, deleteCategory, getCategories } from "../controllers/categoryController.js";

const categoryRouter=express.Router();

categoryRouter.post("/add",isAuthenticated,isAdmin,upload.single("logo"),addCategory);

categoryRouter.get("/all",getCategories);
categoryRouter.delete("/delete/:id",isAuthenticated,isAdmin,deleteCategory);


export default categoryRouter;