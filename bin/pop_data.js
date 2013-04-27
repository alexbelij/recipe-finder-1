var env = process.env.NODE_ENV || 'development',
  config = require('./../server/config/config')[env],
  fs = require('fs'),
  mongoose = require('mongoose'),
  count = 15,
  Recipe;

mongoose.connect(config.db);  

// Bootstrap models
modelsPath = __dirname + '/../server/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  console.log('bootstrapping model: ' + modelsPath + '/' + file);
  require(modelsPath + '/' + file);
});

Recipe = mongoose.model('Recipe');
Recipe.remove().exec();

for (var i=0; i < count; i++) {
  var recipe;

  recipe = new Recipe({
    title: 'Hello How Are You ' + i,
    intro: 'Intro matics ipso tactics',
    summary: 'Summarize, then and only then accessorize!',
    steps: [
      'Poo on shoe',
      'Who made who?',
      'Jiggly Wiggle Moo!'
    ]
  });

  recipe.save(function(err, recipe) {
    if (err) {
      console.log('There was an error creating recipe');
    } else {
      console.log('Successfully created recipe');
    }
  });
}