import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
dotenv.config();
 
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import CompanyRouter from "./routes/companyRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationsRoutes.js";

const app=express();

const allowedOrigins=["http://localhost:5173", "http://localhost:5174", process.env.FRONTEND_URL].filter(Boolean);
// middlewares
app.use(express.json());
app.use(cors({origin:allowedOrigins,credentials:true}));
app.use(cookieParser());


// connection to db
connectDB();
// API ENDPOIMTS
app.get("/",(req,res)=> {
    res.send("hello");
}
);
app.use("/uploads",express.static("uploads"));
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/category",categoryRouter);
app.use("/company",CompanyRouter);
app.use("/job",jobRouter);
app.use("/application",applicationRouter);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
}
);