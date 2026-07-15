const express = require("express");
const cors = require("cors");

const createGraphQLServer = require("./graphql/schema");

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());

createGraphQLServer(app);

app.get("/", (req, res) => {
  res.send("API Running 🚀 updated");
});

module.exports = app;
