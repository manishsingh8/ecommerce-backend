const express = require("express");
const cors = require("cors");

const createGraphQLServer = require("./graphql/schema");

const app = express();

app.use(cors());
app.use(express.json());

createGraphQLServer(app);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

module.exports = app;
