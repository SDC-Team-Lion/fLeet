const fs = require("fs");
const csvtojsonV2 = require('csvtojson');
const path = require('path');

//
const reviewsCSV = path.join(__dirname, './../../SDC_data/reviews.csv');
const characCSV = path.join(__dirname, './../../SDC_data/characteristics.csv');
const characRevCSV = path.join(__dirname, './../../SDC_data/characteristic_reviews.csv');
const revPhotosCSV = path.join(__dirname, './../../SDC_data/reviews_photos.csv');
//

let inputFile = path.join(__dirname, './../../SDC_data/reviews.csv');
let fileCount = 1;
let count = 0;
let outputFile = path.join(__dirname, `./../../SDC_data/char/brokenRev${fileCount}.js`);
let outStream;
let headers = [];
let inputJSON = '';
let bigStorage = {};
let totalCount = 0;

newWriteStream();
let inputStream = fs.createReadStream(inputFile);

//
let inputStreamRev = fs.createReadStream(reviewsCSV);
let inputStreamChar = fs.createReadStream(characCSV);
let inputStreamCharRev = fs.createReadStream(characRevCSV);
let inputStreamPhoto = fs.createReadStream(revPhotosCSV);
//

console.log("HEY");

let lineReader = require('readline').createInterface({ input: inputStream });

//
let revReader = require('readline').createInterface({ input: inputStreamRev });
let charReader = require('readline').createInterface({ input: inputStreamChar });
let charRevReader = require('readline').createInterface({ input: inputStreamCharRev });
let photoReader = require('readline').createInterface({ input: inputStreamPhoto });
//

function newWriteStream() {
  outputFile = path.join(__dirname, `./../../SDC_data/char/brokenRev${fileCount}.js`);
  outStream = fs.createWriteStream(outputFile);
  count = 0;
}

lineReader.on('line', function(line) {
  count++;
  inputJSON = csvJSON(line);
  outStream.write(inputJSON + '\n');
  if (count === 1 && fileCount === 1) {
    headers = line.split(',');
  }
  if (count >= 100000) {
    fileCount++;
    console.log('file ', outputFile);
    outStream.end();
    newWriteStream();
  }
});

lineReader.on('close', function() {
  if (count > 0) {
    console.log('end');
  }
  inputStream.close();
  outStream.end();
  console.log('done.');
  console.log(headers);
});

// closeAllStreams();

function csvJSON(csvStr) {
  let obj = {};
  let currentLine = csvStr.split(',');
  for (let i = 0; i < headers.length; i++) {
    obj[headers[i]] = currentLine[i];
  }
  return JSON.stringify(obj);
}

//
function closeAllStreams() {
  let streams = [inputStreamRev, inputStreamChar, inputStreamCharRev, inputStreamPhoto];
  let readers = [revReader, charReader, charRevReader, photoReader];
  for (let i = 0; i < readers.length; i++) {
    readers[i].on('close', function() {
      if (count > 0) {
        console.log('end ', streams[i]);
      }
      streams[i].close();
      outStream.end();
      console.log('done. ', streams[i]);
      console.log(headers);
    });
  }
}
function allStreamLines() {
  let readers = [revReader, charReader, charRevReader, photoReader];
  for (let i = 0; i < readers.length; i++) {
    readers[i].on('line', function(line) {
      count++;
      totalCount++;
      bigStorage[totalCount][i] = line;
      inputJSON = csvJSON(line);
      outStream.write(inputJSON + '\n');
      if (count === 1 && fileCount === 1) {
        headers = line.split(',');
      }
      if (count >= 100000) {
        fileCount++;
        console.log('file ', outputFile);
        outStream.end();
        newWriteStream();
      }
    });
  }
}
//