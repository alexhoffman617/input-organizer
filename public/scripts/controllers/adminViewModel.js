/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('AdminViewModel', ['$scope', '$http', function($scope, $http) {
    "use strict";
    $scope.inputList = [];
    $scope.refreshData = function(){
        $http.get('/collectInput').then(function(response){
            $scope.inputList = response.data;
        });
    };
    $scope.refreshData();
}]);

module.exports = app;