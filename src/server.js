const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const handlebars = require('handlebars');
const request = require('request');
const env = require('env2')('./config.env');
const routes = require('./routes.js');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});

server.register([Vision, Inert], (err) => {
  if (err) throw err;

  server.views({
    engines: {
      html: handlebars
    },
    path: 'src/views',
    layoutPath: 'src/views/layout',
    layout: 'default',
    partialsPath: 'src/views/partials'
  });

  server.route(routes);
});

module.exports = server;
