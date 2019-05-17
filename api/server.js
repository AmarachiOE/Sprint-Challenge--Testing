// Packages
const express = require("express");

// Data
const games = require("../games/gamesModel.js");

// Server
const server = express();
server.use(express.json());

// Endpoints
server.get("/", async (req, res) => {
    res.status(200).json({ api: "up and running" });
  });


module.exports = server;
