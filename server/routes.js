/* jslint node: true */
/**
* Dependencies.
*/
var path = require('path');

var db = require('./database');

var lock = require('./lock');

var key = "yayjscoe";

var basePath = process.env.APP_DIR || ".";

// Array of routes for Hapi
// TODO: split up based on controller
module.exports = [
    // Base
    {
        method: 'GET',
        path: '/',
        config: {
            handler: function (request, reply) {
                reply.file(path.join(basePath, '/public/index.html'));
            },
            app: {
                name: 'board'
            }
        }
    },{
        method: 'GET',
        path: '/js/{path*}',
        config: {
            handler: {
                directory: { path: path.join(basePath, '/public/js') }
            },
            app: {
                name: 'js'
            }
        }
    },{
        method: 'GET',
        path: '/templates/{path*}',
        config: {
            handler: {
                directory: { path: path.join(basePath, '/public/templates') }
            },
            app: {
                name: 'templates'
            }
        }
    },{
        method: 'GET',
        path: '/fonts/glyphicons-halflings-regular.woff',
        config: {
            handler: function (request, reply) {
                reply.file(path.join(basePath, '/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'));
            },
            app: {
                name: 'bootstrap'
            }
        }
    },{
        method: 'GET',
        path: '/css/bootstrap.css',
        config: {
            handler: function (request, reply) {
                reply.file(path.join(basePath, '/bower_components/bootstrap/dist/css/bootstrap.css'));
            },
            app: {
                name: 'bootstrap'
            }
        }
    },{
        method: 'GET',
        path: '/css/bootstrap.css.map',
        config: {
            handler: function (request, reply) {
                reply.file(path.join(basePath, '/bower_components/bootstrap/dist/css/bootstrap.css.map'));
            },
            app: {
                name: 'bootstrap'
            }
        }
    },{
        method: 'GET',
        path: '/css/style.css',
        config: {
            handler: function (request, reply) {
                reply.file(path.join(basePath, '/public/style.css'));
            },
            app: {
                name: 'bootstrap'
            }
        }
    },{
        method: 'GET',
        path: '/js/angular.blox.directives.js',
        config: {
            handler: function (request, reply) {
                reply.file(path.join(basePath, '/bower_components/building-blox.directives/dist/angular.blox.directives.js'));
            },
            app: {
                name: 'bootstrap'
            }
        }
    },{
        method: 'GET',
        path: '/js/interact.js',
        config: {
            handler: function (request, reply) {
                reply.file(path.join(basePath, '/bower_components/interact/interact.js'));
            },
            app: {
                name: 'bootstrap'
            }
        }
    },{
        method: 'GET',
        path: '/js/angular.js',
        config: {
            handler: function (request, reply) {
                reply.file(path.join(basePath, '/bower_components/angularjs/angular.js'));
            },
            app: {
                name: 'bootstrap'
            }
        }
    },{
        method: 'POST',
        path: '/submit',
        config: {
            handler: function (request, reply) {
                lock(key, function() {
                    db.get(key, function (err, inputList) {
                        inputList = inputList || [];
                        var newItem = [request.payload.userInput];
                        inputList.push(newItem);
                        db.put(key, inputList);
                        reply("Submitted Successfully");
                    });
                });

            },
            app: {
                name: 'bootstrap'
            }
        }
    },{
        method: 'PUT',
        path: '/saveInputList',
        config: {
            handler: function (request, reply) {
                lock(key, function() {
                    db.put(key, request.payload.inputList);
                    reply("Submitted Successfully");
                });

            },
            app: {
                name: 'bootstrap'
            }
        }
    },{
        method: 'GET',
        path: '/collectInput',
        config: {
            handler: function (request, reply) {
                db.get(key, function(err, inputList){
                    inputList = inputList || [];
                    reply(inputList);
                });
            },
            app: {
                name: 'board'
            }
        }
    }, {
        method: 'GET',
        path: '/clear',
        config: {
            handler: function (request, reply) {
                db.put(key, [])
            },
            app: {
                name: 'board'
            }
        }
    }
];
