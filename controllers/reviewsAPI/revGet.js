const dbGet = require('../../models/reviewsAPI/Reviews.js');

module.exports = {
  getList: (req, res) => {
    res.status(200).send('hi');
    // dbGet.getAll(req.prod_id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).send('Error retrieving data from database');
    //   } else {
    //     res.status(200).send(results);
    //   }
    // });
  },

  getMeta: (req, res) => {
    dbGet.getMeta(req.prod_id, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving data from database');
      } else {
        res.status(200).send(results);
      }
    });
  }
}