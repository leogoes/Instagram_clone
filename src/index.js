const express = require('express'); //Import the express aplication and store into express const
const mongoose = require('mongoose'); //Library created to manipulated data from MongoDB
const path = require('path');
const cors = require('cors');

const app = express(); //Creates a serve and be accesed by the browser
//noew server supports http methods
const server = require('http').Server(app);
//"io" allows to send request to user that are using our application
const io = require('socket.io')(Server); //Real time Event

//URL for mongoDB
mongoose.connect('mongodb+srv://leo:1234@cluster0-msob2.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true, //Using a new Formater URL instead of default
})

//When an user create a Post, other user can be notify
app.use((req, res, next) => {
    req.io = io;

    next();
})

//Make accesible to all kind of application
app.use(cors());

//Create
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));


//change from app to server that both support http methods
server.listen(8000); //To access the browser must be set a port