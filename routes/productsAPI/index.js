const router = require("express").Router();
const {
  products,
  styles,
  relateds
} = require("../../controllers/productsAPI/index.js");

router.get("/list", products.getMany);
router.get("/:product_id/styles", styles.getAllForProductId);
router.get("/:product_id/related", relateds.getAllForProductId);
router.get("/:product_id", products.getOneById);

module.exports = router;
