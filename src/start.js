var express = require('express');
const cors = require('cors');
require('./config/db.config')
const users = require("./routes/user.route");
const recipes = require("./routes/recipe.route");
var bodyParser = require('body-parser');
var app = express();


app.use(cors({
    origin: '*',
  }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

app.use("/", users)
app.use("/", recipes)

const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});