const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON data
app.use(cookieParser());

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

const db = require("./config/mongoose-connection");

const indexRouter = require("./routes/index-router");
const adminRouter = require("./routes/admin-router");

app.use("/", indexRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
