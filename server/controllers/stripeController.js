import { Event } from "../models/eventModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import { authenticateToken } from "../middlewares/authMiddleware.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// controllers/stripeController.js
export const stripePayment = async (req, res) => {
  const { events, eventId, userId, discountId } = req.body;

  const eventsArray = Array.isArray(events) ? events : [events];

  const lineItems = eventsArray.map((event) => ({
    price_data: {
      currency: "pkr",
      product_data: {
        name: event.title,
        description: event.description,
        images: ["./uploads/" + event.image], // Ensure the path is correct
      },
      unit_amount: Math.round(event.price * 100),
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      discounts: discountId ? [{ coupon: discountId }] : [],
      metadata: {
        eventId: eventId, // Correctly pass eventId
        userId: userId, // Correctly pass userId
      },
      success_url:
        "http://localhost:5173/success-payment?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const stripeSession = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const eventId = session.metadata.eventId;
    const userId = session.metadata.userId;

    const eventToUpdate = await Event.findById(eventId);

    if (!eventToUpdate) {
      return res.status(404).json({ error: "Event not found" });
    }
    eventToUpdate.attendees.push(userId);

    // Update event status to 'paid' if it's not already paid
    if (eventToUpdate.status !== "paid") {
      eventToUpdate.status = "paid";
      await eventToUpdate.save();
    }
    // if (!eventToUpdate.attendees.includes(userId)) {
    eventToUpdate.attendees.push(userId);
    await eventToUpdate.save();
    // }

    res.status(200).json({ message: "Event status updated to 'paid'" });
  } catch (error) {
    console.error("Error updating event status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createCoupon = async (req, res) => {
  const { percent_off, amount_off, duration, currency, max_redemptions } =
    req.body;
  const organizerId = req.user._id; // Ensure req.user is set by middleware

  // Validate duration
  if (!["once", "repeating", "forever"].includes(duration)) {
    return res.status(400).json({
      error: "Invalid duration: must be one of once, repeating, or forever",
    });
  }

  const couponData = {
    duration,
    metadata: { organizerId },
  };

  if (percent_off) {
    couponData.percent_off = percent_off;
  } else if (amount_off && currency) {
    couponData.amount_off = amount_off * 100;
    couponData.currency = currency;
  }

  if (max_redemptions) {
    couponData.max_redemptions = max_redemptions;
  }

  try {
    const coupon = await stripe.coupons.create(couponData);
    res.status(201).json({ coupon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchOrganizerDiscounts = async (req, res) => {
  const organizerId = req.params.organizerId;

  try {
    // Fetch coupons using the Stripe API
    const coupons = await stripe.coupons.list({ metadata: { organizerId } });
    res.json({ coupons: coupons.data }); // Assuming you want to return the list of coupons
  } catch (error) {
    console.error("Error fetching discounts:", error);
    res.status(500).json({ error: error.message }); // Return internal server error with error message
  }
};

// stripeController.js

export const deleteDiscount = async (req, res) => {
  const { couponId } = req.params;

  try {
    await stripe.coupons.del(couponId);
    res
      .status(200)
      .json({ message: `Coupon ${couponId} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting coupon:", error.message); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};

export const allcoupons = async (req, res) => {
  try {
    const coupons = await stripe.coupons.list({
      limit: 3, // Adjust the limit as needed
    });

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate Discount Code
export const validateDiscountCode = async (req, res) => {
  const { code } = req.body;

  try {
    // List all coupons and find the one matching the provided code
    const coupons = await stripe.coupons.list();

    const discount = coupons.data.find((coupon) => coupon.id === code);

    if (!discount) {
      return res.status(404).json({ message: "Invalid discount code" });
    }

    // Check if the discount is still valid (e.g., check expiry date, if available)
    if (discount.redeem_by && discount.redeem_by < Date.now() / 1000) {
      return res.status(400).json({ message: "Discount code has expired" });
    }

    // Send the discount details back to the client
    res.json({
      id: discount.id,
      amount_off: discount.amount_off,
      percent_off: discount.percent_off,
      duration: discount.duration,
      // redeem_by: discount.redeem_by,
    });
  } catch (error) {
    console.error("Error validating discount code:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
