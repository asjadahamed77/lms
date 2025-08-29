import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";

const Batch = sequelize.define("Batch", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
   
  },
  batchId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
 
    primaryKey: true,
  },
  batchName: {
    type: DataTypes.STRING,
   
  },
  facultyName: {
    type: DataTypes.STRING,
  },
  departmentName: {
    type: DataTypes.STRING,
  },
},{
    timestamps: true,
});

export default Batch;
