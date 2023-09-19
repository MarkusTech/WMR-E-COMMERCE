import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// DOTENV CONFIG
dotenv.config();
const port = process.env.PORT;

// REST OBJ
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// GET REQUEST
app.get("/", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});

// API ROUTES

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
