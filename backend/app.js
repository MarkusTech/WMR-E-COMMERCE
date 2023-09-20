import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import colors from "colors";

// DOTENV CONFIG
dotenv.config();
colors;
const port = process.env.PORT;

// REST OBJ
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// IMPORT API ROUTES

// GET REQUEST
app.get("/", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});

// API ROUTES

// ERROR HANDLING

export default app;
