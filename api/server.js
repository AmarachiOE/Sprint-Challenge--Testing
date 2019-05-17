// Packages
const express = require("express");

// Data
const games = require("../games/gamesModel.js");

// Server
const server = express();
server.use(express.json());

// Endpoints
server.get("/", (req, res) => {
    res.status(200).json({ api: "up and running" });
  });

server.get("/games", async (req, res) => {
    const data = await games.findAll();
    res.status(200).json(data);
});


module.exports = server;
