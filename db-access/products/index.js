const { mongoAddress } = require("../../config");
const mongoose = require("mongoose");
mongoose.connect(mongoAddress);

const productsSchemaTemplate = require("./products-schema-template.js");

const productsSchema = new mongoose.Schema(productsSchemaTemplate);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));
db.once("open", function() {
  console.log("Connected to MongoDB with Mongoose...");
});
