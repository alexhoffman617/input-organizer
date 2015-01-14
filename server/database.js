var path = require('path');
var levelup = require('levelup');
var basePath = process.env.APP_DIR || ".";

var dbPath = path.join(basePath, '/inputOrganizerDb');

console.log('Database path: ' + dbPath);

var db = levelup(dbPath, { valueEncoding: 'json'});

module.exports = db;

