(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["stringPattern"] = factory();
	else
		root["stringPattern"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _conformToPattern = __webpack_require__(5);

	Object.defineProperty(exports, "conformToPattern", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_conformToPattern).default;
	  }
	});

	var _adjustCursorPosition = __webpack_require__(3);

	Object.defineProperty(exports, "adjustCursorPosition", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_adjustCursorPosition).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertPatternToPlaceholder = convertPatternToPlaceholder;
	exports.removeCharactersStartingAtIndex = removeCharactersStartingAtIndex;
	exports.getOperationType = getOperationType;
	exports.getDelimiters = getDelimiters;
	exports.printPadding = printPadding;
	exports.constructConformedString = constructConformedString;

	var _constants = __webpack_require__(2);

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

	function constructConformedString(patternPartsWithContent) {
	  return patternPartsWithContent.reduce(function (accumulator, editableAreaWithContent) {
	    var _editableAreaWithCont = editableAreaWithContent.content;
	    var content = _editableAreaWithCont === undefined ? '' : _editableAreaWithCont;
	    var length = editableAreaWithContent.length;
	    var delimiter = editableAreaWithContent.delimiter;

	    var contentAndLengthDelta = length - content.length;
	    var padding = printPadding(_constants.placeholderCharacter, contentAndLengthDelta);

	    accumulator += content + padding + (delimiter || '');

	    return accumulator;
	  }, '');
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var operationTypes = exports.operationTypes = {
	  replacement: 'replacement',
	  addition: 'addition',
	  deletion: 'deletion'
	};

	var maskingCharacters = exports.maskingCharacters = ['1', 'A', '#'];

	var placeholderCharacter = exports.placeholderCharacter = '_';

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = adjustCursorPosition;

	var _diff = __webpack_require__(9);

	var _diff2 = _interopRequireDefault(_diff);

	var _utilities = __webpack_require__(1);

	var _constants = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function adjustCursorPosition() {
	  var previousUserInput = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var newUserInput = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	  var currentCursorPosition = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	  var pattern = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

	  // Nothing changed. Keep cursor at where it currently is.
	  if (previousUserInput === newUserInput) {
	    return currentCursorPosition;
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

	  // The cursor position and the change are too far apart, which means some ambiguous change
	  // happened. I.e (333) ___-____ to (333) 3__-____
	  // In that case, just return the currentCursorPosition
	  if (indexOfWhereChangeOccurred - currentCursorPosition > 1) {
	    return currentCursorPosition;
	  }

	  // There are more than one change in the diffResults, which means we're dealing with
	  // paste or select and delete operation. We don't need to adjust the cursor position
	  // for those operations.
	  if (addedCount > 1 || removedCount > 1) {
	    return currentCursorPosition;
	  }

	  var placeholder = (0, _utilities.convertPatternToPlaceholder)(pattern);

	  //console.log(placeholder);
	  //console.log(placeholder[indexOfWhereChangeOccurred - 1]);

	  if (
	  // New character was added at the end of a pattern part. Find the nearest placeholder character
	  // to the right and return that the new cursor position
	  newCharacterIsPlaceholderCharacter !== true && placeholder[indexOfWhereChangeOccurred + 1] !== undefined && placeholder[indexOfWhereChangeOccurred + 1] !== _constants.placeholderCharacter) {
	    for (var i = indexOfWhereChangeOccurred + 2; i < placeholder.length; i++) {
	      if (placeholder[i] === _constants.placeholderCharacter) {
	        return i;
	      }
	    }

	    // New character possibly at the end of entire pattern. Just keep the cursor at its place.
	    return currentCursorPosition;
	  } else if (
	  // A character has actually been deleted and the previous spot in the pattern
	  // is not a placeholder. So, find the nearest placeholder character on the left and return that
	  // as the new cursor position
	  newCharacterIsPlaceholderCharacter === true && placeholder[indexOfWhereChangeOccurred - 1] !== undefined && placeholder[indexOfWhereChangeOccurred - 1] !== _constants.placeholderCharacter) {
	    for (var i = indexOfWhereChangeOccurred - 2; i > 0; i--) {
	      if (placeholder[i] === _constants.placeholderCharacter) {
	        return i + 1; // It should be right after the next placeholder character
	      }
	    }

	    return currentCursorPosition;
	  }

	  // Not sure yet why I need this condition here. There's a logical reason for it, but I will think
	  // about it later.
	  return !newCharacterIsPlaceholderCharacter ? indexOfWhereChangeOccurred + 1 : indexOfWhereChangeOccurred;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = assignUserInputToPatternParts;

	var _utilities = __webpack_require__(1);

	var _processPart2 = __webpack_require__(8);

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = conformToPattern;

	var _utilities = __webpack_require__(1);

	var _getPatternParts = __webpack_require__(6);

	var _getPatternParts2 = _interopRequireDefault(_getPatternParts);

	var _getUserInputParts = __webpack_require__(7);

	var _getUserInputParts2 = _interopRequireDefault(_getUserInputParts);

	var _assignUserInputToPatternParts = __webpack_require__(4);

	var _assignUserInputToPatternParts2 = _interopRequireDefault(_assignUserInputToPatternParts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function conformToPattern(userInput, pattern) {
	  var patternParts = (0, _getPatternParts2.default)(pattern);
	  var userInputParts = (0, _getUserInputParts2.default)(userInput, pattern);
	  var mergedParts = (0, _assignUserInputToPatternParts2.default)(patternParts, userInputParts);

	  return (0, _utilities.constructConformedString)(mergedParts);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getPatternParts;

	var _constants = __webpack_require__(2);

	var _utilities = __webpack_require__(1);

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUserInputParts;

	var _utilities = __webpack_require__(1);

	function getUserInputParts() {
	  var userInput = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var pattern = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  var userInputParts = [];
	  var delimiters = (0, _utilities.getDelimiters)(pattern);

	  var lastEncounteredUserInputChunk = '';
	  userInput.split('').forEach(function (character) {
	    if (delimiters.indexOf(character) === -1) {
	      lastEncounteredUserInputChunk += character;
	    } else if (lastEncounteredUserInputChunk.length > 0) {
	      userInputParts.push(lastEncounteredUserInputChunk);
	      lastEncounteredUserInputChunk = '';
	    }
	  });

	  if (lastEncounteredUserInputChunk.length > 0) {
	    userInputParts.push(lastEncounteredUserInputChunk);
	  }

	  return userInputParts;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = processPart;

	var _utilities = __webpack_require__(1);

	var _constants = __webpack_require__(2);

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* See LICENSE file for terms of use */

	/*
	 * Text diff implementation.
	 *
	 * This library supports the following APIS:
	 * JsDiff.diffChars: Character by character diff
	 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
	 * JsDiff.diffLines: Line based diff
	 *
	 * JsDiff.diffCss: Diff targeted at CSS content
	 *
	 * These methods are based on the implementation proposed in
	 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
	 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
	 */
	(function(global, undefined) {
	  var objectPrototypeToString = Object.prototype.toString;

	  /*istanbul ignore next*/
	  function map(arr, mapper, that) {
	    if (Array.prototype.map) {
	      return Array.prototype.map.call(arr, mapper, that);
	    }

	    var other = new Array(arr.length);

	    for (var i = 0, n = arr.length; i < n; i++) {
	      other[i] = mapper.call(that, arr[i], i, arr);
	    }
	    return other;
	  }
	  function clonePath(path) {
	    return { newPos: path.newPos, components: path.components.slice(0) };
	  }
	  function removeEmpty(array) {
	    var ret = [];
	    for (var i = 0; i < array.length; i++) {
	      if (array[i]) {
	        ret.push(array[i]);
	      }
	    }
	    return ret;
	  }
	  function escapeHTML(s) {
	    var n = s;
	    n = n.replace(/&/g, '&amp;');
	    n = n.replace(/</g, '&lt;');
	    n = n.replace(/>/g, '&gt;');
	    n = n.replace(/"/g, '&quot;');

	    return n;
	  }

	  // This function handles the presence of circular references by bailing out when encountering an
	  // object that is already on the "stack" of items being processed.
	  function canonicalize(obj, stack, replacementStack) {
	    stack = stack || [];
	    replacementStack = replacementStack || [];

	    var i;

	    for (i = 0; i < stack.length; i += 1) {
	      if (stack[i] === obj) {
	        return replacementStack[i];
	      }
	    }

	    var canonicalizedObj;

	    if ('[object Array]' === objectPrototypeToString.call(obj)) {
	      stack.push(obj);
	      canonicalizedObj = new Array(obj.length);
	      replacementStack.push(canonicalizedObj);
	      for (i = 0; i < obj.length; i += 1) {
	        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack);
	      }
	      stack.pop();
	      replacementStack.pop();
	    } else if (typeof obj === 'object' && obj !== null) {
	      stack.push(obj);
	      canonicalizedObj = {};
	      replacementStack.push(canonicalizedObj);
	      var sortedKeys = [],
	          key;
	      for (key in obj) {
	        sortedKeys.push(key);
	      }
	      sortedKeys.sort();
	      for (i = 0; i < sortedKeys.length; i += 1) {
	        key = sortedKeys[i];
	        canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack);
	      }
	      stack.pop();
	      replacementStack.pop();
	    } else {
	      canonicalizedObj = obj;
	    }
	    return canonicalizedObj;
	  }

	  function buildValues(components, newString, oldString, useLongestToken) {
	    var componentPos = 0,
	        componentLen = components.length,
	        newPos = 0,
	        oldPos = 0;

	    for (; componentPos < componentLen; componentPos++) {
	      var component = components[componentPos];
	      if (!component.removed) {
	        if (!component.added && useLongestToken) {
	          var value = newString.slice(newPos, newPos + component.count);
	          value = map(value, function(value, i) {
	            var oldValue = oldString[oldPos + i];
	            return oldValue.length > value.length ? oldValue : value;
	          });

	          component.value = value.join('');
	        } else {
	          component.value = newString.slice(newPos, newPos + component.count).join('');
	        }
	        newPos += component.count;

	        // Common case
	        if (!component.added) {
	          oldPos += component.count;
	        }
	      } else {
	        component.value = oldString.slice(oldPos, oldPos + component.count).join('');
	        oldPos += component.count;

	        // Reverse add and remove so removes are output first to match common convention
	        // The diffing algorithm is tied to add then remove output and this is the simplest
	        // route to get the desired output with minimal overhead.
	        if (componentPos && components[componentPos - 1].added) {
	          var tmp = components[componentPos - 1];
	          components[componentPos - 1] = components[componentPos];
	          components[componentPos] = tmp;
	        }
	      }
	    }

	    return components;
	  }

	  function Diff(ignoreWhitespace) {
	    this.ignoreWhitespace = ignoreWhitespace;
	  }
	  Diff.prototype = {
	    diff: function(oldString, newString, callback) {
	      var self = this;

	      function done(value) {
	        if (callback) {
	          setTimeout(function() { callback(undefined, value); }, 0);
	          return true;
	        } else {
	          return value;
	        }
	      }

	      // Handle the identity case (this is due to unrolling editLength == 0
	      if (newString === oldString) {
	        return done([{ value: newString }]);
	      }
	      if (!newString) {
	        return done([{ value: oldString, removed: true }]);
	      }
	      if (!oldString) {
	        return done([{ value: newString, added: true }]);
	      }

	      newString = this.tokenize(newString);
	      oldString = this.tokenize(oldString);

	      var newLen = newString.length, oldLen = oldString.length;
	      var editLength = 1;
	      var maxEditLength = newLen + oldLen;
	      var bestPath = [{ newPos: -1, components: [] }];

	      // Seed editLength = 0, i.e. the content starts with the same values
	      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
	      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	        // Identity per the equality and tokenizer
	        return done([{value: newString.join('')}]);
	      }

	      // Main worker method. checks all permutations of a given edit length for acceptance.
	      function execEditLength() {
	        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
	          var basePath;
	          var addPath = bestPath[diagonalPath - 1],
	              removePath = bestPath[diagonalPath + 1],
	              oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
	          if (addPath) {
	            // No one else is going to attempt to use this value, clear it
	            bestPath[diagonalPath - 1] = undefined;
	          }

	          var canAdd = addPath && addPath.newPos + 1 < newLen,
	              canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
	          if (!canAdd && !canRemove) {
	            // If this path is a terminal then prune
	            bestPath[diagonalPath] = undefined;
	            continue;
	          }

	          // Select the diagonal that we want to branch from. We select the prior
	          // path whose position in the new string is the farthest from the origin
	          // and does not pass the bounds of the diff graph
	          if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
	            basePath = clonePath(removePath);
	            self.pushComponent(basePath.components, undefined, true);
	          } else {
	            basePath = addPath;   // No need to clone, we've pulled it from the list
	            basePath.newPos++;
	            self.pushComponent(basePath.components, true, undefined);
	          }

	          oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);

	          // If we have hit the end of both strings, then we are done
	          if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	            return done(buildValues(basePath.components, newString, oldString, self.useLongestToken));
	          } else {
	            // Otherwise track this path as a potential candidate and continue.
	            bestPath[diagonalPath] = basePath;
	          }
	        }

	        editLength++;
	      }

	      // Performs the length of edit iteration. Is a bit fugly as this has to support the
	      // sync and async mode which is never fun. Loops over execEditLength until a value
	      // is produced.
	      if (callback) {
	        (function exec() {
	          setTimeout(function() {
	            // This should not happen, but we want to be safe.
	            /*istanbul ignore next */
	            if (editLength > maxEditLength) {
	              return callback();
	            }

	            if (!execEditLength()) {
	              exec();
	            }
	          }, 0);
	        }());
	      } else {
	        while (editLength <= maxEditLength) {
	          var ret = execEditLength();
	          if (ret) {
	            return ret;
	          }
	        }
	      }
	    },

	    pushComponent: function(components, added, removed) {
	      var last = components[components.length - 1];
	      if (last && last.added === added && last.removed === removed) {
	        // We need to clone here as the component clone operation is just
	        // as shallow array clone
	        components[components.length - 1] = {count: last.count + 1, added: added, removed: removed };
	      } else {
	        components.push({count: 1, added: added, removed: removed });
	      }
	    },
	    extractCommon: function(basePath, newString, oldString, diagonalPath) {
	      var newLen = newString.length,
	          oldLen = oldString.length,
	          newPos = basePath.newPos,
	          oldPos = newPos - diagonalPath,

	          commonCount = 0;
	      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
	        newPos++;
	        oldPos++;
	        commonCount++;
	      }

	      if (commonCount) {
	        basePath.components.push({count: commonCount});
	      }

	      basePath.newPos = newPos;
	      return oldPos;
	    },

	    equals: function(left, right) {
	      var reWhitespace = /\S/;
	      return left === right || (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right));
	    },
	    tokenize: function(value) {
	      return value.split('');
	    }
	  };

	  var CharDiff = new Diff();

	  var WordDiff = new Diff(true);
	  var WordWithSpaceDiff = new Diff();
	  WordDiff.tokenize = WordWithSpaceDiff.tokenize = function(value) {
	    return removeEmpty(value.split(/(\s+|\b)/));
	  };

	  var CssDiff = new Diff(true);
	  CssDiff.tokenize = function(value) {
	    return removeEmpty(value.split(/([{}:;,]|\s+)/));
	  };

	  var LineDiff = new Diff();

	  var TrimmedLineDiff = new Diff();
	  TrimmedLineDiff.ignoreTrim = true;

	  LineDiff.tokenize = TrimmedLineDiff.tokenize = function(value) {
	    var retLines = [],
	        lines = value.split(/^/m);
	    for (var i = 0; i < lines.length; i++) {
	      var line = lines[i],
	          lastLine = lines[i - 1],
	          lastLineLastChar = lastLine && lastLine[lastLine.length - 1];

	      // Merge lines that may contain windows new lines
	      if (line === '\n' && lastLineLastChar === '\r') {
	          retLines[retLines.length - 1] = retLines[retLines.length - 1].slice(0, -1) + '\r\n';
	      } else {
	        if (this.ignoreTrim) {
	          line = line.trim();
	          // add a newline unless this is the last line.
	          if (i < lines.length - 1) {
	            line += '\n';
	          }
	        }
	        retLines.push(line);
	      }
	    }

	    return retLines;
	  };

	  var PatchDiff = new Diff();
	  PatchDiff.tokenize = function(value) {
	    var ret = [],
	        linesAndNewlines = value.split(/(\n|\r\n)/);

	    // Ignore the final empty token that occurs if the string ends with a new line
	    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
	      linesAndNewlines.pop();
	    }

	    // Merge the content and line separators into single tokens
	    for (var i = 0; i < linesAndNewlines.length; i++) {
	      var line = linesAndNewlines[i];

	      if (i % 2) {
	        ret[ret.length - 1] += line;
	      } else {
	        ret.push(line);
	      }
	    }
	    return ret;
	  };

	  var SentenceDiff = new Diff();
	  SentenceDiff.tokenize = function(value) {
	    return removeEmpty(value.split(/(\S.+?[.!?])(?=\s+|$)/));
	  };

	  var JsonDiff = new Diff();
	  // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
	  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
	  JsonDiff.useLongestToken = true;
	  JsonDiff.tokenize = LineDiff.tokenize;
	  JsonDiff.equals = function(left, right) {
	    return LineDiff.equals(left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
	  };

	  var JsDiff = {
	    Diff: Diff,

	    diffChars: function(oldStr, newStr, callback) { return CharDiff.diff(oldStr, newStr, callback); },
	    diffWords: function(oldStr, newStr, callback) { return WordDiff.diff(oldStr, newStr, callback); },
	    diffWordsWithSpace: function(oldStr, newStr, callback) { return WordWithSpaceDiff.diff(oldStr, newStr, callback); },
	    diffLines: function(oldStr, newStr, callback) { return LineDiff.diff(oldStr, newStr, callback); },
	    diffTrimmedLines: function(oldStr, newStr, callback) { return TrimmedLineDiff.diff(oldStr, newStr, callback); },

	    diffSentences: function(oldStr, newStr, callback) { return SentenceDiff.diff(oldStr, newStr, callback); },

	    diffCss: function(oldStr, newStr, callback) { return CssDiff.diff(oldStr, newStr, callback); },
	    diffJson: function(oldObj, newObj, callback) {
	      return JsonDiff.diff(
	        typeof oldObj === 'string' ? oldObj : JSON.stringify(canonicalize(oldObj), undefined, '  '),
	        typeof newObj === 'string' ? newObj : JSON.stringify(canonicalize(newObj), undefined, '  '),
	        callback
	      );
	    },

	    createTwoFilesPatch: function(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader) {
	      var ret = [];

	      if (oldFileName == newFileName) {
	        ret.push('Index: ' + oldFileName);
	      }
	      ret.push('===================================================================');
	      ret.push('--- ' + oldFileName + (typeof oldHeader === 'undefined' ? '' : '\t' + oldHeader));
	      ret.push('+++ ' + newFileName + (typeof newHeader === 'undefined' ? '' : '\t' + newHeader));

	      var diff = PatchDiff.diff(oldStr, newStr);
	      diff.push({value: '', lines: []});   // Append an empty value to make cleanup easier

	      // Formats a given set of lines for printing as context lines in a patch
	      function contextLines(lines) {
	        return map(lines, function(entry) { return ' ' + entry; });
	      }

	      // Outputs the no newline at end of file warning if needed
	      function eofNL(curRange, i, current) {
	        var last = diff[diff.length - 2],
	            isLast = i === diff.length - 2,
	            isLastOfType = i === diff.length - 3 && current.added !== last.added;

	        // Figure out if this is the last line for the given file and missing NL
	        if (!(/\n$/.test(current.value)) && (isLast || isLastOfType)) {
	          curRange.push('\\ No newline at end of file');
	        }
	      }

	      var oldRangeStart = 0, newRangeStart = 0, curRange = [],
	          oldLine = 1, newLine = 1;
	      for (var i = 0; i < diff.length; i++) {
	        var current = diff[i],
	            lines = current.lines || current.value.replace(/\n$/, '').split('\n');
	        current.lines = lines;

	        if (current.added || current.removed) {
	          // If we have previous context, start with that
	          if (!oldRangeStart) {
	            var prev = diff[i - 1];
	            oldRangeStart = oldLine;
	            newRangeStart = newLine;

	            if (prev) {
	              curRange = contextLines(prev.lines.slice(-4));
	              oldRangeStart -= curRange.length;
	              newRangeStart -= curRange.length;
	            }
	          }

	          // Output our changes
	          curRange.push.apply(curRange, map(lines, function(entry) {
	            return (current.added ? '+' : '-') + entry;
	          }));
	          eofNL(curRange, i, current);

	          // Track the updated file position
	          if (current.added) {
	            newLine += lines.length;
	          } else {
	            oldLine += lines.length;
	          }
	        } else {
	          // Identical context lines. Track line changes
	          if (oldRangeStart) {
	            // Close out any changes that have been output (or join overlapping)
	            if (lines.length <= 8 && i < diff.length - 2) {
	              // Overlapping
	              curRange.push.apply(curRange, contextLines(lines));
	            } else {
	              // end the range and output
	              var contextSize = Math.min(lines.length, 4);
	              ret.push(
	                  '@@ -' + oldRangeStart + ',' + (oldLine - oldRangeStart + contextSize)
	                  + ' +' + newRangeStart + ',' + (newLine - newRangeStart + contextSize)
	                  + ' @@');
	              ret.push.apply(ret, curRange);
	              ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));
	              if (lines.length <= 4) {
	                eofNL(ret, i, current);
	              }

	              oldRangeStart = 0;
	              newRangeStart = 0;
	              curRange = [];
	            }
	          }
	          oldLine += lines.length;
	          newLine += lines.length;
	        }
	      }

	      return ret.join('\n') + '\n';
	    },

	    createPatch: function(fileName, oldStr, newStr, oldHeader, newHeader) {
	      return JsDiff.createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader);
	    },

	    applyPatch: function(oldStr, uniDiff) {
	      var diffstr = uniDiff.split('\n'),
	          hunks = [],
	          i = 0,
	          remEOFNL = false,
	          addEOFNL = false;

	      // Skip to the first change hunk
	      while (i < diffstr.length && !(/^@@/.test(diffstr[i]))) {
	        i++;
	      }

	      // Parse the unified diff
	      for (; i < diffstr.length; i++) {
	        if (diffstr[i][0] === '@') {
	          var chnukHeader = diffstr[i].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);
	          hunks.unshift({
	            start: chnukHeader[3],
	            oldlength: +chnukHeader[2],
	            removed: [],
	            newlength: chnukHeader[4],
	            added: []
	          });
	        } else if (diffstr[i][0] === '+') {
	          hunks[0].added.push(diffstr[i].substr(1));
	        } else if (diffstr[i][0] === '-') {
	          hunks[0].removed.push(diffstr[i].substr(1));
	        } else if (diffstr[i][0] === ' ') {
	          hunks[0].added.push(diffstr[i].substr(1));
	          hunks[0].removed.push(diffstr[i].substr(1));
	        } else if (diffstr[i][0] === '\\') {
	          if (diffstr[i - 1][0] === '+') {
	            remEOFNL = true;
	          } else if (diffstr[i - 1][0] === '-') {
	            addEOFNL = true;
	          }
	        }
	      }

	      // Apply the diff to the input
	      var lines = oldStr.split('\n');
	      for (i = hunks.length - 1; i >= 0; i--) {
	        var hunk = hunks[i];
	        // Sanity check the input string. Bail if we don't match.
	        for (var j = 0; j < hunk.oldlength; j++) {
	          if (lines[hunk.start - 1 + j] !== hunk.removed[j]) {
	            return false;
	          }
	        }
	        Array.prototype.splice.apply(lines, [hunk.start - 1, hunk.oldlength].concat(hunk.added));
	      }

	      // Handle EOFNL insertion/removal
	      if (remEOFNL) {
	        while (!lines[lines.length - 1]) {
	          lines.pop();
	        }
	      } else if (addEOFNL) {
	        lines.push('');
	      }
	      return lines.join('\n');
	    },

	    convertChangesToXML: function(changes) {
	      var ret = [];
	      for (var i = 0; i < changes.length; i++) {
	        var change = changes[i];
	        if (change.added) {
	          ret.push('<ins>');
	        } else if (change.removed) {
	          ret.push('<del>');
	        }

	        ret.push(escapeHTML(change.value));

	        if (change.added) {
	          ret.push('</ins>');
	        } else if (change.removed) {
	          ret.push('</del>');
	        }
	      }
	      return ret.join('');
	    },

	    // See: http://code.google.com/p/google-diff-match-patch/wiki/API
	    convertChangesToDMP: function(changes) {
	      var ret = [],
	          change,
	          operation;
	      for (var i = 0; i < changes.length; i++) {
	        change = changes[i];
	        if (change.added) {
	          operation = 1;
	        } else if (change.removed) {
	          operation = -1;
	        } else {
	          operation = 0;
	        }

	        ret.push([operation, change.value]);
	      }
	      return ret;
	    },

	    canonicalize: canonicalize
	  };

	  /*istanbul ignore next */
	  /*global module */
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = JsDiff;
	  } else if (true) {
	    /*global define */
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return JsDiff; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof global.JsDiff === 'undefined') {
	    global.JsDiff = JsDiff;
	  }
	}(this));


/***/ }
/******/ ])
});
;