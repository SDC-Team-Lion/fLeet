const dbPost = require('../../models/reviewsAPI/Reviews.js');

module.exports = {
  postReview: (req, res) => {
    console.log(req);
    console.log(req.body);
    res.status(200).send(req.body);
    // dbPost.postReview(req.body, req.params.product_id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).send('Error Posting Data');
    //   } else {
    //     res.status(201).send(results);
    //   }
    // });
  }
}