'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertPatternToPlaceholder = convertPatternToPlaceholder;
exports.removeCharactersStartingAtIndex = removeCharactersStartingAtIndex;
exports.getOperationType = getOperationType;
exports.getDelimiters = getDelimiters;
exports.printPadding = printPadding;
exports.findCharacter = findCharacter;

var _constants = require('./constants.js');

function convertPatternToPlaceholder() {
  var pattern = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  return pattern.replace(/1/g, _constants.placeholderCharacter);
}

function removeCharactersStartingAtIndex() {
  var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var numberOfCharacters = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return string.substring(0, index) + string.substring(index + numberOfCharacters);
}

function getOperationType() {
  var currentValue = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var previousValue = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  return currentValue.length === previousValue.length ? _constants.operationTypes.replacement : currentValue.length > previousValue.length ? _constants.operationTypes.addition : currentValue.length < previousValue.length ? _constants.operationTypes.deletion : null;
}

function getDelimiters() {
  var pattern = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  return pattern.split('').reduce(function (accumulator, character) {
    if (_constants.maskingCharacters.indexOf(character) === -1 && accumulator.indexOf(character) === -1) {
      accumulator.push(character);
    }

    return accumulator;
  }, []);
}

function printPadding(paddingCharacter, length) {
  return Array.from({ length: length }, function () {
    return paddingCharacter;
  }).join('');
}

function findCharacter() {
  var characterPositions = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var location = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  for (var i = 0; i < characterPositions.length; i++) {
    var characterPosition = characterPositions[i];

    if (characterPosition.area === location.area && characterPosition.position === location.position) {
      return characterPosition.character;
    }
  }
}