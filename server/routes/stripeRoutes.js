import express from "express";
import {
  allcoupons,
  createCoupon,
  deleteDiscount,
  fetchOrganizerDiscounts,
  stripePayment,
  stripeSession,
  validateDiscountCode,
} from "../controllers/stripeController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", stripePayment);
stripeRouter.post("/update-event-status", stripeSession);

// Coupon Routes
stripeRouter.post("/create-coupon", authenticateToken, createCoupon);
stripeRouter.get(
  "/organizer-discounts/:organizerId",
  authenticateToken,
  fetchOrganizerDiscounts
);
stripeRouter.delete(
  "/delete-coupon/:couponId",
  authenticateToken,
  deleteDiscount
);
stripeRouter.get("/all-coupons", allcoupons);

// Validate discount code
stripeRouter.post("/discounts-validate", validateDiscountCode);
export default stripeRouter;
