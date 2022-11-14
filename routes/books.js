const express = require('express');
const router = express.Router();

const {getBooks,getBook,createBook,updateBook,deleteBook,Register} = require("../controllers/books");

router.get('/',getBooks)
router.get('/:id',getBook)
router.post('/',createBook)
router.put('/:id',updateBook)
router.delete('/:id',deleteBook)
router.post('/register',Register)

module.exports = router;