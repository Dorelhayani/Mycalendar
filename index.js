const port = 3210;
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({extended: false}));

app.get("/",(req, res) =>  {
    res.send("Good evening");
});


app.listen(port, ()=> { console.log(`Now Listening On Port http://localhost:${port}`); })