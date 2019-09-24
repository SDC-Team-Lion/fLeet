const { Product } = require("../../models/productsAPI");

exports.getOneById = (req, res) => {
  let productId = Number(req.params.product_id);
  Product.retrieveOne(productId)
    .then(product => {
      res.status(200).send(product);
    })
    .catch(console.error);
};

exports.getMany = (req, res) => {
  let count = Number(req.query.count || 5);
  let page = Number(req.query.page || 1) - 1;
  console.log(`query - page:${page}, count:${count}`);
  Product.retrieve(count, page)
    .then(products => {
      res.status(200).send(products);
    })
    .catch(console.error);
};
