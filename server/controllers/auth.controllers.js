import User from "../models/user.model.js";
import { genToken } from "../config/token.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    //Validating user details
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    //Validating email
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be of atleast 6 characters" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await genToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    console.log(token);
    console.log(newUser);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { name, password } = req.body;
    if (!name || !password)
      return res.status(400).json({ message: "All fields are required" });
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
  }
}
