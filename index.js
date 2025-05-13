// slashes@2.0.0
const port = 3210;
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

const path = require('path');
app.set('views', path.join(__dirname, "./views") )
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

global.addSlashes = require('slashes').addSlashes;
global.stripSlashes = require('slashes').stripSlashes;

let db_M = require('./server/models/database');
global.db_pool = db_M.pool;


app.get('/', (req, res)=>{ res.render("index",{}); })

const corse_rtr = require('./server/Routs/Course_R')
app.use('/course', corse_rtr);

const users_rtr = require('./server/Routs/Users_R')
app.use('/users', users_rtr);


app.listen(port, ()=> { console.log(`Now Listening On Port http://localhost:${port}`); })