import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";


export const applyToJob=async(req,res)=>{
    try {
        const {id}=req.user;
        const {jobId}=req.body;
        const alreadyApplied=await Application.findOne({job:jobId,applicant:id});
        if (alreadyApplied) {
            return res.json({
                success:false,
                message:"You have already applied to this job",
            });
        }
        const job=await Job.findById(jobId);
        if(!job) {
            return res.json({
                success:false,
                message:"Job not found",
            });
        }
        const application=await Application.create({
            job:jobId,
            applicant:id,
            employer:job.createdBy,
        });
        return res.json({
            success:true,
            message:"Application submitted successfully",
            application,
        });
    } catch (error) {
        return res.json({message:"Internal server error",success:false});
    }
};
export const getStudentApplication=async(req,res)=>{
      try {
        const {id}=req.user;
        const applications=await Application.find({applicant:id}).populate("job").populate("employer");
        return res.json({success:true,applications});
      } catch (error) {
        return res.json({message:"Internal server error",success:false});
      }
};

export const getEmployerJobApplicants=async(req,res)=>{
    try {
        const {id}=req.user;
        const applications=await Application.find({employer:id}).populate("job").populate("applicant");
        return res.json({success:true,applications});
    } catch (error) {
        return res.json({message:"Internal server error",success:false});
    }
};
export const getAllApplications=async(req,res)=>{
    try {
        const applications=await Application.find()
        .populate("job")
        .populate("applicant")
        .populate("employer");
        return res.json({success:true,applications});
    } catch (error) {
        return res.json({message:"Internal error",success:false});
    }
};
export const updateApplicationStatus=async(req,res)=>{
    try {
        const {applicationId}=req.params;
        const {status}=req.body;
        const application=await Application.findById(applicationId);
        if(!application) {
            return res
            .status(404)
            .json({success:false,message:"Application not found"});
        }
        application.status=status;
        await application.save();
        res.status(200).json({
            success:true,
            message:"Application status updated",
            application,
        });
    } catch (error) {
        res
            .status(500)
            .json({success:false,message:"Failed to update status",error});
    }
};