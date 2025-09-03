// models/assignmentModel.js
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";
import User from "./userModel.js";
import Subject from "./subjectModel.js";

const Quiz = sequelize.define("Quiz", {
  quizId: {
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
    type: DataTypes.TEXT, // Store as JSON string
    defaultValue: "[]",
    get() {
      const rawValue = this.getDataValue('fileUrl');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('fileUrl', JSON.stringify(value));
    }
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
Quiz.belongsTo(User, { as: "lecturer", foreignKey: "lecturerId" });
User.hasMany(Quiz, { as: "quizzes", foreignKey: "lecturerId" });

Quiz.belongsTo(Subject, { foreignKey: "subjectId" });
Subject.hasMany(Quiz, { foreignKey: "subjectId" });

export default Quiz;
