require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());


const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});