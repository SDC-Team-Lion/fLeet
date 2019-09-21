const { Product } = require("../../db-access/products");

exports.retrieveAll = (count = 1) => {
  return Product.find({})
    .limit(count)
    .select({
      id: 1,
      name: 1,
      slogan: 1,
      description: 1,
      category: 1,
      default_price: 1
    });
};

exports.retrieveOne = id => {
  return Product.findOne({ id }).select({
    id: 1,
    name: 1,
    slogan: 1,
    description: 1,
    category: 1,
    default_price: 1
  });
};
