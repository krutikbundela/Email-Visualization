import express from 'express';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import errorMiddleware from "./middleware/errors.js"
import dotenv from "dotenv";
import cors from 'cors';

const app = express();

dotenv.config({ path:"./config/config.env"})
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://email-visualization-frontend.onrender.com/",
    credentials: true,
  })
); // Adjust the frontend URL
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));


import user from "./routes/user.js";
import data from "./routes/data.js";

app.use("/api/v1",user);
app.use("/api/v1",data);

app.use(errorMiddleware);

export default app;