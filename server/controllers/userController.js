import bcrypt from "bcryptjs";
import  User  from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, usertype } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            usertype: usertype || "user",
        });

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                usertype: user.usertype,
                balance: user.balance,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Login

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = generateToken(user);

        res.json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                usertype: user.usertype,
                balance: user.balance,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Profile

export const getProfile = async (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
};