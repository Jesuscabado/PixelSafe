import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";
import router from "./routes/router.js";

dotenv.config();
const CONTAINER_PORT = 3000;

const app = express();
app.use(express.json()); // api
connectDB();
app.get("/",(req,res)=>{
    res.json({message:"You are not prepared!", imageUrl: "https://wow.zamimg.com/uploads/screenshots/normal/552557-illidan-tempestira-updated-model.jpg"});
})

app.use("/api",router);

app.listen(CONTAINER_PORT ,()=>{
    console.log("Aplicacion en marcha en el puerto "+process.env.APP_PORT);
})
