const express = require('express');
const book_routes = require('./routes/books');
const bookdata = require('./bookdata');
const app = express();
app.use(express.json());
 



// function validateBook(book) {
// const schema = {
// title: Joi.string().min(3).required()
// };
// return Joi.validate(book, schema);
 
// }

app.use('/api/books',book_routes);
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));