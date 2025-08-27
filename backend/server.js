import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173','http://localhost:5174'];

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => {
    res.send("API WORKING...");
  });
  
  app.listen(port, () => console.log(`Server Started on Port ${port}`));