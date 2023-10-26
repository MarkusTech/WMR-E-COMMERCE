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

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual client origin
  credentials: true, // Allow cookies and other credentials
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.get("/test", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// import routes
import userRoute from "./routes/userRoute.js";
import productRoutes from "./routes/productRoutes.js";

// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoutes);

// it's for ErrorHandling
app.use(errorHandler);

export default app;
