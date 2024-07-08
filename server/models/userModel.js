import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "attendee",
  },
  // isAdmin: { type: Boolean, default: false },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
