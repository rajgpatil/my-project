import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js"

import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoute);


// error handling middleware
app.use((err,req,res,next)=>{
    res.json({success: false, message: err.message})
})

app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
