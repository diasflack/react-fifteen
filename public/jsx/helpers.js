"use strict";

export var createFilledArray = (numberOfElements) => {
    return Array.apply(null, Array(numberOfElements)).map((el, i) => i);
};

export var shuffleArray = (array) => {
    var random = array.map(Math.random);
    return array.slice().sort((a, b)  => random[a] - random[b]);
};