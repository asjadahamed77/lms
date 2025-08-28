// db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,       // Neon requires SSL
      rejectUnauthorized: false
    }
  },
  logging: false, // turn off SQL logs (optional)
});

export default sequelize;
