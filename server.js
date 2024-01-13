import "express-async-errors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
// Routers
import jobRouter from "./routes/jobRoutes.js";

// Middlewares
import globalErrorHandlerMiddleware from "./middleware/globalErrorHandlerMiddleware.js";

const app = express();

if (process.env.NODE_ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO WORLD 👋");
});

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req, res) => {
  res
    .status(404)
    .json({ msg: `Can't find ${req.originalUrl} on this server!` });
});

app.use(globalErrorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.DATABASE);
  app.listen(port, () => {
    console.log(`Database connected & server is running on PORT ${port}... 🔑`);
  });
} catch (err) {
  console.log(console.log(err));
  process.getMaxListeners(1);
}
