import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import { securityConfig } from "./config/securityConfig.js";
import sequelize from "./config/db.js";

const app = express();
const port = process.env.PORT || 4000;


securityConfig(app);
app.use(express.json());
app.use(cookieParser());


// Default route
app.get("/", (req, res) => {
  res.send("API WORKING...");
});

// DB Connection & Server Start
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Neon PostgreSQL");

    await sequelize.sync(); 
    console.log("Tables synced");

    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
})();

// Error handling middleware
app.use(errorHandler);
