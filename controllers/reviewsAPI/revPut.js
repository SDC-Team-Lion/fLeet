const dbPut = require('../../models/reviewsAPI/Reviews.js');

module.exports = {
  putHelpful: (req, res) => {    
    // res.status(200).send(`${typeof req.params.product_id}`);
    dbPut.putHelp(req.params.review_id, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error sending data to database');
      } else {
        res.status(201).send(results.rows);
      }
    });
  },

  putReport: (req, res) => {
    dbGet.getMeta(req.params.review_id, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error sending data to database');
      } else {
        res.status(201).send(results);
      }
    });
  }
}