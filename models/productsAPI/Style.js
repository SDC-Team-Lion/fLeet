const { Style } = require("../../db-access/products");

exports.retrieveAllForProductId = productId => {
  return Style.aggregate([
    { $match: { productId } },
    {
      $project: {
        "default?": "$default",
        style_id: 1,
        name: 1,
        original_price: 1,
        sale_price: 1,
        _id: 0
      }
    },
    {
      $lookup: {
        from: "skus",
        let: { styleIdForStyle: "$style_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$styleIdForStyle", "$styleId"] } } },
          {
            $replaceRoot: {
              newRoot: {
                $arrayToObject: [
                  [
                    {
                      k: "$size",
                      v: "$quantity"
                    }
                  ]
                ]
              }
            }
          },
          { $project: { _id: 0, __v: 0 } }
        ],
        as: "skus"
      }
    },
    {
      $lookup: {
        from: "photos",
        let: { styleIdForStyle: "$style_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$styleIdForStyle", "$styleId"] } } },
          { $project: { _id: 0, __v: 0, styleId: 0 } }
        ],
        as: "photos"
      }
    }
  ]).then(docs => ({ product_id: productId, results: docs }));
};

/*
db.styles.aggregate([
    { $match: { productId: 2 } },
    {
      $project: {
        "default?": "$default",
        style_id: 1,
        name: 1,
        original_price: 1,
        sale_price: 1,
        _id: 0
      }
    },
    {
      $lookup: {
        from: "skus",
        let: { styleIdForStyle: "$style_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$styleIdForStyle", "$styleId"] } } },
          {
            $replaceRoot: {
              newRoot: {
                $arrayToObject: [
                  [
                    {
                      k: "$size",
                      v: "$quantity"
                    }
                  ]
                ]
              }
            }
          },
          { $project: { _id: 0, __v: 0  } }
        ],
        as: "skus"
      }
    },
    {
      $lookup: {
        from: "photos",
        let: { styleIdForStyle: "$style_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$styleIdForStyle", "$styleId"] } } },
          { $project: { _id: 0, __v: 0, styleId: 0 } }
        ],
        as: "photos"
      }
    }
  ])
  */
