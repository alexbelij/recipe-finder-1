var express = require('express');

module.exports = function(app, config) {
  app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(config.root + '/app'));
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));  
  });  
}