const { Style } = require("../../models/productsAPI");

exports.getAllForProductId = (req, res) => {
  let productId = Number(req.params.product_id);
  Style.retrieveAllForProductId(productId)
    .then(docs => {
      res.status(200).send(docs);
    })
    .catch(console.error);
};
