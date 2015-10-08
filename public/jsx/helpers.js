"use strict";

export var createFilledArray = function(numberOfElements) {
    return Array.apply(null, Array(numberOfElements)).map(function(el, i){return i});
};

export var shuffleArray = function (array) {
    var random = array.map(Math.random);
    return array.slice().sort(function(a, b) {
        return random[a] - random[b];
    });
};