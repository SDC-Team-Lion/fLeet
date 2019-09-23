const { Product } = require("../../db-access/products");

exports.retrieve = (count = 1) => {
  return Product.find({})
    .limit(count)
    .select({
      _id: 0
    });
};

exports.retrieveOne = id => {
  // return Product.findOne({ id }).select({
  //   _id: 0
  // });
  return Product.aggregate([
    { $match: { id: id } },
    { $project: { _id: 0, __v: 0 } },
    {
      $lookup: {
        from: "features",
        pipeline: [
          { $match: { productId: id } },
          { $project: { _id: 0, __v: 0, productId: 0 } }
        ],
        as: "features"
      }
    }
  ]);
};

//db.products.aggregate([{$match:{id:1}},{$project:{"_id":0,"__v":0}},{$lookup: { from: "features",pipeline:[{$match:{productId:1}},{$project:{"_id":0,"__v":0, "productId":0}}],as:"features"}}])
