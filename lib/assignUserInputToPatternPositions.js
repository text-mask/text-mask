'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assignUserInputToPatternPositions;

var _utilities = require('./utilities.js');

var _constants = require('./constants.js');

var _getPatternAreaLengths = require('./getPatternAreaLengths.js');

var _getPatternAreaLengths2 = _interopRequireDefault(_getPatternAreaLengths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignUserInputToPatternPositions() {
  var userInput = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var pattern = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var patternDelimiters = (0, _utilities.getDelimiters)(pattern);
  var assignedCharacters = [];
  var patternAreaLengths = (0, _getPatternAreaLengths2.default)(pattern);
  var remainingPatternAreaLengths = patternAreaLengths.slice();

  var areaPositionIndex = 0;
  var currentPatternAreaIndex = 0;

  userInput.split('').forEach(function (character) {
    if (
    // character is NOT pattern delimiter
    patternDelimiters.indexOf(character) === -1 &&
    // character is NOT a placeholder character
    character !== _constants.placeholderCharacter &&
    // There are still empty placeholder spots in the current pattern area
    remainingPatternAreaLengths[currentPatternAreaIndex] > 0 && (
    // We are NOT outside the boundaries of the pattern

    // This is NOT the last area of the pattern
    currentPatternAreaIndex !== patternAreaLengths.length - 1 ||
    // This IS the last area of the pattern
    currentPatternAreaIndex === patternAreaLengths.length - 1 &&
    // The area position index is still within the boundaries of the last area
    areaPositionIndex <= patternAreaLengths[currentPatternAreaIndex])) {
      assignedCharacters.push({
        character: character,
        position: areaPositionIndex,
        area: currentPatternAreaIndex
      });

      areaPositionIndex++;
      remainingPatternAreaLengths[currentPatternAreaIndex]--;
    } else if (character === _constants.placeholderCharacter) {
      areaPositionIndex++;
      remainingPatternAreaLengths[currentPatternAreaIndex]--;
    }

    // Should we advance to the next pattern area?
    if (patternDelimiters.indexOf(character) !== -1 && remainingPatternAreaLengths[currentPatternAreaIndex] <= 0 || areaPositionIndex + 1 > patternAreaLengths[currentPatternAreaIndex]) {
      var remainingCharactersInPatternArea = areaPositionIndex - patternAreaLengths[currentPatternAreaIndex];

      areaPositionIndex = 0;
      currentPatternAreaIndex++;

      while (remainingCharactersInPatternArea > 0) {
        areaPositionIndex++;
        remainingCharactersInPatternArea--;
      }
    }
  });

  return assignedCharacters;
}