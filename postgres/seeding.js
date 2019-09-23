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
  inputJSON = formatReviewCSV(line);
  outStream.write(inputJSON + '\n');
  if (count === 1 && fileCount === 1) {
    headers = line.split(',');
  }
  if (count >= 10000) {
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

//SQL Format
function formatReviewCSV(csvLine) {
  let result = '';
  let cL = csvLine.split(',');
  let rev_date = cL[3];
  let summary = cL[4];
  let body = cL[5];
  let rev_name = cL[8];
  let rev_email = cL[9];
  let res = cL[10];
  rev_date[0] = `'`;
  rev_date[rev_date.length - 1] = `'`;
  summary[0] = "'";
  summary[summary.length - 1] = "'";
  body[0] = "'";
  body[body.length - 1] = "'";
  rev_name[0] = "'";
  rev_name[rev_name.length - 1] = "'";
  rev_email[0] = "'";
  rev_email[rev_email.length - 1] = "'";
  if (res === '') {
    res = null;
  } else {
    res[0] = "'";
    res[res.length - 1] = "'";
  }
  result = `INSERT INTO reviews (id,product_id,rating,rev_date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) VALUES (${cL[0]},${cL[1]},${cL[2]},'${rev_date}','${summary}','${body}',${cL[6]},${cL[7]},'${rev_name}','${rev_email}',${res},${cL[11]});`
  // console.log(result);
  return result;
}

// INSERT INTO `reviews` (`id`,`product_id`,`rating`,`date`,`summary`,`body`,`recommend`,`reported`,`reviewer_name`,`reviewer_email`,`response`,`helpfulness`) VALUES
// ('','','','','','','','','','','','');