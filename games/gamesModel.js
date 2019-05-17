const db = require("../database/dbConfig.js");

module.exports = {
    findAll,
    // findById,
    // add,
    // remove
};

function findAll() {
    return db("games");
}