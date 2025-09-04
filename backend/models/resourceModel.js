// models/assignmentModel.js
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";
import User from "./userModel.js";
import Subject from "./subjectModel.js";

const Resource = sequelize.define("Resource", {
  resourceId: {
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
}, {
  timestamps: true,
});

// Associations
Resource.belongsTo(User, { as: "lecturer", foreignKey: "lecturerId" });
User.hasMany(Resource, { as: "resources", foreignKey: "lecturerId" });

Resource.belongsTo(Subject, { foreignKey: "subjectId" });
Subject.hasMany(Resource, { foreignKey: "subjectId" });

export default Resource;
