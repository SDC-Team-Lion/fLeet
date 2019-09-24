module.exports = { styleId: Number, size: String, quantity: Number };
/*
db.products.aggregate([
  { $match: { id: 1 } },
  { $project: { _id: 0, __v: 0 } },
  {
    $lookup: {
      from: "styles",
      "let": {"styleIdForStyle":"$style_id"},
      pipeline: [
        { $match: { productId: 1 } },
        { $project: { _id: 0, __v: 0, productId: 0 } },
        
      ],
      as: "results"
    }
  }
]);
*/

//from: "styles",localField:"styleId",foreignField:"style_id",as:"skus"
// {
//   $lookup: {
//     from: "skus",
//     let: {"styleIdForSku":"$styleId"},
//     pipeline: [
//       { $match: { "$expr": { "$eq": ["$styleIdForStyle", "$$styleIdForSku"] }} },
//       { $project: { size: 1, quantity: 1, style_id: 1 } }
//     ],
//     as: "skus"
//   }
// }
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
/*  //This will aggregate styles
db.styles.aggregate([
  { $match: { productId: 1 } },
  { $project: { _id: 0, __v: 0 } },
  {
    $lookup: {
      from: "skus",
      let: { styleIdForStyle: "$style_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$$styleIdForStyle", "$styleId"] } } },
        { $project: { _id: 0, __v: 0 } }
      ],
      as: "results"
    }
  }
]);
*/
/* // This will aggregate skus under styles and styles under products
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
            from: "skus",
      let: { styleIdForStyle: "$style_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$$styleIdForStyle", "$styleId"] } } },
        { $project: { _id: 0, __v: 0 } }
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
            from: "skus",
            let: { styleIdForStyle: "$style_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$styleIdForStyle", "$styleId"] } } },
              { $project: { _id: 0, __v: 0 } }
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
/*
db.products.aggregate([
  { $match: { id: 1 } },
  { $project: { id: 1, _id: 0 } },
  {
    $lookup: {
      from: "styles",
      pipeline: [
        { $match: { productId: 1 } },
        { $project: { _id: 0, __v: 0, productId: 0 } },
        {
          $lookup: {
            from: "skus",
            let: { styleIdForStyle: "$style_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$styleIdForStyle", "$styleId"] } } },
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
              { $project: { _id: 0, __v: 0, styleId:0 } }
            ],
            as: "photos"
          }
        }
      ],
      as: "results"
    }
  }
]);
*/
/*
db.products.aggregate([
  { $match: { id: 1 } },
  { $project: { product_id: "$id", _id: 0 } },
  {
    $lookup: {
      from: "styles",
      pipeline: [
        { $match: { productId: 1 } },
        { $project: { "default?":"$default", style_id:1,name:1,original_price:1,sale_price:1,_id: 0 } },
        {
          $lookup: {
            from: "skus",
            let: { styleIdForStyle: "$style_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$styleIdForStyle", "$styleId"] } } },
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
              { $project: { _id: 0, __v: 0, styleId:0 } }
            ],
            as: "photos"
          }
        }
      ],
      as: "results"
    }
  }
]);
*/
/*
  {
    $replaceRoot: {
      newRoot: {
        $arrayToObject: [
          [
            {
              k: "$code",
              v: "$item"
            }
          ]
        ]
      }
    }
  }
*/
/*
db.products.aggregate([
  { $match: { id: 1 } },
  { $project: { product_id: "$id", _id: 0 } },
  {
    $lookup: {
      from: "styles",
      pipeline: [
        { $match: { productId: 1 } },
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
      ],
      as: "results"
    }
  }
]);
*/
