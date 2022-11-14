const books = require("../bookdata");
const Joi = require('joi');
const User = require('../model/user')
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

const Register = (async (res,req)=>{
    try {
        // Get user input
        const { firstName, lastName, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && firstName && lastName)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          first_name: firstName,
          last_name: lastName,
          email: email.toLowerCase(), // sanitize
          password: encryptedUserPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
    })

const Login = ((res,req)=>{

})

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    Register,
    Login
}