const express = require('express');//Serve
const multer = require('multer'); //Interpreter for Multi Form data
const UploadConfig = require('./config/upload'); //Diks Storage and path to storage, understand the request by the multer
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router(); //Storage the route functionality into cons "routes"

const upload = multer(UploadConfig); //Insert multer functionalities into upload

//Routes for Posts
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'),PostController.store);

//Routes for Likes passing post ID as parameter
routes.post('/posts/:id/likes', LikeController.store);

module.exports = routes; //Exports the routes const