const { mongoAddress } = require("../../config");
const mongoose = require("mongoose");
mongoose.connect(mongoAddress);

const productSchemaTemplate = require("./product-schema-template.js");
const featureSchemaTemplate = require("./feature-schema-template.js");
const styleSchemaTemplate = require("./style-schema-template.js");
const relatedSchemaTemplate = require("./related-schema-template.js");
const skuSchemaTemplate = require("./sku-schema-template.js");

const productsSchema = new mongoose.Schema(productSchemaTemplate);
const featureSchema = new mongoose.Schema(featureSchemaTemplate);
const styleSchema = new mongoose.Schema(styleSchemaTemplate);
const relatedSchema = new mongoose.Schema(relatedSchemaTemplate);
const skuSchema = new mongoose.Schema(skuSchemaTemplate);

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
  SKU: mongoose.model("Sku", skuSchema)
};
