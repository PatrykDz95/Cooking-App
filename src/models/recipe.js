const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  }, 
  {
  // Use Unix timestamps (seconds since Jan 1st, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

userSchema.methods.toJSON = function () {
  const recipe = this
  const recipeObject = recipe.toObject()

  delete recipeObject.createdAt
  delete recipeObject.updatedAt

  return recipeObject
}

module.exports = mongoose.model('Recipe', recipeSchema);
