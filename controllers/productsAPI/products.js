const { Product } = require("../../models/productsAPI");

exports.getOneById = (req, res) => {
  let productId = Number(req.params.product_id);
  Product.retrieveOne(productId)
    .then(product => {
      res.status(200).send(product);
    })
    .catch(console.error);
};
