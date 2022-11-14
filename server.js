import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
// import cors from "cors";

app.use(express.json());

const port = process.env.PORT || 5000;

import connectDB from "./db/connect.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// routes
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";
import instanceRouter from "./routes/instanceRoutes.js";

// implicitly invoke error-handler middleware
import "express-async-errors";

app.use(express.json());
// app.use(cors())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/instance", instanceRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
