const router = require("express").Router();
let User = require("../../models/User");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const prods = req.body.prods;
  const follows = req.body.follows;

  const newUser = new User({ username, prods, follows });

  newUser
    .save()
    .then(() => res.json(`User added! ${prods},${follows}`))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
