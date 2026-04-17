import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: Types.ObjectId,
      ref: "Company",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    jobLevel: {
      type: String,
    },
    education: {
      type: String,
    },
    experience: {
      type: String,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);

export default Job;