const pgQuery = require('../../db-access/reviews/postgresQuery.js');

module.exports = {
  getAll: (prod_id, callback) => {
    // let query = "I hate SQL queries."
    let query = `
      SELECT *
      FROM reviews
      FULL JOIN photos
      ON reviews.id=photos.review_id
      WHERE reviews.product_id=${prod_id}`
    pgQuery.get(query, (err, results) => {
      callback(err, results);
    });
  },

  getMeta: (callback) => {
    
  }
}

// select * from reviews left join photos on reviews.id=photos.review_id where reviews.product_id=1997;