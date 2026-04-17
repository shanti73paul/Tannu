import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

// POST JOB
export const postJob = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { id } = req.user;

    const {
      title,
      company,
      description,
      location,
      salary,
      type,
      requirements,
      benefits,
      jobLevel,
      education,
      experience,
    } = req.body;

    const formattedRequirements =
      typeof requirements === "string"
        ? requirements.split(",").map((item) => item.trim())
        : requirements;

    const formattedBenefits =
      typeof benefits === "string"
        ? benefits.split(",").map((item) => item.trim())
        : benefits;

    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      type,
      requirements: formattedRequirements,
      benefits: formattedBenefits,
      jobLevel,
      education,
      experience,
      createdBy: id,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error in postJob:", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// GET EMPLOYER JOBS
export const getEmployerJobs = async (req, res) => {
  try {
    const { id } = req.user;

    const jobs = await Job.find({ createdBy: id })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company")
      .sort({ createdAt: -1 });

    return res.json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.user;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.json({ message: "Job not found", success: false });
    }

    if (job.createdBy.toString() !== id) {
      return res.json({ message: "Unauthorized", success: false });
    }

    await Job.findByIdAndDelete(jobId);

    return res.json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// GET RECOMMENDED JOBS
export const getRecommendedJobs = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const jobs = await Job.find().populate("company").sort({ createdAt: -1 });

    // Normalize user data for matching
    const userSkills = user.skills ? user.skills.toLowerCase().split(",").map(s => s.trim()).filter(s => s) : [];
    const userLocation = user.location ? user.location.toLowerCase().trim() : "";
    const userExp = user.experience ? user.experience.toLowerCase().trim() : "";

    // Score jobs
    const scoredJobs = jobs.map(job => {
      let score = 0;

      // Location match (+3)
      if (userLocation && job.location && job.location.toLowerCase().includes(userLocation)) {
        score += 3;
      }

      // Experience match (+1)
      if (userExp && job.experience && job.experience.toLowerCase() === userExp) {
         score += 1;
      }

      // Skills match (+2 per skill found in title, description or requirements)
      if (userSkills.length > 0) {
        const jobTitle = job.title ? job.title.toLowerCase() : "";
        const jobDesc = job.description ? job.description.toLowerCase() : "";
        let jobReqs = "";
        if (Array.isArray(job.requirements)) {
            jobReqs = job.requirements.join(" ").toLowerCase();
        } else if (typeof job.requirements === "string") {
            jobReqs = job.requirements.toLowerCase();
        }
        
        const combinedJobText = `${jobTitle} ${jobDesc} ${jobReqs}`;

        userSkills.forEach(skill => {
            if (combinedJobText.includes(skill)) {
                score += 2;
            }
        });
      }

      return {
        ...job.toObject(),
        matchScore: score
      };
    });

    // Sort by score descending
    scoredJobs.sort((a, b) => b.matchScore - a.matchScore);

    // Return the top 10 recommended jobs
    const recommendedJobs = scoredJobs.slice(0, 10);

    return res.json({ success: true, jobs: recommendedJobs });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};