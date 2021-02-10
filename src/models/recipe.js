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

module.exports = mongoose.model('Recipe', recipeSchema);
