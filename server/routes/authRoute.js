import express from "express";
import { getAllUsers, login, signup } from "../controllers/authController.js";
import { adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// admin route
router.get("/admin-dashboard", adminMiddleware);

// getAll users
router.get("/all-users", getAllUsers);

export default router;
