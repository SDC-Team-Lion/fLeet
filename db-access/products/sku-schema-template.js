module.exports = { styleId: Number, size: String, quantity: Number };
/*
db.products.aggregate([
  { $match: { id: 1 } },
  { $project: { _id: 0, __v: 0 } },
  {
    $lookup: {
      from: "styles",
      "let": {"style_id":"$style_id"},
      pipeline: [
        { $match: { productId: 1 } },
        { $project: { _id: 0, __v: 0, productId: 0 } },
        {
          $lookup: {
            from: "skus",
            pipeline: [
              { $match: { styleId: "$style_id" } },
              { $project: { size: 1, quantity: 1, style_id: 1 } }
            ],
            as: "skus"
          }
        }
      ],
      as: "results"
    }
  }
]);
*/

//from: "styles",localField:"styleId",foreignField:"style_id",as:"skus"

/*
db.products.aggregate([
  { $match: { id: 1 } },
  { $project: { _id: 0, __v: 0 } },
  {
    $lookup: {
      from: "styles",
      pipeline: [
        { $match: { productId: 1 } },
        { $project: { _id: 0, __v: 0, productId: 0 } },
        {
          $lookup: {
from: "styles",localField:"styleId",foreignField:"style_id",as:"skus"
          }
        }
      ],
      as: "results"
    }
  }
]);
*/
