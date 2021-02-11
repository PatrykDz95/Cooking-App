require('dotenv').config();
var express = require('express');
require('./config/db.config')
const routes = require("./routes/user.route");
const recipes = require("./routes/recipe.route");
var bodyParser = require('body-parser');
var app = express();



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

app.use("/api", routes)
app.use("/api", recipes)

const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});