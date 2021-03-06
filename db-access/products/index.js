console.log("process.env: " + JSON.stringify(process.env));
const mongoAddress =
  process.env.mongoAddress || require("../../config").mongoAddress;
const mongoose = require("mongoose");

console.log("mongoAddress: " + mongoAddress);
mongoose.connect(mongoAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const productSchemaTemplate = require("./product-schema-template.js");
const featureSchemaTemplate = require("./feature-schema-template.js");
const styleSchemaTemplate = require("./style-schema-template.js");
const relatedSchemaTemplate = require("./related-schema-template.js");
const skuSchemaTemplate = require("./sku-schema-template.js");
const photoSchemaTemplate = require("./photo-schema-template.js");

const productsSchema = new mongoose.Schema(productSchemaTemplate);
const featureSchema = new mongoose.Schema(featureSchemaTemplate);
const styleSchema = new mongoose.Schema(styleSchemaTemplate);
const relatedSchema = new mongoose.Schema(relatedSchemaTemplate);
const skuSchema = new mongoose.Schema(skuSchemaTemplate);
const photoSchema = new mongoose.Schema(photoSchemaTemplate);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));
db.once("open", function() {
  console.log("Connected to MongoDB with Mongoose...");
});

module.exports = {
  Product: mongoose.model("Product", productsSchema),
  Feature: mongoose.model("Feature", featureSchema),
  Style: mongoose.model("Style", styleSchema),
  Related: mongoose.model("Related", relatedSchema),
  SKU: mongoose.model("Sku", skuSchema),
  Photo: mongoose.model("Photo", photoSchema)
};
