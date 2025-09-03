// models/assignmentModel.js
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";
import User from "./userModel.js";
import Subject from "./subjectModel.js";

const Assignment = sequelize.define("Assignment", {
  assignmentId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  fileUrl: {
    type: DataTypes.STRING, 
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  batchName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departmentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Associations
Assignment.belongsTo(User, { as: "lecturer", foreignKey: "lecturerId" });
User.hasMany(Assignment, { as: "assignments", foreignKey: "lecturerId" });

Assignment.belongsTo(Subject, { foreignKey: "subjectId" });
Subject.hasMany(Assignment, { foreignKey: "subjectId" });

export default Assignment;
