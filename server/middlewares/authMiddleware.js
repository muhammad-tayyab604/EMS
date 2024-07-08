import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Log decoded token for debugging

      req.user = await User.findById(decoded._id).select("-password");
      if (!req.user) {
        throw new Error("User not found");
      }

      console.log("Authenticated user:", req.user); // Log authenticated user for debugging
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token found" });
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Admin Middleware
export const adminMiddleware = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Access forbidden" });
  }
  next();
};
