import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameWithInitials: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("student", "lecturer", "admin"),
    defaultValue: "student",
  },
  batchName: { type: DataTypes.STRING },
  facultyName: { type: DataTypes.STRING },
  departmentName: { type: DataTypes.STRING },
  lastLogin: { type: DataTypes.DATE },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
},{
    timestamps: true,
});

 export default User;