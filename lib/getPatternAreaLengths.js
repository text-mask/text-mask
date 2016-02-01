'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPatternAreaLengths;

var _constants = require('./constants.js');

var _utilities = require('./utilities.js');

function getPatternAreaLengths() {
  var pattern = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  var placeholder = (0, _utilities.convertPatternToPlaceholder)(pattern);
  var patternAreaLengths = [];

  var lengthOfArea = 0;
  placeholder.split('').forEach(function (character) {
    if (character === _constants.placeholderCharacter) {
      lengthOfArea++;
    } else if (lengthOfArea > 0) {
      patternAreaLengths.push(lengthOfArea);

      lengthOfArea = 0;
    }
  });

  if (lengthOfArea > 0) {
    patternAreaLengths.push(lengthOfArea);
  }

  return patternAreaLengths;
}