require("dotenv").config();

const server = require("./api/server.js");

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n=== Hey Girl! We're live at http://localhost:${port} ===\n`);
});
