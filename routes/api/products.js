const router = require("express").Router();
let Product = require("../../models/Product");

router.route("/").get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json("Error:" + err));
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
  newProduct
    .save()
    .then(() => res.json("Product Added!"))
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json("Error: " + err));
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
        .catch(err => res.status(400).json("Error:" + err));
    })
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/category/:categoryname").get((req, res) => {
  Product.find({ category: req.params.categoryname })
    .then((products) => {
      return res.json(products)
    })
    .catch(err => {
      return res.status(400).json("Error:" + err)
    });
})

module.exports = router;
