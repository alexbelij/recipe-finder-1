var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  RecipeSchema;

/**
 * Recipe Schema
 */
RecipeSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  intro: String,
  summary: String,
  steps: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Recipe', RecipeSchema);