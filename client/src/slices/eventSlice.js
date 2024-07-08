import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for async actions
export const fetchEvents = createAsyncThunk("events/getAllEvents", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/events/getAll-events"
  );
  return response.data;
});

export const getSingleEvent = createAsyncThunk(
  "events/getEvent",
  async (eventId) => {
    const response = await axios.get(
      `http://localhost:8000/api/events/get-event/${eventId}`
    );
    return response.data;
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/events/create-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Failed to create event");
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ eventId, formData }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8000/api/events/update-event/${eventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Failed to update event");
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.delete(
        `http://localhost:8000/api/events/delete-event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Headers:", {
        Authorization: `Bearer ${token}`,
      });

      return eventId;
    } catch (error) {
      console.error("Delete Event Error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrganizerEvents = createAsyncThunk(
  "events/getOrganizerEvents",
  async (_, { getState }) => {
    const { auth } = getState();
    const token = auth.token;

    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(
      "http://localhost:8000/api/events/specific-organizer-events",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.events;
  }
);

export const fetchUserEvents = createAsyncThunk(
  "events/fetchUserEvents",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/events/specific-user-events/${userId}`
      );
      return response.data.events; // Assuming response.data contains an array of events
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Feedback
export const submitFeedback = createAsyncThunk(
  "events/submitFeedback",
  async ({ eventId, feedback }, { getState }) => {
    try {
      const token = localStorage.getItem("token");
      const state = getState();
      const userId = state.auth.user._id; // Assuming user ID is stored in auth slice
      const response = await axios.post(
        `http://localhost:8000/api/events/event-feedback/${eventId}`,
        { ...feedback, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Failed to submit feedback");
    }
  }
);

// Get Feedbacks
export const fetchClientEventFeedbacks = createAsyncThunk(
  "events/fetchClientEventFeedbacks",
  async (clientId) => {
    const response = await axios.get(
      `http://localhost:8000/api/events/get-client-feedbacks/${clientId}`
    );
    return response.data;
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    organizers: {},
    clientFeedbacks: [],
    event: null,
    status: "idle",
    error: null,
    // organizerIds: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOrganizerEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrganizerEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.organizerEvents = action.payload;
      })
      .addCase(fetchOrganizerEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(getSingleEvent.fulfilled, (state, action) => {
        console.log("Fetched event:", action.payload);
        state.status = "success";
        state.event = action.payload;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event._id === action.payload._id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(fetchUserEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch user events";
      })
      .addCase(submitFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Optionally update state if needed
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchClientEventFeedbacks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientEventFeedbacks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientFeedbacks = action.payload;
      })
      .addCase(fetchClientEventFeedbacks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
