import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { addCompany, deleteCompany, getAllCompanies, getEmployerCompanies } from "../controllers/companyController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { upload } from "../middlewares/multer.js";

const CompanyRouter=express.Router();

CompanyRouter.post("/add",isAuthenticated,upload.single("logo"),addCompany);
CompanyRouter.get("/get-employer-companies",isAuthenticated,getEmployerCompanies);
CompanyRouter.get("/all",isAuthenticated,isAdmin,getAllCompanies);
CompanyRouter.delete("/delete/:id",isAuthenticated,deleteCompany);

export default CompanyRouter;