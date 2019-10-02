const { Style } = require("../../models/productsAPI");

exports.getAllForProductId = (req, res) => {
  let productId = Number(req.params.product_id);
  Style.retrieveAllForProductId(productId)
    .then(docs => {
      res.status(200).send(docs);
    })
    .catch(console.error);
};

/*

const { Style } = require("../../models/productsAPI");
const redisClient = require("../../redis-client");

exports.getAllForProductId = (req, res) => {
  let productId = Number(req.params.product_id);
  redisClient.getAsync(req.originalUrl).then(res => {
    if (res === null) {
      Style.retrieveAllForProductId(productId)
        .then(docs => {
          res.status(200).send(docs);
        })
        .catch(console.error);
    }
  });
};
*/
