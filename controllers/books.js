const books = require("../bookdata");
const Joi = require('joi');
const schema = Joi.object({
    title:Joi.string().min(3),
})
const getBooks = ((req,res)=>{
    res.json(books);
}) 

const getBook = ((req,res)=>{
    const book = books.find(c => c.id === parseInt(req.params.id));
 
if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
res.send(book);
})

const createBook = ((res,req)=>{
    const validation = schema.validate(req.body);
if (validation.error){
res.status(400).send(validation.error.details[0].message)
return;
}
const book = {
id: books.length + 1,
title: req.body.title
};
books.push(book);
res.send(book);
})

const updateBook = ((res,req)=>{
    const book = books.find(c=> c.id === parseInt(req.params.id));
if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
 
const validation = schema.validate(req.body);
if (validation.error){
res.status(400).send(validation.error.details[0].message);
return;
}
})

const deleteBook = ((res,req)=>{
    const book = books.find( c=> c.id === parseInt(req.params.id));
if(!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
 
const index = books.indexOf(book);
books.splice(index,1);
 
res.send(book);
})


module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}