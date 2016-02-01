'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = conformToPattern;

var _utilities = require('./utilities.js');

var _constants = require('./constants.js');

var _assignUserInputToPatternPositions = require('./assignUserInputToPatternPositions.js');

var _assignUserInputToPatternPositions2 = _interopRequireDefault(_assignUserInputToPatternPositions);

var _insertCharactersIntoPattern = require('./insertCharactersIntoPattern.js');

var _insertCharactersIntoPattern2 = _interopRequireDefault(_insertCharactersIntoPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function conformToPattern(userInput, pattern) {
  var characterPositions = (0, _assignUserInputToPatternPositions2.default)(userInput, pattern);

  return (0, _insertCharactersIntoPattern2.default)(characterPositions, pattern);
}