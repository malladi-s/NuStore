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
const GithubStrategy = require("passport-github").Strategy;
const AmazonStrategy = require("passport-amazon").Strategy;
var debug = require("debug")("nustore:server");
var http = require("http");
const Message = require("./models/Message");

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
const messagesRouter = require("./routes/api/messages");
const productRouter = require("./routes/api/products");
const userRouter = require("./routes/api/users");

app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("/");
  }
);

app.get(
  "/auth/amazon",
  passport.authenticate("amazon", {
    scope: ["profile"]
  })
);
app.get(
  "/auth/amazon/callback",
  passport.authenticate("amazon"),
  (req, res) => {
    res.redirect("/");
  }
);

app.use("/api/messages", messagesRouter);
app.use("/api/authentication", authenticationRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.get("/", function(req, res) {
  res.render("index");
});

var listOfUsersOnline = [];

io.on("connection", function(socket) {
  const username = socket.handshake.query.username;

  console.log(`${username} connected.`);

  listOfUsersOnline.push(username);
  socket.broadcast.emit("listOfOnlineUsers", listOfUsersOnline);
  io.to(socket.id).emit("listOfOnlineUsers", listOfUsersOnline);

  socket.on("client:message", data => {
    console.log(`${data.from}: ${data.text}`);
    // message received from client, now broadcast it to everyone else
    socket.broadcast.emit("server:message", data);

    let newMessage = new Message({
      ...data,
      id: data.id || new Date().getTime()
    });

    newMessage.save();
  });

  socket.on("disconnect", () => {
    console.log(`${username} disconnected`);

    var index = listOfUsersOnline.indexOf(username);
    if (index > -1) {
      listOfUsersOnline.splice(index, 1);
    }
    socket.broadcast.emit("listOfOnlineUsers", listOfUsersOnline);
  });
});

const User = require("./models/user");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, cb) => {
  User.serializeUser();
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  User.deserializeUser();
  cb(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      failureRedirect: "/"
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.use(
  new AmazonStrategy(
    {
      clientID: process.env.AMAZON_CLIENT_ID,
      clientSecret: process.env.AMAZON_CLIENT_SECRET,
      callbackURL: "/auth/amazon/callback",
      failureRedirect: "/"
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

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
