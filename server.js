const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

// Schema must be before passport here!
require("./models/User");
require("./services/passport");

// Routes
const authRoutes = require("./routes/api/authRoutes");

mongoose.connect(keys.mongoURL);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth/google", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Express server listening on port 5000");
});
