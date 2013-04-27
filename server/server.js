var env = process.env.NODE_ENV || 'development',
  config = require('./config/config')[env],
  fs = require('fs'),
  express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  modelsPath,
  port;

mongoose.connect(config.db);

// Bootstrap models
modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// express settings
require('./config/express')(app, config);

// bootstrap routes
require('./config/routes')(app, config);

// start the server by listening on <port>
port = 3000;
app.listen(port);
console.log('Express app started on port '+port);

exports = module.exports = app;