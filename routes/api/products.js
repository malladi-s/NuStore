const router = require("express").Router();
let Product = require("../../models/Product");
let User = require("../../models/User");
let mongoose = require("mongoose");

router.route("/").get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const prodname = req.body.prodname;
  const username = req.body.username;
  const description = req.body.description;
  const price = Number(req.body.price);
  const date = Date.parse(req.body.date);
  const category = req.body.category;
  const image = req.body.image;
  const isSold = req.body.isSold;

  const newProduct = new Product({
    prodname,
    username,
    description,
    price,
    date,
    category,
    image,
    isSold
  });
  newProduct.save(err => {
    if (err) {
      return res.send(
        JSON.stringify({
          error: "Product could not be saved. Please try again."
        })
      );
    }

    User.findOne({ username })
      .then(user => {
        user.products.push(newProduct.id);
        user.save(err => {
          if (err) {
            return res.send(
              JSON.stringify({
                error: "Product could not be saved. Please try again."
              })
            );
          }
          return res.json(`Product added by user ${user.username}`);
        });
      })
      .catch(() => {
        return res.send(
          JSON.stringify({
            error: "Product could not be saved. Please try again."
          })
        );
      });
  });
});

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.prodname = req.body.prodname;
      product.username = req.body.username;
      product.description = req.body.description;
      product.price = Number(req.body.prince);
      product.date = Date.parse(req.body.date);
      product.category = req.body.category;
      product.url = req.body.url;
      product.isSold = req.body.isSold;

      product
        .save()
        .then(() => res.json("Product updates"))
        .catch(err => res.json("Error:" + err));
    })
    .catch(err => res.json("Error:" + err));
});

router.route("/category/:categoryname").get((req, res) => {
  Product.find({ category: req.params.categoryname })
    .then(products => {
      return res.json(products);
    })
    .catch(err => {
      return res.json("Error:" + err);
    });
});

router.route("/wishlist/toggle").post((req, res) => {
  if (!req.body.userId) {
    return res.json({ error: "User id is required." });
  }
  if (!req.body.productId) {
    return res.json({ error: "ProductId id is required." });
  }

  User.findById(req.body.userId)
    .then(user => {
      if (user.wishlist.indexOf(req.body.productId) > -1) {
        user.wishlist.splice(user.wishlist.indexOf(req.body.productId), 1)
        user.save(err => {
          if (err) {
            return res.send(
              JSON.stringify({
                error: "Wishlist could not be updated. Please try again."
              })
            );
          }
          return res.json(`Product removed from wishlist by ${user.username}`);
        });
      } else {
        user.wishlist.push(req.body.productId);
        user.save(err => {
          if (err) {
            return res.send(
              JSON.stringify({
                error: "Wishlist could not be updated. Please try again."
              })
            );
          }
          return res.json(`Product added by wishlist by ${user.username}`);
        });
      }
    })
    .catch(() => {
      return res.send(
        JSON.stringify({
          error:
            "Product could not be added to wishlist. Please try again later."
        })
      );
    });
});

router.route("/isInWishlist/:productId").get((req, res) => {
  if (!req.query.userId) {
    return res.json({ error: "User id is required." });
  }
  if (!req.params.productId) {
    return res.json({ error: "Product id is required." });
  }

  User.findById(req.query.userId)
    .then(user => {
      if (user.wishlist.indexOf(req.params.productId) > -1) {
        return res.send(
          JSON.stringify({
            isInWishList: true
          })
        );
      } else {
        return res.send(
          JSON.stringify({
            isInWishList: false
          })
        );
      }
    })
    .catch(() => {
      return res.send(
        JSON.stringify({
          error: "User does not exist."
        })
      );
    });
});

router.route("/wishlist/:userId").get((req, res) => {
  if (!req.params.userId) {
    return res.json({ error: "User id is required." });
  }

  User.findById(req.params.userId)
    .then(user => {
      if (user.wishlist) {
        let productIdsArray = user.wishlist.map(productId =>
          mongoose.Types.ObjectId(productId)
        );

        Product.find(
          {
            _id: {
              $in: productIdsArray
            }
          },
          function(err, products) {
            if (err) {
              return res.send(
                JSON.stringify({
                  error: "Something went wrong."
                })
              );
            }
            return res.json({ wishlist: products });
          }
        );
      }
    })
    .catch(() => {
      return res.send(
        JSON.stringify({
          error: "User does not exist."
        })
      );
    });
});

router.route("/search/:random").get((req, res) => {
  var val = ".*" + req.params.random + ".*";
  Product.find({ prodname: { $regex: val } })
    .then(products => {
      return res.json(products);
    })
    .catch(err => {
      return res.send(
        JSON.stringify({
          error: "Error in search."
        })
      );
    });
});

router.route("/posted/:username").get((req, res) => {
  Product.find({ username: req.params.username })
    .then(products => {
      return res.json(products);
    })
    .catch(err => {
      return res.send(
        JSON.stringify({
          error: "Error in search."
        })
      );
    });
});

module.exports = router;
