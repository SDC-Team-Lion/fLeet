const path = require('path');
const fs = require('fs');
const { Pool, Client } = require('pg');
const { postgresURI } = require('../../config');
const revi = require('../../models/reviewsAPI/Reviews.js');
const sqlHost = process.env.awsURL || 'ec2-52-90-85-208.compute-1.amazonaws.com';


const client = new Client({
  host: sqlHost, // 'localhost',
  user: 'student',
  password: 'student',
  database: 'sdc_reviews', // 'test',
  port: 5432
});

client.connect((err) => {
  if (err) {
    console.log(err);
    console.log('awsURL:', process.env.awsURL);
    console.log('sqlHost:', sqlHost);
  } else {
    console.log('Connected to Postgres');
    client.query(`select * from review_count where id=1;`, (err, res) => {
      if (err) { console.log(err); }
      process.env.rev_count = res.rows[0].rev_count;
      console.log('reviews count:', process.env.rev_count);
    });
    // getCount((err, res) => {
    //   console.log(res);
    // })
  }
});

// client.query('QUERY HERE', (err, res) => {
//   console.log(err, res);
//   client.end();
// })

exports.client = client;