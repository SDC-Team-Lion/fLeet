const path = require('path');
const fs = require('fs');
const { Pool, Client } = require('pg');


const client = new Client({
  host: `ec2-3-92-180-174.compute-1.amazonaws.com`, // 'localhost',
  user: 'student',
  password: 'student',
  database: 'sdc_reviews', // 'test',
  port: 5432
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to Postgres');
  }
});

// client.query('QUERY HERE', (err, res) => {
//   console.log(err, res);
//   client.end();
// })

exports.client = client;