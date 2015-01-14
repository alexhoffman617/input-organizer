/* jslint node: true */
"use strict";

var dictionary = {};

function nextTick(mappedKey){
    var shouldSetTimeout = dictionary[mappedKey].length === 1;

    if(shouldSetTimeout){
        var timeoutFunction = function(){
            var list = dictionary[mappedKey];
            var callback = list.shift();
            if(callback !== undefined){
                callback(function(){
                    setTimeout(timeoutFunction, 0);
                });
            }
        };

        setTimeout(timeoutFunction, 0);
    }
}

function mapKey(key){
    return "lockKey_" + key;
}

function lock(key, callback){
    var mappedKey = mapKey(key);
    if(!dictionary.hasOwnProperty(mappedKey)){
        dictionary[mappedKey] = [];
    }

    dictionary[mappedKey].push(callback);
    nextTick(mappedKey);
}

module.exports = lock;