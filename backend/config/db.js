import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,       // database name
  process.env.DB_USER,       // username
  process.env.DB_PASSWORD,   // password
  {
    host: process.env.DB_HOST, // host
    port: process.env.DB_PORT || 3306, // port (default MySQL port 3306)
    dialect: "mysql",
    logging: false, // optional, can set to console.log
    pool: {
      max: 10,        // maximum number of connections
      min: 0,         // minimum number of connections
      acquire: 30000, // maximum time (ms) to try getting a connection
      idle: 10000     // maximum time (ms) a connection can be idle before release
    }
  }
);

export default sequelize;
