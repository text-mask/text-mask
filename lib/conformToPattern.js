'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = conformToPattern;

var _utilities = require('./utilities.js');

var _getPatternParts = require('./getPatternParts.js');

var _getPatternParts2 = _interopRequireDefault(_getPatternParts);

var _getUserInputParts = require('./getUserInputParts.js');

var _getUserInputParts2 = _interopRequireDefault(_getUserInputParts);

var _assignUserInputToPatternParts = require('./assignUserInputToPatternParts.js');

var _assignUserInputToPatternParts2 = _interopRequireDefault(_assignUserInputToPatternParts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function conformToPattern(userInput, pattern) {
  var patternParts = (0, _getPatternParts2.default)(pattern);
  var userInputParts = (0, _getUserInputParts2.default)(userInput, pattern);
  var mergedParts = (0, _assignUserInputToPatternParts2.default)(patternParts, userInputParts);

  return (0, _utilities.constructConformedString)(mergedParts);
}