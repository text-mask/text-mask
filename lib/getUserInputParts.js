'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUserInputParts;

var _utilities = require('./utilities.js');

function getUserInputParts() {
  var userInput = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var pattern = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var userInputParts = [];
  var delimiters = (0, _utilities.getDelimiters)(pattern);

  var lastEncounteredUserInputChunk = '';
  userInput.split('').forEach(function (character) {
    if (delimiters.indexOf(character) === -1) {
      lastEncounteredUserInputChunk += character;
    } else if (lastEncounteredUserInputChunk.length > 0) {
      userInputParts.push(lastEncounteredUserInputChunk);
      lastEncounteredUserInputChunk = '';
    }
  });

  if (lastEncounteredUserInputChunk.length > 0) {
    userInputParts.push(lastEncounteredUserInputChunk);
  }

  return userInputParts;
}