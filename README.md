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
