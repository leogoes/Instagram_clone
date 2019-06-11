const express = require('express'); //Import the express aplication and store into express const
const mongoose = require('mongoose'); //Library created to manipulated data from MongoDB

const app = express(); //Creates a serve and be accesed by the browser

//URL for mongoDB
mongoose.connect('mongodb+srv://leo:1234@cluster0-msob2.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true, //Using a new Formater URL instead of default
})

app.use(require('./routes'));

app.listen(8000); //To access the browser must be set a port