module.exports = {
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [{ feature: String, value: String }],
  styles: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      default: { type: Number, default: 0 },
      photos: [{ thumbnail_url: String, url: String }],
      skus: { XS: Number, S: Number, M: Number, L: Number, XL: Number }
    }
  ],
  related: [Number]
};
