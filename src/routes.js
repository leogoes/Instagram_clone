const express = require('express');

const routes = new express.Router(); //Storage the route functionality into cons "routes"


routes.get('/', (req, res) => { //Middleware, a route that has to be required and then return a response

    return res.send(`Hello ${req.query.name }`); //use `` instead of '' or ""

})

module.exports = routes; //Exports the routes const