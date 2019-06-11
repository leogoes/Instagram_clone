const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs'); //filesystem


module.exports = {
    //index method
    async index(req, res){
        //Go in the Model and find the posts and sort them by DESC
        const posts = await Post.find().sort('-createdAt'); // -createdAT as DESC

        return res.json(posts);
    },
    //store method
    async store(req, res){
        //Storage the request info in objs with req.body and req.file
        const {author, place, description, hashtags} = req.body;
        const {filename: image} = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        // "req.file.path" => Where image was been storage
        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        //Pass to another file move from uploads toFile
        //"req.file.destination" => path to uploads folder, origin of the image storage
        .toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        )

        //With the resized image doesnt need anymore
        //an old uploaded image so we use "fs" to "unlink"
        fs.unlinkSync(req.file.path);

        //Insert information into DB with model Assist
        //await method wait for all request 
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post);

        return res.json(post);
    }
}