import express from "express";
import mongose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/authRoute.js";
import eventRouter from "./routes/eventRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import stripeRouter from "./routes/stripeRoutes.js";

dotenv.config();

const app = express();
const mongoDBURL = "mongodb://localhost:27017/EMS";

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Enable credentials if needed (cookies, authorization headers)
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// Middlewares Ends

// Routes
app.use("/api/auth", router);
app.use("/api/events", eventRouter);
app.use("/api/stripe", stripeRouter);
// Routes Ends

// Mongo DB Connection
mongose
  .connect(mongoDBURL)
  .then(() => console.log("Successfully connected to mongoDB"))
  .catch((error) => console.log(error));

// Mongo DB Connection Ends
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// Server Ends
