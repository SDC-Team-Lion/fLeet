const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const productsRouter = require("./routes/productsAPI");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/products", productsRouter);
app.use("/loaderio-8409c253c22c9219234e814df0acff31/", (req, res) => {
  res.sendFile("/container-temp/test.txt");
});
app.get(/(cart|qa)*/, (req, res) => {
  console.log(req.path);
  res.redirect("http://18.217.220.129" + req.path);
});

app.listen(port, () => console.log(`Now listening on :${port}`));
