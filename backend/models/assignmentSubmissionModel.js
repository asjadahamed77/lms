
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";
import Subject from "./subjectModel.js";
import User from "./userModel.js";

const AssignmentSubmission = sequelize.define("AssignmentSubmission",{
    submissionId: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
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
    batchName: {
        type: DataTypes.STRING,
        allowNull: false,
   
      },
      departmentName: {
        type: DataTypes.STRING,
        allowNull: false,
  
      },
      studentName: {
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      subjectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
        submittedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

    
}, {
    timestamps: true,
} )

// Associations
AssignmentSubmission.belongsTo(User, { as: "lecturer", foreignKey: "lecturerId" });
User.hasMany(AssignmentSubmission, { as: "lecturerSubmissions", foreignKey: "lecturerId" });

AssignmentSubmission.belongsTo(User, { as: "student", foreignKey: "studentId" });
User.hasMany(AssignmentSubmission, { as: "studentSubmissions", foreignKey: "studentId" });

AssignmentSubmission.belongsTo(Subject, { as: "subject", foreignKey: "subjectId" });
Subject.hasMany(AssignmentSubmission, { as: "submissions", foreignKey: "subjectId" });



export default AssignmentSubmission;