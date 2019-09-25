const pgQuery = require('../../db-access/reviews/postgresQuery.js');

module.exports = {
  getAll: (prod_id, callback) => {
    // let query = "I hate SQL queries." ####
    // ############### yea dont forget to delete this
    let query = `
      SELECT photos.id as pid, photos.*, reviews.*
      FROM reviews
      LEFT JOIN photos
      ON photos.review_id=reviews.id
      WHERE reviews.product_id=${prod_id}`
    pgQuery.get(query, (err, results) => {
      callback(err, results);
    });
  },

  getMeta: (prod_id, callback) => {
    let query = `
      SELECT characteristics_rev.*, characteristics.*
      FROM characteristics_rev
      LEFT JOIN characteristics
      ON characteristics_rev.review_id=characteristics.id
      WHERE characteristics_rev.review_id=`;
    pgQuery.get(query, (err, results) => {
      callback(err, results);
    });
  },

  putHelp: (rev_id, callback) => {
    let query = `
    `
  }
}

// select * from reviews left join photos on reviews.id=photos.review_id where reviews.product_id=1997;