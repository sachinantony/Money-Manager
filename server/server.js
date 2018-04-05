const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const config = require('../config/config');
const mongojs = require('mongojs');
const mongoose = require('mongoose')
const db = mongojs('expenseAppDB',['baseCollection'])

app.get('/api/customers',(req,res)=>{
    const customers = [];
    res.send("I hear you");
});

// Set up Mongoose
mongoose.connect(config.db);
mongoose.Promise = global.Promise;

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// API routes
require('./routes/api/signin')(app);

app.post('/user/login',(req,res)=>{
    console.log('Username: ',req.body.username);
    console.log('Password: ',req.body.password);
    db.baseCollection.find((err,docs)=>{
        console.log(docs);
    });
    res.send("Received data");
});






app.post('/api/account/signup', (req, res, next) => {
    const {body} = req;
    const {
        fName,
        lName,
        password
    } = body;
    let {email} = body;

    if (!fName) {
        return res.send({
            success: false,
            message: 'Error: Missing first name'
        });
    }
    if (!lName) {
        return res.send({
            success: false,
            message: 'Error: Missing last name'
        });
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Missing email'
        });
    }

    email = email.toLowerCase();
    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send('Error: Server error');
        }
        else if (previousUsers.length > 0) {
            return res.send('Error: email already exists')
        }
        //Save
        const newUser = new User();
        newUser.email = email;
        newUser.fName = fName;
        newUser.lName = lName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed Up'
            });
        });
    });
});





app.listen(port, () => console.log(`Server started on port ${port}`));
module.exports = app;