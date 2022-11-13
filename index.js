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
app.post('/api/cabs', (req, res)=> {
 
    const { error } = validatecab(req.body);
    if (error){
    res.status(400).send(error.details[0].message)
    return;
    }
    const cab = {
    id: cabs.length + 1,
    title: req.body.title
    };
    cabs.push(cab);
    res.send(cab);
    });
     
    //UPDATE Request Handler
    app.put('/api/cabs/:id', (req, res) => {
    const cab = cabs.find(c=> c.id === parseInt(req.params.id));
    if (!cab) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
     
    const { error } = validatecab(req.body);
    if (error){
    res.status(400).send(error.details[0].message);
    return;
    }
     
    cab.title = req.body.title;
    res.send(cab);
    });
     
    //DELETE Request Handler
    app.delete('/api/cabs/:id', (req, res) => {
     
    const cab = cabs.find( c=> c.id === parseInt(req.params.id));
    if(!cab) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
     
    const index = cabs.indexOf(cab);
    cabs.splice(index,1);
     
    res.send(cab);
    });
     
    function validatecab(cab) {
    const schema = {
    title: Joi.string().min(3).required()
    };
    return Joi.validate(cabs, schema);
     
    }

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
