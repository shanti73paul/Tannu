import mongoose from "mongoose";
const  categoryModel=new mongoose.Schema({
   name:{
    type:String,
    required:true,
   },
   logo:{
         type:String,
         required:true,
   },
});

const Category=mongoose.model("Category",categoryModel);
export default Category;