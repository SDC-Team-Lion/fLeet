const pgs = require('./index.js');

module.exports = {
  get: function(str, callback) {
    let queryStr = str || 'SELECT * FROM reviews WHERE product_id = 1337;';
    pgs.client.connect();
    pgs.client.query(queryStr, (err, res) => {
      if (err) { console.log(err); }
      console.log(res);
      callback(err, res);
      pgs.client.end();
    });
  },

  post: function(str, callback) {
    console.log('post');
  }
}