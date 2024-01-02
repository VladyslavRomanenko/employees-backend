const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const authRouter = require("./routes/auth/auth");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

// const { PORT } = process.env;

// app.listen(PORT, console.log("SET"));

module.exports = app;
