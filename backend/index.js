import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"
import cors from "cors"
import path from "path";
//const PORT = 8080; iske badle env file bnaayi hai
// .env ki path define karni hai index me
dotenv.config({
  path: ".env",
});
databaseConnection();

const app = express();

const _dirname = path.resolve();

//middlewares - req aur res ke bich me kaam karta hai, jab bhi user ko client side se request marta hai jab tak uska response wapas jata hai, uske bich ka jo kaam hota hai wo middleware ka hi hota hai..
//add middleware
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json()); //data json me aayega
app.use(cookieParser());

// cors connection
// Enable CORS with credentials

const corsOptions = {
  origin: 'https://tweetnest-tgb4.onrender.com', // your frontend URL
  credentials: true // Allow cookies and credentials
}
app.use(cors(corsOptions)); 



//create api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet", tweetRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

app.get("/home", (req, res)=> {
    res.status(200).json({
        message:"coming from backend..."
    })
})

const PORT  = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server listen at port ${process.env.PORT}`);
});
