import Category from "../models/CategoryModel.js";

export const addCategory=async(req,res)=>{
    try {
        const {name}=req.body;
        const logo=req.file.filename;
        if(!name || !logo) {
            return res.json({success:false,message:"All fields are required"});
        }

        const category=await Category.create({
            name,
            logo,
        });
        return res.json({
            success:true,
            message:"Category added successsfully",
            
        });
    } catch (error) {
        return res.json({success:false,message:"Internal server error"});
    }
}

export const getCategories=async(req,res)=>{
    try {
        const categories=await Category.find();
        return res.json({success:true,categories});
    } catch (error) {
        return res.json({success:false,message:"Internal server error"});
    }
};

export const deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=await Category.findByIdAndDelete(id);
        if(!category) {
            return res.json({success:false,message:"Category not found"});
        }
        return res .json({
            success:true,
            message:"Category deleted successfully",
        });
    } catch (error) {
        return res.json({success:false,message:"Internal server error"});
    }
};