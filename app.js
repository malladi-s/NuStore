const bodyParser = require("body-parser");
var createError = require("http-errors");
var express = require("express");
var expressSession = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var debug = require("debug")("nustore:server");
var http = require("http");

if (!process.env.isHeroku) {
  require("dotenv").config();
}

var app = express();

var port = normalizePort(process.env.port);
app.set("port", port);

var server = http.createServer(app);
var io = require("socket.io")(server);

server.listen(port, function(err) {
  if (err) throw err;
  console.log(`listening on port ${port}`);
});

server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

mongoose.connect("mongodb://localhost/test");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

const authenticationRouter = require("./routes/api/authentication");
const productRouter = require("./routes/api/products");
const userRouter = require("./routes/api/users");

app.use("/api/authentication", authenticationRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.get("/", function(req, res) {
  res.render("index");
});

io.on("connection", function(client) {
  console.log("client connected...", client.id);
  console.log("probably add the client");

  client.on("register", function() {
    console.log("register");
  });

  client.on("join", function() {
    console.log("join");
  });

  client.on("leave", function() {
    console.log("leave");
  });

  client.on("message", function() {
    console.log("message");
  });

  client.on("chatrooms", function() {
    console.log("chatrooms");
  });

  client.on("availableUsers", function() {
    console.log("availableUsers");
  });

  client.on("disconnect", function() {
    console.log("client disconnect...", client.id);
    // handleDisconnect();
  });

  client.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
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
