// models/userModel.js
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
   
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
  
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  nameWithInitials: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      len: [0, 20]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 255]
    }
  },
  role: {
    type: DataTypes.ENUM("admin", "lecturer", "student"),
    defaultValue: "student",
  },
  batchName: { 
    type: DataTypes.STRING,
    validate: {
      len: [0, 50]
    }
  },
  facultyName: { 
    type: DataTypes.STRING,
    validate: {
      len: [0, 100]
    }
  },
  departmentName: { 
    type: DataTypes.STRING,
    validate: {
      len: [0, 100]
    }
  },
  lastLogin: { type: DataTypes.DATE },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  timestamps: true,
  tableName: 'users'
});

export default User;