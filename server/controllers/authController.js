import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
// import { createError } from "../utils/appError.js";
import bcrypt from "bcrypt";

// Register a user
export const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.json({
        status: "User already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // JWT (Json Web Token)
    const token = jwt.sign({ _id: newUser._id }, "secretKey123", {
      expiresIn: "90d",
    });
    res.status(201).json({
      status: "success",
      message: "Registration Successfull",
      token,
    });
  } catch (error) {}
};

// Login the registered user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "User not found",
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        status: "Incorrect password",
      });
    }

    // If user exists and password is correct, generate JWT token
    const token = jwt.sign({ _id: user._id }, "secretKey123", {
      expiresIn: "90d",
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};


export const getAllUsers = async(req, res)=>{
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}