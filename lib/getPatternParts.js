'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPatternParts;

var _constants = require('./constants.js');

var _utilities = require('./utilities.js');

function getPatternParts() {
  var pattern = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  var placeholder = (0, _utilities.convertPatternToPlaceholder)(pattern);
  var patternParts = [];

  var lengthOfPart = 0;
  placeholder.split('').forEach(function (character) {
    if (character === _constants.placeholderCharacter) {
      lengthOfPart++;
    } else {
      patternParts.push({
        length: lengthOfPart,
        delimiter: character,
        content: ''
      });

      lengthOfPart = 0;
    }
  });

  if (lengthOfPart > 0) {
    patternParts.push({
      length: lengthOfPart,
      delimiter: '',
      content: ''
    });
  }

  return patternParts;
}