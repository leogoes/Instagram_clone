**Real Time app with Nodejs and React**

---

**Creation Log**

*This log has study purpose, just to understand the creation process and the nodejs and react interactions*

---

**Yarn init**

*Yarn is a "new" npm more safe and faste*

Command used to start a project and to create a package.json dependencies file

```
yarn init -y
```

**Express**

Installing the first dependecie Express with:

```
yarn add express
```
create dependencies into the project, express depends in another dependencies too, so node_modules will not have just express.

---

Also **Yarn.lock** has been created and it is a cache file.


good to separete the logic into a **src** foulder, inside create a index.js


**Creating a Server**


```
const express = require('express'); //Import the express aplication and store into express const

const app = express(); //Creates a serve and be accesed by the browser

app.get('/', (req, res) => { //Middleware, a route that can request parameters and then return a response

    return res.send(`Hello ${req.query.name }`); //use `` instead of '' or ""

})

app.listen(8000); //To access the browser must be set a port
```

**Nodemon**

*automatically restarting the node application when file changes in the directory are detected*

in package.json

```
  "scripts": {
    "dev" : "nodemon src/index.js"
  },
```
**MongoDB**

non-relational db

```
yarn add mongoose
```
It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

**Routes**

You can separete the routes files from the index.js, but you have to export and require then in index.js file

*Routes.js*
Exports the routes with *module.exports = routes;* and routes defined as *const routes = new express.Router();*

```
const express = require('express');

const routes = new express.Router(); //Storage the route functionality into cons "routes"


routes.get('/', (req, res) => { //Middleware, a route that has to be required and then return a response

    return res.send(`Hello ${req.query.name }`); //use `` instead of '' or ""

})

module.exports = routes; //Exports the routes const
```

*Index.js*
Require the routes into the index file for using
```
app.use(require('./routes'));

```

**Models, Controller and Config**

*Models*

Create **Post.js** file

inside Post.js

```
//Require de mongoose
const mongoose = require('mongoose');

//Create an instance of schema
const PostSchema = new mongoose.Schema({
  author: String,
  place: String,
  description: String,
  hashtags: String,
  image: String,
  like: {
    type: Number,
    default: 0,
    
  }
  
},{
  timestamps: true,

})
```
Have to expor the module


```
module.export = mongoose.model('Post', PostSchema);
```

*Controller*

create a PostController.js

have to require the model

```
const Post = require('../models/Post');
```

Create the methods to receive the data

Async method as "promise" in JS
```
async index(req, res){

},
```

The Store method receive a request from **Insomnia**
The request send img not using the json and using multiform (HTLM form)

to receive this information can be used **req.body**, but the request come as undefined because **Express** can't understand multi form
have to install a package to receive the request data.


```
async store(req, res){
    
    res.json({
        ok: true,
    }) ;

}
```

install package **Multer** with 

```
yarn add multer
```

after in the routes file, you can require the multer and pass into route the name of the file the you are receiving
Like: upload.single('image')

```
const multer = require('multer');
const upload = multer();

routes.post('/posts', upload.single('image'),PostController.store);

```
Upload config for receive the file via Multi form and understand by the multer
const path = require('path'); //provide utilities for working with paths and directories

```
const multer = require('multer');
const path = require('path');

module.exports = {

    storage: new multer.diskStorage({
        destination: path.resolve(__direname, '..', '..', 'uploads'), //Give the path to storage the file received
    })
}
```

You have to require in the routes.js and pass the upload config

```
const UploadConfig = require('./config/uploads');

const upload = multer(UploadConfig);
```
When using a request from **Insomnia**, will send a image and storage in the choosen path, 
the file name will be random and the file cannot be openned inside vscode
to set a file name have to insert setting inside uploads.

```
module.exports = {
    //To save the image on 
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), //path for image
        filename: function(req, file, callback){  //Name fo the image
            callback(null, file.originalname); //callback for when the image is req, is set to his original name
        }
    })
};
```
Doing this, the name of the image will be the orginal saved on your computer.

**Store**

in *PostController* on method *store*

```
    //store method
    async store(req, res){
        //Storage the request info in objs with req.body and req.file
        const {author, place, description, hashtags} = req.body;
        const {filename: image} = req.file;

        //Insert information into DB with model Assist
        //await method wait for all request 
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        });
        
        //Return an json with info requested
        return res.json(post);
    }

}

```

**Index**

in *PostController* on method *index*

```
//index method
    async index(req, res){
        //Go in the Model and find the posts and sort them by DESC
        const posts = await Post.find().sort('-createdAt'); // -createdAT as DESC

        return res.json(posts);
    }
```
**Create another Route for Index method**

*can be named same as post request route

```
routes.get('/posts', PostController.index);
```

**Likes Controller**

create another controller named LikeController
create another route for Like Controller

*Controller

```
const Post = require('../models/Post');

module.exports = {
    async store(req, res)
    {
        //Receive params by URL, find the post related and storage in post const
        const post = await Post.findById(req.params.id);

        //access the like property and count + 1  
        post.likes += 1;
        
        //Save the counter
        await post.save();

        //return the new like counter 
        return res.json(post);
    }
};
```

*Routes

Pass id as parameter for now which post will

```
routes.post('/posts/:id/likes', LikeController.store); 
```

**Sharp**

*dependencies to  manipulated images and resized it


