const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "test") {
  mongoose.connect("mongodb://localhost/APIAuthenticationTEST", {
    useNewUrlParser: true
  });
} else {
  mongoose
    .connect("mongodb://localhost:27017/APIAuthentication", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("connected to the mongodb ....."))
    .catch(err => console.error(err.message));
}

const app = express();
app.use(passport.initialize());
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Routes
app.use("/users", require("./routes/users"));

module.exports = app;
