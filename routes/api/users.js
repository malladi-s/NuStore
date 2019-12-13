const router = require("express").Router();
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

module.exports = router;
