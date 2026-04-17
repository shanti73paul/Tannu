import User from "../models/userModel.js";


export const getLoggedInUser=async(req,res)=>{

    try {
        
        const { id } = req.user;
        const user = await User.findById(id).select("-password");
        if(!user) {
            return res.json({success:false, message:"User not found"});
        }

        return res.json({ success:true, user});
    } catch (error) {
        return res.json({success:false ,message:"Internal server error"});
    }
};

export const updateProfile=async(req,res)=>{
    try {
        const {id}=req.user;
        const {
            name,
            email,
            phone,
            location,
            education,
            experience,
            skills,
            about,
         } = req.body;

         const updates = {
            name,
            email,
            phone,
            location,
            education,
            experience,
            skills,
            bio:about,
         };

         if(req.files?.profileImage?.[0]) {
            updates.image = req.files.profileImage[0].filename;
         }
         if(req.files?.resume?.[0]) {
            updates.resume = req.files.resume[0].filename;
         }
         const updatedUser=await User.findByIdAndUpdate(id,updates,{
               new:true,
         }

         ).select("-password");
         if (!updatedUser) {
            return res
            .status(404)
            .json({success:false, message:"User not found"});
         }
         return res.status(200)
         .json({success:true, user:updatedUser,message:"Profile updated successfully",});
    } catch (error) {
        return res
        .status(500)
        .json({success:false, message:"Something went wrong"});
    }
};


export const getAllStudents=async(req,res)=>{
    try {
        const students=await User.find({role:"student"}).select("-password");
        return res.json({success:true, students});
    } catch (error) {
        return res.json({success:false, message:"Internal server error"});
    }
};

export const toggleSavedJob = async(req, res) => {
    try {
        const { id } = req.user;
        const { jobId } = req.body;
        const user = await User.findById(id);
        if(!user) return res.json({success:false, message:"User not found"});

        const isSaved = user.savedJobs.includes(jobId);
        if(isSaved) {
            user.savedJobs = user.savedJobs.filter(saved => saved.toString() !== jobId);
        } else {
            user.savedJobs.push(jobId);
        }
        await user.save();
        return res.json({success:true, savedJobs: user.savedJobs, message: isSaved ? "Job removed from saved items" : "Job saved successfully" });
    } catch(error) {
        return res.json({success:false, message: "Internal server error"});
    }
};

export const getSavedJobs = async(req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id).populate({
            path: 'savedJobs',
            populate: {
                path: 'company'
            }
        });
        if(!user) return res.json({success:false, message: "User not found"});

        return res.json({success:true, savedJobs: user.savedJobs});
    } catch(error) {
        return res.json({success:false, message: "Internal server error"});
    }
};