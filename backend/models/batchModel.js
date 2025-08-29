import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";

const Batch = sequelize.define("Batch", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
   
  },
  batchID: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  batchName: {
    type: DataTypes.STRING,
   
  },
  facultyName: {
    type: DataTypes.STRING,
    unique: true,
  },
  departmentName: {
    type: DataTypes.STRING,
    unique: true,
  },
},{
    timestamps: true,
});

export default Batch;
