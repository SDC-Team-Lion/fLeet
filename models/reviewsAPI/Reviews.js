const pgQuery = require('../../db-access/reviews/postgresQuery.js');

module.exports = {
  getAll: (prod_id, callback) => {
    let query = `
      SELECT *
      FROM reviews
      WHERE product_id = ${prod_id};`;
    pgQuery.get(query, (err, results) => {
      callback(err, results);
    });
  },

  getMeta: (callback) => {
    
  }
}