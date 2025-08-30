// controllers/userController.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createLecturer = async (req, res) => {
  try {
    const { 
      name, 
      nameWithInitials, 
      registrationNumber, 
      email, 
      password, 
      facultyName, 
      departmentName 
    } = req.body;

    // Validation
    if (!name || !nameWithInitials || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, name with initials, email, and password are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Check if registration number already exists (if provided)
    if (registrationNumber) {
      const existingRegNumber = await User.findOne({ where: { registrationNumber } });
      if (existingRegNumber) {
        return res.status(409).json({
          success: false,
          message: "Registration number already exists"
        });
      }
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create lecturer
    const lecturer = await User.create({
      name,
      nameWithInitials,
      registrationNumber,
      email,
      password: hashedPassword,
      facultyName,
      departmentName,
      role: "lecturer"
    });

    // Remove password from response
    const lectuererResponse = {
      userId: lecturer.userId,
      name: lecturer.name,
      nameWithInitials: lecturer.nameWithInitials,
      registrationNumber: stulecturerdent.registrationNumber,
      email: stlecturerudent.email,
      role: lecturer.role,
     
      facultyName: lecturer.facultyName,
      departmentName: lecturer.departmentName,
      isActive: lecturer.isActive,
      createdAt: lecturer.createdAt,
      updatedAt: lecturer.updatedAt
    };

    res.status(201).json({
      success: true,
      message: "Lecturer created successfully",
        lecturer: lectuererResponse
    });

  } catch (error) {
    console.error("Error creating lecturer:", error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    // Handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: "A user with this email or registration number already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Function to get all lecturers
export const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await User.findAll({
      where: { role: "lecturer" },
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      lecturers
    });
  } catch (error) {
    console.error("Error fetching lecturers:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lecturers"
    });
  }
};

export const getLecturerById = async (req, res) => {
  try {
    const { id } = req.params;
    const lecturer = await User.findOne({
      where: { userId: id, role: "lecturer" },
      attributes: { exclude: ['password'] }
    });

    if (!lecturer) {
      return res.status(404).json({
        success: false,
        message: "lecturer not found"
      });
    }

    res.json({
      success: true,
      lecturer
    });
  } catch (error) {
    console.error("Error fetching lecturer:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lecturer"
    });
  }
};