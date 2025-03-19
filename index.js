const port = 3210;
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

const path = require('path');
app.set('views', path.join(__dirname, "./views") )

app.get('/', (req, res)=>{ res.render("index",{}); })
app.listen(port, ()=> { console.log(`Now Listening On Port http://localhost:${port}`); })