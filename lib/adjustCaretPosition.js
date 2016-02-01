'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = adjustCaretPosition;

var _diff = require('diff');

var _diff2 = _interopRequireDefault(_diff);

var _utilities = require('./utilities.js');

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function adjustCaretPosition() {
  var previousUserInput = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var newUserInput = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  var currentCaretPosition = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var pattern = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

  // Nothing changed. Keep caret at where it currently is.
  if (previousUserInput === newUserInput) {
    return currentCaretPosition;
  }

  var diffResults = _diff2.default.diffChars(previousUserInput, newUserInput);

  var addedCount = 0;
  var removedCount = 0;
  var charactersBeforeChangeOccurred = '';
  var indexOfWhereChangeOccurred = -1;
  var newCharacterIsPlaceholderCharacter = null;

  diffResults.forEach(function (result) {
    charactersBeforeChangeOccurred += result.value;

    if (result.added === true) {
      addedCount += result.count;
      newCharacterIsPlaceholderCharacter = result.value === _constants.placeholderCharacter;
      indexOfWhereChangeOccurred = indexOfWhereChangeOccurred === -1 ? charactersBeforeChangeOccurred.length - 1 : indexOfWhereChangeOccurred;
    }

    if (result.removed === true) {
      removedCount += result.count;
      indexOfWhereChangeOccurred = indexOfWhereChangeOccurred === -1 ? charactersBeforeChangeOccurred.length - 1 : indexOfWhereChangeOccurred;
    }
  });

  //console.log(diffResults);
  //console.log(indexOfWhereChangeOccurred);
  //console.log(newCharacterIsPlaceholderCharacter);

  // The caret position and the change are too far apart, which means some ambiguous change
  // happened. I.e (333) ___-____ to (333) 3__-____
  // In that case, just return the currentCaretPosition
  if (indexOfWhereChangeOccurred - currentCaretPosition > 1) {
    return currentCaretPosition;
  }

  // There are more than one change in the diffResults, which means we're dealing with
  // paste or select and delete operation. We don't need to adjust the caret position
  // for those operations.
  if (addedCount > 1 || removedCount > 1) {
    return currentCaretPosition;
  }

  var placeholder = (0, _utilities.convertPatternToPlaceholder)(pattern);

  //console.log(placeholder);
  //console.log(placeholder[indexOfWhereChangeOccurred - 1]);

  if (
  // New character was added at the end of a pattern part. Find the nearest placeholder character
  // to the right and return that the new caret position
  newCharacterIsPlaceholderCharacter !== true && placeholder[indexOfWhereChangeOccurred + 1] !== undefined && placeholder[indexOfWhereChangeOccurred + 1] !== _constants.placeholderCharacter) {
    for (var i = indexOfWhereChangeOccurred + 2; i < placeholder.length; i++) {
      if (placeholder[i] === _constants.placeholderCharacter) {
        return i;
      }
    }

    // New character possibly at the end of entire pattern. Just keep the caret at its place.
    return currentCaretPosition;
  } else if (
  // A character has actually been deleted and the previous spot in the pattern
  // is not a placeholder. So, find the nearest placeholder character on the left and return that
  // as the new caret position
  newCharacterIsPlaceholderCharacter === true && placeholder[indexOfWhereChangeOccurred - 1] !== undefined && placeholder[indexOfWhereChangeOccurred - 1] !== _constants.placeholderCharacter) {
    for (var i = indexOfWhereChangeOccurred - 2; i > 0; i--) {
      if (placeholder[i] === _constants.placeholderCharacter) {
        return i + 1; // It should be right after the next placeholder character
      }
    }

    return currentCaretPosition;
  }

  // Not sure yet why I need this condition here. There's a logical reason for it, but I will think
  // about it later.
  return !newCharacterIsPlaceholderCharacter ? indexOfWhereChangeOccurred + 1 : indexOfWhereChangeOccurred;
}