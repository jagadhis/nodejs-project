const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const cabs =[
    {number:'9163',id:1},
    {number:'3019',id:2},
    {number:'5836',id:3},
    {number:'2394',id:4}
]

// Read Request Handlers
app.get('/',(req,res)=>{
    res.send('Hello this is A Nodejs Project For Practicing Nodejs methods');
})

app.get('/api/cabs',(req,res)=>{
    res.send(cabs)
})

app.get('/api/cabs/:id',(req,res)=>{
    const cab = cabs.find(c => c.id === parseInt(req.params.id));
    if(!cab)res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>')
    res.send(cab);
})


// CREATE Request handlers

