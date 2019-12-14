const router = require("express").Router();
var mongoose = require("mongoose");
let User = require("../../models/User");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const prods = req.body.prods;
  const follows = req.body.follows;

  const newUser = new User({ username, prods, follows });

  newUser
    .save()
    .then(() => res.json(`User added! ${prods},${follows}`))
    .catch(err => res.json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.json("Error: " + err));
});

router.route("/username/:username").get((req, res) => {
  User.findOne({ username: req.params.username })
    .then(user => res.json(user))
    .catch(err => res.json("Error: " + err));
});

router.route("/updateAbout").post((req, res) => {
  if (!req.body.userId) {
    return res.json({ error: "User id is required." });
  }
  if (!req.body.about) {
    return res.json({ error: "User about is required." });
  }

  User.findById(req.body.userId)
    .then(user => {
      if (user != null) {
        user.about = req.body.about;
        user.save(err => {
          if (err) {
            return res.send(
              JSON.stringify({
                error: "Bio could not be updated. Please try again."
              })
            );
          }
          return res.send(
            JSON.stringify({
              message: "Bio updated."
            })
          );
        });
      } else {
        return res.send(
          JSON.stringify({
            error: "User not found."
          })
        );
      }
    })
    .catch(() => {
      return res.send(
        JSON.stringify({
          error: "User bio could not be updated. Please try again later."
        })
      );
    });
});

router.route("/getFollows/:userId").get((req, res) => {
  if (!req.params.userId) {
    return res.json({ error: "User id is required." });
  }

  User.findById(req.params.userId)
    .then(user => {
      if (user.follows) {
        let followerIds = user.follows.map(followerId =>
          mongoose.Types.ObjectId(followerId)
        );

        User.find(
          {
            _id: {
              $in: followerIds
            }
          },
          function (err, users) {
            if (err) {
              return res.send(
                JSON.stringify({
                  error: "Something went wrong."
                })
              );
            }
            return res.json({ follows: users });
          }
        );
      }
    })
    .catch(err => {
      return res.send(
        JSON.stringify({
          error: "User does not exist."
        })
      );
    });
});

router.route("/follow/:userId/:anotherUserId").post((req, res) => {
  if (!req.body.userId) {
    return res.json({ error: "User id is required." });
  }
  if (!req.body.anotherUserId) {
    return res.json({ error: "Another user id is required." });
  }

  User.findById(req.body.userId)
    .then(user => {
      if (user.follows.indexOf(req.body.anotherUserId) > -1) {
        return res.send(
          JSON.stringify({
            error: "User is already being followed."
          })
        );
      } else {
        user.follows.push(req.body.anotherUserId);
        user.save(err => {
          if (err) {
            return res.send(
              JSON.stringify({
                error: "Unable to follow user. Please try again."
              })
            );
          }
          return res.json(`Following successfully`);
        });
      }
    })
    .catch(() => {
      return res.send(
        JSON.stringify({
          error: "Unable to follow user. Please try again later."
        })
      );
    });
});

module.exports = router;
