const { Product } = require("../../db-access/products");

exports.retrieve = (count, page) => {
  return Product.find({})
    .skip(count * page)
    .limit(count)
    .select({
      _id: 0,
      __v: 0
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
  ]).then(docs => docs[0]);
};

//db.products.aggregate([{$match:{id:1}},{$project:{"_id":0,"__v":0}},{$lookup: { from: "features",pipeline:[{$match:{productId:1}},{$project:{"_id":0,"__v":0, "productId":0}}],as:"features"}}])
