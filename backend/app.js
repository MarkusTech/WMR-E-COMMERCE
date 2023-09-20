import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import colors from "colors";

// dotenv config
dotenv.config();
colors;

// REST OBJ
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// Set the limit for the request body size to 50MB
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// IMPORT API ROUTES

// GET REQUEST
app.get("/", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});

// API ROUTES

// ERROR HANDLING

export default app;
