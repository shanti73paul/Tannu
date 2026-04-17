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

const allowedOrigins=["http://localhost:5173", "http://localhost:5174", process.env.CLIENT_URL];
// middlewares
app.use(express.json());
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());


// connection to db
connectDB();

// API ENDPOINTS
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