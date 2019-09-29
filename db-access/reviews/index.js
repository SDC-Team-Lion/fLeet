const path = require('path');
const fs = require('fs');
const { Pool, Client } = require('pg');
const { postgresURI } = require('../../config');
const sqlHost = process.env.awsURL || 'localhost';


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
    console.log('awsURL?:', sqlHost);
  } else {
    console.log('Connected to Postgres');
  }
});

// client.query('QUERY HERE', (err, res) => {
//   console.log(err, res);
//   client.end();
// })

exports.client = client;