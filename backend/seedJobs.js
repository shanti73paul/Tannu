import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/jobModel.js";
import Company from "./models/companyModel.js";
import User from "./models/userModel.js";
import { connectDB } from "./config/connectDB.js";

dotenv.config();

const seed = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB for seeding...");

        let user = await User.findOne();
        if (!user) {
            // Need a dummy user if none exists
            console.log("No user found. Creating dummy employer...");
            user = await User.create({
                email: "employer@seeded.com",
                password: "password123", // Hashes aren't required here as we won't login with it
                name: "Dummy Employer",
                role: "employer",
                phone: "1234567890"
            });
        }

        let company = await Company.findOne();
        if (!company) {
            console.log("No company found. Creating a dummy company...");
            company = await Company.create({
                name: "TechNova Solutions",
                about: "A leading tech solutions provider focusing on modern web applications.",
                logo: "tech_nova_logo.png", // using a placeholder filename
                createdBy: user._id
            });
        }

        const dummyJobs = [
            {
                title: "Frontend React Developer",
                description: "We are seeking a talented React developer to build high-performance, beautiful UI components for our SaaS platform.",
                location: "Remote",
                salary: "120000",
                type: "Full-time",
                jobLevel: "Mid-Level",
                education: "Bachelor's Degree in CS",
                experience: "3+ years",
                requirements: ["Strong proficiency in React and Hooks", "TailwindCSS expertise", "Experience with Framer Motion"],
                benefits: ["Unlimited PTO", "Health & Dental", "Remote setup stipend"],
                company: company._id,
                createdBy: user._id,
            },
            {
                title: "Senior Node.js Backend Engineer",
                description: "Looking for an experienced Node.js developer to architect scalable microservices and handle heavy concurrent traffic.",
                location: "New York, USA (Hybrid)",
                salary: "150000",
                type: "Full-time",
                jobLevel: "Senior",
                education: "Master's or Bachelor's in CS",
                experience: "5+ years",
                requirements: ["Expertise in Node.js & Express", "Strong MongoDB and Mongoose skills", "System Design background"],
                benefits: ["Competitive Equity", "401k Match", "Relocation Support"],
                company: company._id,
                createdBy: user._id,
            },
            {
                title: "UI/UX Designer",
                description: "Join our creative team to design stunning, user-centric web and mobile interfaces that customers love.",
                location: "San Francisco, CA",
                salary: "110000",
                type: "Contract",
                jobLevel: "Entry-Level",
                education: "Design Degree or equivalent portfolio",
                experience: "1-2 years",
                requirements: ["Figma proficiency", "Strong sense of typography and color theory", "Prototyping skills"],
                benefits: ["Flexible hours", "Creative autonomy", "MacBook provided"],
                company: company._id,
                createdBy: user._id,
            }
        ];

        console.log("Inserting dummy jobs...");
        await Job.insertMany(dummyJobs);
        console.log("Successfully seeded 3 amazing jobs!");

        process.exit();
    } catch (error) {
        console.error("Error seeding databases:", error);
        process.exit(1);
    }
};

seed();
