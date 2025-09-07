import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import sequelize from "./config/db.js";
import { securityConfig } from "./config/securityConfig.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import adminStudentRouter from "./routes/adminStudent.js";
import authRouter from "./routes/auth.js";
import adminBatchRouter from "./routes/adminBatch.js";
import adminLecturerRouter from "./routes/adminLecturer.js";
import adminSubjectRouter from "./routes/adminSubject.js";
import studentRouter from "./routes/student.js";
import assignmentRouter from "./routes/assignmentRoute.js";
import quizRouter from "./routes/quizRoute.js";
import resourceRouter from "./routes/resourceRoute.js";
import submissionRouter from "./routes/submissionRoute.js";
import announcementRouter from "./routes/announcementRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Security & middleware
securityConfig(app);
app.use(cookieParser());




// Routes
app.use("/api/admin-students", adminStudentRouter);
app.use("/api/admin-lecturers", adminLecturerRouter);
app.use("/api/admin-subjects", adminSubjectRouter);
app.use("/api/admin-batch", adminBatchRouter);
app.use("/api/student", studentRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/resource", resourceRouter);
app.use("/api/auth", authRouter);
app.use("/api/submission", submissionRouter);
app.use("/api/ammouncement", announcementRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API WORKING...");
});

// Error handler
app.use(errorHandler);

// DB + Server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Database");

    // Only sync tables in dev (fast startup in prod)
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync();
      console.log("Tables synced (dev mode)");
    }

    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
})();
