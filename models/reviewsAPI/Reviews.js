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
      let formatted = format.reviewsMain(results.rows);
      callback(err, formatted);
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

  postReview: (revObj, prod_id, callback) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;
    let charQuery = '';
    let photoQuery = `
      INSERT INTO photos (id,review_id,url_str)
      VALUES (DEFAULT,`;
    // for (let i = 0; i < revObj.photos.length; i++) {
    //   photoQuery +=
    // }

    let query = `
      INSERT INTO reviews
      (id,product_id,rating,rev_date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness)
      VALUES (DEFAULT,${prod_id},${revObj.rating},${today},${revObj.summary},${revObj.body},${revObj.recommended},false,${revObj.name},${revObj.email},null,0);
      ${charQuery}
      ${photoQuery}`;

    pgQuery.post(query, (err, results) => {
      callback(err, results);
    });
  },

  // let submission = {
  //   rating: rating,
  //   summary: this.state.summaryEntry,
  //   body: this.state.bodyEntry,
  //   recommended: (this.state.rec === "yes") ? "true" : "false",
  //   name: this.state.nameEntry,
  //   email: this.state.emailEntry,
  //   photos: this.state.photos, array of URL strings
  //   characteristics: this.state.characteristics
  getCount: (callback) => {
    let query = `select count(*) from reviews;`;
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