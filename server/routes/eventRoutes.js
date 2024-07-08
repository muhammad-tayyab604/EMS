import express from "express";

import {
  create,
  deleteEvent,
  getAll,
  getClientEventFeedbacks,
  getEventById,
  getEventsForOrganizer,
  submitFeedback,
  updateEvent,
  userSpecificEvents,
} from "../controllers/eventsController.js";
import upload from "../utils/uploadConfig.js";
import { protect } from "../middlewares/authMiddleware.js";

const eventRouter = express.Router();

eventRouter.post("/create-event", protect, upload.single("image"), create);
eventRouter.get("/getAll-events", getAll);
eventRouter.get("/get-event/:eventId", getEventById);
eventRouter.put(
  "/update-event/:eventId",
  protect,
  upload.single("image"),
  updateEvent
);
eventRouter.delete("/delete-event/:eventId", protect, deleteEvent);

// Get specific organizer events
eventRouter.get("/specific-organizer-events", protect, getEventsForOrganizer);

// Get specific user's event who paid for that event
eventRouter.get("/specific-user-events/:userId", userSpecificEvents);

// User's Feedbacks
eventRouter.post("/event-feedback/:eventId", submitFeedback);

// Get Feedbacks in organizer dashboard
eventRouter.get("/get-client-feedbacks/:clientId", getClientEventFeedbacks);

export default eventRouter;
