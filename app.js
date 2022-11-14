require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const book_routes = require('./routes/books');
const auth = require("./routes/auth");
const bookdata = require('./bookdata');

const app = express();

app.use(express.json());
app.use('/api/books',book_routes);
app.use('/api/auth',auth);

module.exports = app;