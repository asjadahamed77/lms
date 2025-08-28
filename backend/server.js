import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import sequelize from "./config/db.js";
import { securityConfig } from "./config/securityConfig.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import adminStudentRouter from "./routes/adminStudent.js";

// Initialize app
const app = express();
const port = process.env.PORT || 4000;

// Security & middleware
securityConfig(app);
app.use(cookieParser());

// Routes
app.use("/api/admin-students", adminStudentRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API WORKING...");
});

// Error handler (after routes)
app.use(errorHandler);

// DB + Server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Neon PostgreSQL");

    await sequelize.sync(); // ⚠️ use migrations in production
    console.log("Tables synced");

    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
})();
