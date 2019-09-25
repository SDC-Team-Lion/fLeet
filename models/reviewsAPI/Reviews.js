const pgQuery = require('../../db-access/reviews/postgresQuery.js');
const format = require('./format.js');

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
      // let formatted = format.reviewsMain(results.rows);
      callback(err, results.rows);
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
      UPDATE reviews
      SET helpfulness = helpfulness + 1
      WHERE id=${rev_id};`;
    pgQuery.put(query, (err, results) => {
      callback(err, results);
    });
  },

  putRep: (rev_id, callback) => {
    let query = `
      UPDATE reviews
      SET reported = true
      WHERE id=${rev_id};`;
    pgQuery.put(query, (err, results) => {
      callback(err, results);
    });
  }


}

// select * from reviews left join photos on reviews.id=photos.review_id where reviews.product_id=1997;