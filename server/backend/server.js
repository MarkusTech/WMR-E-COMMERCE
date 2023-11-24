import app from "./app.js";
import connectToDatabase from "./config/db.js";
import dotenv from "dotenv";

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
dotenv.config();
const port = process.env.PORT;

// Connect to database
connectToDatabase();

const server = app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`.bgCyan);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
