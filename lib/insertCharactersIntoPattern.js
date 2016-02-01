'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertCharactersIntoPattern;

var _utilities = require('./utilities.js');

var _constants = require('./constants.js');

function insertCharactersIntoPattern() {
  var characterPositions = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var pattern = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var placeholder = (0, _utilities.convertPatternToPlaceholder)(pattern);

  var currentArea = 0;
  var currentPosition = 0;
  var canAdvanceToNextArea = false;

  return placeholder.split('').map(function (patternCharacter) {
    if (patternCharacter === _constants.placeholderCharacter) {
      var userInputCharacter = (0, _utilities.findCharacter)(characterPositions, {
        area: currentArea,
        position: currentPosition
      });

      currentPosition++;
      canAdvanceToNextArea = true;

      return userInputCharacter || patternCharacter;
    } else if (canAdvanceToNextArea) {
      currentArea++;
      currentPosition = 0;
      canAdvanceToNextArea = false;
    }

    return patternCharacter;
  }).join('');
}