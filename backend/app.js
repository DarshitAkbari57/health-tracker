const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");
const app = express();
const db = require("./models");
const http = require("http");
const { Server } = require("socket.io");
const userRoutes = require("./Router/user");
const logRoutes = require('./Router/log');
const { Op } = require("sequelize");

app.use(cors('*'));
require("dotenv").config();

let port = process.env.PORT ? process.env.PORT : 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ limit: "512mb" }));
app.use(bodyParser.json({ limit: "512mb" }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let intervalId;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("chartData", (message) => {
    console.log("Message from client: ", message?.view);

    if (intervalId) {
      clearInterval(intervalId);
    }

    if (message) {
      intervalId = setInterval(async () => {
        const dateFilter = message.view === "monthly" ? 30 : 7;

        try {
          const logs = await db.Log.findAll({
            attributes: [
              "moodRating",
              "stressLevel",
              "activityDuration",
              "anxietyLevel",
              "sleepHours",
              "logDate",
            ],
            where: {
              logDate: {
                [Op.gte]: new Date(new Date() - dateFilter * 24 * 60 * 60 * 1000),
              },
            },
            order: [["logDate", "ASC"]],
          });

          socket.emit("chartData", logs);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }, 1000);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
});


// Routes
app.use("/users", userRoutes);
app.use("/logs", logRoutes);

// Sync Database
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Error syncing database:", err.message);
  });

server.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

