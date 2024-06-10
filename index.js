const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const cron = require("node-cron");

// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 8080;

// database configuration
connectDB();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "3000mb" }));
app.use(express.urlencoded({ limit: "3000mb", extended: true }));
app.use(express.static(path.join(__dirname, "./client/dist")));

// routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/subscribe", require("./routes/payment"));
app.use("/api/v1/cardInfo", require("./routes/cardInfo"));
app.use("/api/v1/admin", require("./routes/admin"));
app.use("/api/v1/documents", require("./routes/documents"));

// rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// Schedule the task to run every day at a specific time, e.g., 10:00 AM
const { notifyUsersWithExpiringCards } = require("./controllers/notification");

cron.schedule("19 17 * * *", () => {
  console.log("Sending mail notification");
  notifyUsersWithExpiringCards();
});

// listen
app.listen(PORT, () => {
  console.log(`Server running on port:  ${PORT}`.bgGreen.white);
});
