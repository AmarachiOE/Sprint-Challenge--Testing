const db = require("../database/dbConfig.js");

module.exports = {
  findAll,
  findById,
  add,
  remove
};

function findAll() {
  return db("games");
}

function findById(id) {
  return db("games")
    .where({ id })
    .first();
}

async function add(game) {
  const ids = await db("games").insert(game, "id");

  return db("games")
    .where({ id: ids[0] })
    .first();
}

function remove(id) {
  return db("games")
    .where({ id })
    .del();
}
