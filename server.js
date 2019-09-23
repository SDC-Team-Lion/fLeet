const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const productsRouter = require("./routes/productsAPI");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use("/products", productsRouter);

app.listen(port, () => console.log(`Now listening on :${port}`));
