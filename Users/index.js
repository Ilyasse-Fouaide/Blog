const express = require("express");
const db = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors = require("cors");

// variable envirement
dotenv.config();

// * --- set up the Database ---
db.connect();

// * --- set up the server ---
const app = express();
app.listen(process.env.PORT, () => console.log("http://localhost:" + process.env.PORT));

// * --- middleware functions ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.ORI,
  credentials: true
}));
app.use("/upload/images", express.static(__dirname + '/upload/images'));

// * --- set up the Routes ---
app.use("/", require("./routes/user.routes"));
app.use("/", require("./routes/blog.routes.js"))
