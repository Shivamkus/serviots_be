const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
const ConnectDB = require("./config/db");
const router = require("./router/index");

app.use(
  cors({
    // origin: "https://tasklist-beige.vercel.app/",
    // origin: "*",

    origin: ["https://tasklist-beige.vercel.app/", "http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use(`/api/v1`, router);

ConnectDB();

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error on Running Server`, err);
  } else {
    console.log(`Server is Running On Port: ${PORT}`);
  }
});
