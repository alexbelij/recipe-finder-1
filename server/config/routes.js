var recipes =require('../app/controllers/recipes');

module.exports = function(app) {
  app.get('/recipes', recipes.index);
  // app.get('/recipes/:id', recipes.show);
  // app.post('/recipes', recipes.create);
  // app.put('/recipes/:id', recipes.update);
  // app.del('/recipes/:id', recipes.destroy);
}