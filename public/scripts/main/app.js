
var angular = window.angular;
require('angular-route');
require('../controllers/_module_init');

angular.element(document).ready(function() {
    "use strict";
	var requires = [
        'inputOrganizer.controllers',
        'BuildingBlox.Directives',
		'ngRoute',
	];

	var app = window.angular.module('inputOrganizer', requires);

	app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/templates/home.html', 
                controller: 'HomeViewModel'
            })
            .when('/admin', {
                templateUrl: '/templates/admin.html',
                controller: 'AdminViewModel'
            })
            .otherwise( 
                {
                    redirectTo: '/'
                });
            }]);

	angular.bootstrap(document, ['inputOrganizer']);

});