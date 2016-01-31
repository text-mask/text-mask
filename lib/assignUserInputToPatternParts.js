'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assignUserInputToPatternParts;

var _utilities = require('./utilities.js');

var _processPart2 = require('./processPart.js');

var _processPart3 = _interopRequireDefault(_processPart2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignUserInputToPatternParts() {
  var patternParts = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var userInputParts = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var userInputIndex = 0;
  var remainderFromLastProcessedUserInput = '';

  return patternParts.map(function (patternPart) {
    if (patternPart.length === 0) {
      return patternPart;
    }

    var userInput = userInputParts && userInputParts[userInputIndex] ? remainderFromLastProcessedUserInput + userInputParts[userInputIndex] : remainderFromLastProcessedUserInput;

    var _processPart = (0, _processPart3.default)(userInput, length);

    var remainder = _processPart.remainder;
    var results = _processPart.results;

    remainderFromLastProcessedUserInput = remainder;
    userInputIndex++;

    patternPart.content = results;

    return patternPart;
  });
}