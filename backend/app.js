const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");
const app = express();
const db = require("./models"); // Sequelize models
const http = require("http"); // Import http module
const { Server } = require("socket.io"); // Import socket.io
const userRoutes = require("./Router/user");
const logRoutes = require('./Router/log');

app.use(cors('*'));
require("dotenv").config();

let port = process.env.PORT ? process.env.PORT : 3000; // set the port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ limit: "512mb" }));
app.use(bodyParser.json({ limit: "512mb" }));

// Create HTTP server and integrate with socket.io
const server = http.createServer(app);
const io = new Server(server); // Bind socket.io to the server

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    io.emit("message", message); // Emit message to all clients
  });

  socket.on("clientMessage", (message) => {
    console.log("Message from client: ", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
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

console.log("Environment Variables:", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
});

app.listen(port);
console.log("Magic happens on port " + port);
