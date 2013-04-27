var mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');

/**
 * List of Recipes 
 */
 exports.index = function(req, res) {
    return Recipe.find(function(err, recipes) {
      if (err) {
        return res.render('500');
      } else {
        return res.send(recipes);
      }
    });
 }