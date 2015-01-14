/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('HomeViewModel', ['$scope', '$http', function($scope, $http) {
    "use strict";
    $scope.submitInput = function(userInput){
        $http.post('/submit',{userInput: userInput});
        $scope.submitInputForm.$setPristine();
        $scope.userInput = '';
    };
}]);

module.exports = app;