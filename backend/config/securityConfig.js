import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import express from "express";

// Custom sanitization middleware
const customSanitize = (req, res, next) => {
  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== "object") return obj;

    const sanitized = Array.isArray(obj) ? [] : {};
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith("$")) continue; // remove MongoDB-style operators
      sanitized[key] =
        typeof value === "object" && value !== null
          ? sanitizeObject(value)
          : value;
    }
    return sanitized;
  };

  req.sanitizedQuery = sanitizeObject(req.query);
  req.sanitizedBody = sanitizeObject(req.body);

  next();
};

export const securityConfig = (app) => {
  // 1. CORS
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // 2. Secure headers
  app.use(helmet());

  // 3. Rate limiting
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 200,
    message: "Too many requests from this IP, please try again later.",
  });
  app.use("/api", limiter);

  // 4. Parse JSON
  app.use(express.json());

  // 5. Sanitization
  app.use(customSanitize);

  // 6. Prevent HTTP param pollution
  app.use(hpp());
};
