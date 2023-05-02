import express from "express";

import "dotenv/config";
import morgan from "morgan";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import connectDB from "./db/connect.js";

import demoRouter from "./routes/demoRoutes.js";

import rateLimit from "express-rate-limit";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url))

//only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many request from this IP adress, please try again after 15 minutes.'
});

app.use(express.json({ limit: "16mb" }));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(limiter); // Apply the rate limiting middleware to all requests

app.use("/api/v1/demo", demoRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
