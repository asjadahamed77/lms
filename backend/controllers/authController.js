import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }
    try {
         // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
       
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
       
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
     
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.json({
        success: true,
        message: "Login successful",
        token, 
        user:  {
            userId: user.userId,
            nameWithInitials: user.nameWithInitials,
            fullName: user.fullName,
            registrationNumber: user.registrationNumber,
            email: user.email,
            role: user.role,
            batchName: user.batchName,
            facultyName: user.facultyName,
            departmentName: user.departmentName
        }
      });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const logout = (req, res) => {
    try {
      res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
      
    }
}