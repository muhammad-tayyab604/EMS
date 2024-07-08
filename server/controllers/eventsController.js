import { Event } from "../models/eventModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Create Event
export const create = async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ error: "Not authorized, token missing or invalid" });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Authorization Header:", token); // Log authorization header for debugging
    console.log("Decoded User:", req.user); // Log decoded user for debugging
    // if (req.user.role !== "Organizer") {
    //   return res
    //     .status(403)
    //     .json({ error: "Only organizers can create events" });
    // }

    const organizerId = req.user._id;
    const newEvent = await Event.create({
      image: req.file.path,
      title: req.body.title,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      venue: req.body.venue,
      city: req.body.city,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      organizer: organizerId,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({ error: "Unable to create event" });
  }
};

// Get All Events
export const getAll = async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.find().populate("organizer");

    // Send the events as a response
    res.status(200).json(events);
  } catch (error) {
    // Log the error to the console for debugging purposes
    console.error(error);

    // Send a 500 Internal Server Error response with a generic error message
    res.status(500).json({ error: "Unable to fetch events" });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  try {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ error: "Not authorized, token missing or invalid" });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const organizerId = req.user._id;

    // Create an object to hold the updated data
    let updatedData = {
      title: req.body.title,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      venue: req.body.venue,
      city: req.body.city,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      organizer: organizerId,
    };

    // Add image path to updated data if file is uploaded
    if (req.file) {
      updatedData.image = req.file.path;
    }

    // Find the event by ID and update it
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true, // This returns the updated document
      runValidators: true, // This ensures the update follows the schema validation
    });

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update event" });
  }
};

// Get single event
export const getEventById = async (req, res) => {
  const eventId = req.params.eventId;
  console.log(eventId.title);
  try {
    const event = await Event.findById(eventId).populate("organizer");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Delete the Event
export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    // Find the event by ID and remove it from the database
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event deleted successfully", deletedEvent });
  } catch (error) {
    // Log the error to the console for debugging purposes
    console.error(error);

    // Send a 500 Internal Server Error response with a generic error message
    res.status(500).json({ error: "Unable to delete event" });
  }
};

// Get event for specific organizer
export const getEventsForOrganizer = async (req, res, next) => {
  try {
    const organizerId = req.user._id;
    console.log(organizerId);

    const events = await Event.find({
      organizer: organizerId,
    })
      .populate("attendees")
      .populate({
        path: "feedbacks.user",
        select: "username",
      });
 const totalEvents = events.length;
    res.status(200).json({
      status: "success",
      totalEvents,
      events,
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific user's events
export const userSpecificEvents = async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await Event.find({ attendees: userId }).populate(
      "organizer",
      "username"
    );

    res.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// User's Feedback
export const submitFeedback = async (req, res) => {
  const { eventId } = req.params;
  const { userId, rating, comment } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const eventEndTime = new Date(`${event.date}`);
    if (new Date() < eventEndTime) {
      return res
        .status(400)
        .json({ error: "Cannot give feedback before the event ends" });
    }

    // Check if the user has already submitted feedback
    const existingFeedback = event.feedbacks.find(
      (feedback) => feedback.user.toString() === userId.toString()
    );
    if (existingFeedback) {
      return res
        .status(400)
        .json({ error: "Feedback already submitted for this event" });
    }

    // Add new feedback
    event.feedbacks.push({ user: userId, rating, comment });
    await event.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get feedbacks in organizer dashboard

export const getClientEventFeedbacks = async (req, res) => {
  const { clientId } = req.params;
  try {
    const events = await Event.find({ organizer: clientId }).populate(
      "feedbacks"
      // "username"
    );
    const clientFeedbacks = events.reduce((acc, event) => {
      event.feedbacks.forEach((feedback) => {
        acc.push({ ...feedback._doc, eventTitle: event.title });
      });
      return acc;
    }, []);
    res.json(clientFeedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
