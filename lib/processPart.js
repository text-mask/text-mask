'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processPart;

var _utilities = require('./utilities.js');

var _constants = require('./constants.js');

function processPart() {
  var userInput = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var acceptedLength = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  var head = userInput.substr(0, acceptedLength);
  var tail = userInput.substr(acceptedLength, userInput.length);
  var sizeDifference = acceptedLength - head.length;

  return {
    results: head + (0, _utilities.printPadding)(_constants.placeholderCharacter, sizeDifference),
    remainder: tail
  };
}