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

server.post("/games", (req, res) => {
  const newGame = req.body;
  if (!newGame || !newGame.title || !newGame.genre) {
    res
      .status(422)
      .json({ error: "You must include a game with a title and genre." });
  } else {
    games
      .add(newGame)
      .then(game => {
        res.status(201).json(game);
      })
      .catch(err => {
        res.status(500).json({ error: "Error adding game." });
      });
  }
});

module.exports = server;
