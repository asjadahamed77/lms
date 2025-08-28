import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import hpp from "hpp";

export const securityConfig = (app) => {
  // 1. Secure HTTP headers
  app.use(helmet());

  // 2. CORS (allow frontend URL only)
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173", 
      credentials: true,
    })
  );

  // 3. Rate limiting (prevent brute-force attacks)
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 200, // limit each IP to 200 requests per window
    message: "Too many requests from this IP, please try again later.",
  });
  app.use("/api", limiter);

  // 4. Prevent NoSQL injection
  app.use(mongoSanitize());

  // 5. Prevent XSS attacks
  app.use(xssClean());

  // 6. Prevent HTTP parameter pollution
  app.use(hpp());

  // 7. JSON limit
  app.use(express.json({ limit: "10kb" }));
};
