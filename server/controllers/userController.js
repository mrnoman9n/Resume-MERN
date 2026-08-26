import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/resume.js";


const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_TOKEN,
        { expiresIn: "7d" }
    );
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Required missing fields"
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(newUser._id);

        newUser.password = undefined;

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: newUser
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Required missing fields"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id);

        user.password = undefined;

        return res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


export const getUserByID = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "No user found with this id"
            });
        }

        user.password = undefined;

        return res.status(200).json({
            user
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

// conrtoller for getting resumes
// get : /api/users/

export const getUserResume = async (req, res) => {
try {
    const userId = req.userId; 
const resume = await Resume.find({userId})
return res.status(200).json({resume})

    
} catch (error) {
    return res.status(400).json({message : error.message})
}

}

