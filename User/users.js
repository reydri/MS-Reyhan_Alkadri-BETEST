const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require("./User");
const User = mongoose.model("User");

mongoose.connect("mongodb+srv://dbUser:reydri1997@cluster0.qt0rg.mongodb.net/db_reyhanalkadri_betest?retryWrites=true&w=majority", () =>{
    console.log("Database is connected!");
});


app.get('/', (req, res) => {
    res.send("Welcome to the Microservices Nodejs Express MongoDB");
})

app.post('/user', (req, res) => {
    var newUser = {
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
    };

    var user = new User(newUser);
    
    user.save().then(() => {
        console.log("new user created!")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("A new user created with success!");
})

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.json(users);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.get('/users/account', (req, res) => {
    const accountNumber = req.query.accountNumber;
    var data = accountNumber ? { accountNumber: { $regex: new RegExp(accountNumber), $options: "i" } } : {};
    User.find(data).then((users) => {
        res.json(users);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.get('/users/identity', (req, res) => {
    const identityNumber = req.query.identityNumber;
    var data = identityNumber ? { identityNumber: { $regex: new RegExp(identityNumber), $options: "i" } } : {};
    User.find(data).then((users) => {
        res.json(users);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.get('/user/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if(user){
            res.json(user);
        }else{
            res.sendStatus(404).send('user not found');;
        }
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.delete('/user/:id', (req, res) => {
    User.findOneAndRemove(req.params.id).then((user) => {
        res.send("User deleted is success!")
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.put('/user/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then((user) => {
        if(user){
            res.send("User was updated is successfully")
        }else{
            res.sendStatus(404).send('User is not found');;
        }
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.listen(9000, () => {
    console.log("This application is running at http://localhost:9000");
})