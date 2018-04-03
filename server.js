const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('expenseAppDB',['baseCollection'])
app.get('/api/customers',(req,res)=>{
    const customers = [];
    res.send("I hear you");
});


//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/user/login',(req,res)=>{
    console.log('Username: ',req.body.username);
    console.log('Password: ',req.body.password);
    db.baseCollection.find((err,docs)=>{
        console.log(docs);
    });
    res.send("Received data");
});



app.listen(port, () => console.log(`Server started on port ${port}`));