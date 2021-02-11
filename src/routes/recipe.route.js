const express = require("express");
const User = require("../models/User");
const Recipe = require("../models/recipe");
const router = express.Router();


router.post("/user/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    Recipe.create(req.body)
      .then(function(dbRecipes) {
        // If a Recipe was created successfully, find one User with an `_id` equal to `req.params.id`. Update the User to be associated with the new Review
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return User.findOneAndUpdate({ _id: req.params.id }, {$push: {recipesFromUser: dbRecipes._id}}, { new: true });
      })
      .then(function(dbUser) {
        // If we were able to successfully update User, send it back
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Route for retrieving a Product by id and populating it's Review.
router.get("/products/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Product.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("reviews")
    .then(function(dbProduct) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(dbProduct);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

module.exports = router;