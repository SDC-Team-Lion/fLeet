const { Related } = require("../../db-access/products");

exports.retrieveAllForProductId = productId => {
  return Related.find({ current_product_id: productId })
    .select({
      related_product_id: 1,
      _id: 0
    })
    .distinct("related_product_id");
};
