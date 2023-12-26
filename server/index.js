const dotenv = require("dotenv").config();
const db = require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Router = require("./router/router");

const { mail } = require("./controller/taskmanager")

app.use(cors());

app.use(express.json());
db;
// mail()
app.use("/", Router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(process.env.PORT, (req, res) => {
  console.log(`app listen at ${process.env.PORT}`);
});
