const { Feature } = require("../../db-access/products");

exports.retrieveAllForProductId = productId => {
  return Style.find({ productId }).select({
    productId: 1,
    style_id: 1,
    name: 1,
    original_price: 1,
    sale_price: 1,
    default: 1
  });
};
