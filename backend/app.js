import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import colors from "colors";
import errorHandler from "./middlewares/error.js";

// dotenv config
dotenv.config();
colors;

// rest obj
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.get("/test", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});
// set the limit for the request body size to 50MB
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// import routes

// api

// it's for ErrorHandling
app.use(errorHandler);

export default app;
