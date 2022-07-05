"use strict";
// dotenv
require("dotenv").config();

// packages

const express = require("express");
const mongoose = require('mongoose');

const app = express();
const start = require('./middlewares/startApplication');
const startupMiddlewares = require('./middlewares/startupMiddlewares');

// configs
app.set('view engine','ejs');




// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(startupMiddlewares); // An array of middlewares





// routes
require('./routes/routeManager');


// 404

// 404 error
app.use((req, res) => {
   return  res.end('404');
    res.status(404);
    if (req.accepts("html")) return res.render("404", { layout: false });
    if (req.accepts("json")) return res.json({ error: "Not found!" });
    return res.type("txt").send("Not found !");
});
  



// start application
start(mongoose,app);