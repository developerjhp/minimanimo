const express = require('express')
// import express from "express";
const dotenv = require('dotenv')
// import dotenv from "dotenv";
const colors = require('colors')
// import colors from "colors";
const connectDB = require('./config/db')
// import connectDB from "./config/db.js";
const validateRoutes = require('./routes/validateRoutes')
// import validateRoutes from "./routes/validateRoutes.js";
const userRoutes = require('./routes/userRoutes')
// import userRoutes from "./routes/userRoutes.js";
const postRoutes = require('./routes/postRoutes')
// import postRoutes from "./routes/postRoutes.js";
const { errHandler, notFound } = require('./middleware/error')
// import { errHandler, notFound } from "./middleware/error.js";
const cors = require('cors');


dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // body-parser
app.use(
  cors({
    origin: ['http://www.minimanimo.site'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);


app.get("/", (req, res) => {
  res.send("Minimanimo API is running...");
});

// Route Handler Part
app.use("/api/validate", validateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// custom error handler Part
app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 80;

const server = app.listen(PORT, () =>
  console.log(
    colors.magenta.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )
);

// export default server;
module.exports = server;
