const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
const ConnectDB = require("./config/db");
const router = require("./router/index");

const allowedOrigins = [
  "https://tasklist-beige.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true, // <-- important when using withCredentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
