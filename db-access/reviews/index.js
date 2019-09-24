const path = require('path');
const fs = require('fs');
const { Pool, Client } = require('pg');


const client = new Client({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'test',
  port: 5432
});

// client.connect();

// client.query('QUERY HERE', (err, res) => {
//   console.log(err, res);
//   client.end();
// })

exports.client = client;