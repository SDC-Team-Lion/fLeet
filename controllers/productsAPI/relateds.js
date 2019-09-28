const { Related } = require("../../models/productsAPI");

exports.getAllForProductId = (req, res) => {
  let productId = Number(req.params.product_id);
  Related.retrieveAllForProductId(productId)
    .then(docs => {
      res.status(200).send(docs);
    })
    .catch(console.error);
};
