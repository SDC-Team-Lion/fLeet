const fs = require("fs");
const path = require('path');
const { Pool } = require('pg');
const async = require('async');

const streamDir = path.join(__dirname, './../../SDC_data/char');
const pool = new Pool({
  user: 'student',
  password: 'student',
  host: 'localhost',
  database: 'test',
  port: 5432
});

let numOfFiles = 0;
let readerObj = {};
let pathsArr = [];

fs.readdir(streamDir, (err, files) => {
  numOfFiles = files.length;
  console.log(numOfFiles);
  pathsArr = createPathsArr(numOfFiles);
//   console.log('num of files: ', pathsArr); // +1 more than numbered, loop from 1 through "< files.length"

  async.forEachOf(pathsArr, (value, key, callback) => {
    fs.readFile(value, 'utf8', (err, data) => {
      if (err) return callback(err);
      try {
        pool.connect((err, client, release) => {
          if (err) {
            return console.error("couldnt not connect");
          }
          client.query(data, (err, result) => {
            release();
            if (err) {
              return console.error("connected, but error");
            }
            console.log('something worked');
          });
        });
        // console.log(key);
        // console.log(typeof data);
      } catch (e) {
        return callback(e);
      }
      callback();
    });
  }, err => {
    if (err) { console.log(err.message); }
  });

//   logI();
});

// use something like newWriteStream to create a new stream at the end of each file? have 'i' increment inside the function?
// function recurRead(lineReader, inputStr) {

//   lineReader.on('line', function(line) {
//     line = `${line}`;
//     console.log(line);
//   });

//   lineReader.on('close', function() {
//     inputStream.close();
//     recurRead();
//   });
  
// }

function createPathsArr(size) {
  let result = [];
  for (let i = 1; i < size; i++) {
    result.push(path.join(streamDir, `brokenRev${i}.js`));
  }
  return result;
}

function logI() {
  for (let i = 1; i < numOfFiles.length; i++) {
    let fileName = `brokenRev${i}.js`;
    let filePath = path.join(streamDir, fileName);
    // console.log(filePath);
    let inputStream = fs.createReadStream(filePath);
    readerObj[i] = require('readline').createInterface({ input: inputStream });

    asyncReading(readerObj[i], inputStream);

    // readerObj[i].on('line', function(line) {
    //   line = `${line}`;
    //   console.log(line);
    // //   console.log(i);
    // });
    // readerObj[i].on('close', function() {
    //   inputStream.close();
    //   console.log('done');
    // });
  }
}

function asyncReading(lineReader, inputStr) {
  lineReader.on('line', function(line) {
    line = `${line}`;
    console.log(line);
  });
  lineReader.on('close', function() {
    inputStr.close();
    console.log('done');
  });
}