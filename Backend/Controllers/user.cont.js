import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "4h" });
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        const UserExists = await User.findOne({ email });
        if (UserExists) {
            return res.status(400).json({ message: "User Already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            req.res.status(500).json({message:"Invalid Email or Password"})
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getprofile = async (req, res) => {
    try {
        const user=await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(500).json({message:"User Not Found"});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}