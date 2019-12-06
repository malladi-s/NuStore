var createError = require("http-errors");
var express = require("express");
var expressSession = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

if (!process.env.isHeroku) {
  require("dotenv").config();
}

var app = express();

const authenticationRouter = require("./routes/api/authentication");

mongoose.connect("mongodb://localhost/test");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/dist")));

app.use(
  expressSession({
    name: "server-session-cookie-id",
    resave: false,
    secret: process.env.expressSessionSecret,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/authentication", authenticationRouter);

app.get("/", function(req, res) {
  res.render("index");
});

const User = require("./models/user");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
