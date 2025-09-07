import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";

const Announcement = sequelize.define("Announcement", {
    announcementId: {
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
}, {
    timestamps: true,
} )

export default Announcement;