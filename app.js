require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const book_routes = require('./routes/books');
const bookdata = require('./bookdata');

const app = express();

app.use(express.json());
app.use('/api/books',book_routes);

module.exports = app;