// models/subjectModel.js
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";
import User from "./userModel.js";
import Batch from "./batchModel.js";

const Subject = sequelize.define(
  "Subject",
  {
    
    subjectId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true,
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 150],
      },
    },
    subjectCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 20],
      },
    },
    subjectSemester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 8,
      },
    },
    facultyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batchName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    
  }
);

// Associations
// Each subject belongs to a batch
Subject.belongsTo(Batch, { foreignKey: "batchId" });
Batch.hasMany(Subject, { foreignKey: "batchId" });

// Each subject is taught by one lecturer (User with role=lecturer)
Subject.belongsTo(User, { as: "lecturer", foreignKey: "lecturerId" });
User.hasMany(Subject, { as: "lecturerSubjects", foreignKey: "lecturerId" });

export default Subject;
