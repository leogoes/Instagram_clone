const multer = require('multer');// Understand Multi Form data
const path = require('path'); //provide utilities for working with paths and directories

module.exports = {
    //To save the image on 
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), //path for image
        filename: function(req, file, callback){  //Name fo the image
            callback(null, file.originalname); //callback for when the image is req, is set to his original name
        }
    })
};