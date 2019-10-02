const router = require("express").Router();
const { revGet, revPut, revPost } = require("../../controllers/reviewsAPI/index.js");

router.get("/:product_id/list", revGet.getList);
// router.get("/:product_id/meta", revGet.getMeta);
router.post("/:product_id", revPost.postReview);
router.put("/helpful/:review_id", revPut.putHelpful);
router.put("/report/:review_id", revPut.putReport);
router.get("/test/count", revGet.getCount);
router.get("/test/env_var", revGet.getEnv);

module.exports = router;