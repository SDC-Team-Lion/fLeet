const dbGet = require('../../models/reviewsAPI/Reviews.js');

module.exports = {
  getList: (req, res) => {    
    // res.status(200).send(`${typeof req.params.product_id}`);
    dbGet.getAll(req.params.product_id, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving data from database');
      } else {
        res.status(200).send(results);
      }
    });
  },

  getMeta: (req, res) => {
    dbGet.getMeta(req.params.product_id, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving data from database');
      } else {
        res.status(200).send(results);
      }
    });
  }
}