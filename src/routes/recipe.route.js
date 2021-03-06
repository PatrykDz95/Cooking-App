const express = require("express");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const cleanCache = require('../middleware/cleanCache');
const router = express.Router();

router.get("/recipes", async (req, res, next) => {
  const recipes = await Recipe.find();//.cache();
  res.send(recipes);
});

// find all recipes by author's name
router.get("/recipes/:name", async (req, res, next) => {
  const recipes = await Recipe.find({ author: req.params.name });//.cache();
  res.send(recipes)
});

router.post("/addRecipe/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    Recipe.create(req.body)
      .then(function(dbRecipes) {
        // If a Recipe was created successfully, find one User with an `_id` equal to `req.params.id`. Update the User to be associated with the new Review
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return User.findByIdAndUpdate(
          { _id: req.params.id }, 
          {$push: {recipesFromUser: dbRecipes._id}}, 
          { new: true});
      })
      .then(function(dbUser) {
        // If we were able to successfully update User, send it back
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
});

module.exports = router;