const { Feature } = require("../../db-access/products");

exports.retrieveAllForProductId = productId => {
  return Feature.find({ productId }).select({
    feature: 1,
    value: 1
  });
};
