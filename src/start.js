require('dotenv').config();
var express = require('express');
require('./config/db.config')
const routes = require("./routes/user.route");
var bodyParser = require('body-parser');
var app = express();



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api", routes)

const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});