import Company from "../models/companyModel.js";


export const addCompany=async(req,res)=>{
    try {
        const {id}=req.user;
        const {name,about}=req.body;
        const logo=req.file.filename;
        if (!name || !about || !logo) {
            return res.json({success:false,message:"All fields are required"});
        }
        const company=await Company.create({
            name,
             about,
            logo,
            createdBy:id,
        });
        return res.json({
            success:true,
            message:"Company added successfully",
            company,
        });
    } catch (error) {
        return res.json({success:false,message:"Internal server error"});
    }
};
export const getEmployerCompanies=async(req,res)=>{
    try {
        const {id}=req.user;
        const companies=await Company.find({createdBy:id});
        if(!companies) {
            return res.json({success:false,message:"No companies found"});
        }else{
            return res.json({success:true,companies});
        }
    } catch (error) {
        return res.json({success:false,message:"Internal server error"});
    }
};
export const getAllCompanies=async(req,res)=>{
    try {
        const companies=await Company.find();
        if (!companies) {
            return res.json({success:false,message:"No companies found"});
        }
        return res.json({success:true,companies});
    } catch (error) {
           return res.json({success:false,message:"Internal server error"});
    }
};

export const deleteCompany=async(req,res)=>{
    try {
        const {id: userId} = req.user;
        const {id} = req.params;
        const company = await Company.findById(id);
        if (!company) {
            return res.json({success:false,message:"Company not found"});
        }
        if (company.createdBy.toString() !== userId.toString()) {
            return res.json({success:false,message:"Unauthorized to delete this company"});
        }
        await Company.findByIdAndDelete(id);
        return res.json({success:true,message:"Company deleted successfully"});
    } catch (error) {
         return res.json({success:false,message:"Internal server error"});
    }
};