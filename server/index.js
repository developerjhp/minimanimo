import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import validateRoutes from "./routes/validateRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errHandler, notFound } from "./middleware/error.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // body-parser

app.get("/", (req, res) => {
  res.send("Minimanimo API is running...");
});

// Route Handler Part
app.use("/api/validate", validateRoutes);
app.use("/api/users", userRoutes);

// custom error handler Part
app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    colors.magenta.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )
);

export default server;
