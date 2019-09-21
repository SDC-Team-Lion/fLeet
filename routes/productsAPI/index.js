const router = require("express").Router();
const { products } = require("../../controllers/productsAPI/index.js");

router.get("/:product_id", products.getOneById);

module.exports = router;
