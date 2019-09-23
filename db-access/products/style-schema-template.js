module.exports = {
  productId: Number,
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default: { type: Number, default: 0 }
};

//db.styles.aggregate([{ $match: { productId: 134 } },{ $group: {_id: { productId: "$productId" },  styles: { $push:  { item: "$style_id", quantity: "$name" } } } }])
