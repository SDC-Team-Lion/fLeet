const pgs = require('./index.js');

module.exports = {
  get: function(str, callback) {
    let queryStr = str;
    // pgs.client.connect();
    pgs.client.query(queryStr, (err, res) => {
      if (err) { console.log(err); }
      callback(err, res);
    //   pgs.client.end();
    });
  },

  post: function(str, callback) {
    let queryStr = str;
    pgs.client.query(queryStr, (err, res) => {
      if (err) { console.log(err); }
      callback(err, res);
    });
  },

  put: function(str, callback) {
    let queryStr = str;
    // pgs.client.connect();
    pgs.client.query(queryStr, (err, res) => {
      if (err) { console.log(err); }
      callback(err, res);
    });
    // pgs.client.end();
  }
}