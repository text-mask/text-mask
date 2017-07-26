(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["angular1TextMask"] = factory();
	else
		root["angular1TextMask"] = factory();
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.conformToMask = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*global angular*/


	var _conformToMask = __webpack_require__(2);

	Object.defineProperty(exports, 'conformToMask', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_conformToMask).default;
	  }
	});

	var _createTextMaskInputElement = __webpack_require__(5);

	var _createTextMaskInputElement2 = _interopRequireDefault(_createTextMaskInputElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function removeExcessNumbers(decimal, limit) {
	  return typeof decimal === 'string' ? decimal.slice(0, limit) : "";
	}

	function prepareForMask(value, conf) {
	  var result = "";
	  if (value || value === 0) {
	    var separatedValue = value.toString().split(".");
	    if (conf.allowDecimal && separatedValue[1]) {
	      result = separatedValue[0] + conf.decimalSymbol + removeExcessNumbers(separatedValue[1], conf.decimalLimit);
	    } else {
	      result = separatedValue[0];
	    }
	  }
	  console.log("prepareForMask: ", result);
	  return result;
	}

	function textMask() {
	  'ngInject';

	  return {
	    restrict: 'A',
	    require: 'ngModel',
	    scope: {
	      textMask: '=',
	      intValue: '='
	    },
	    link: function link(scope, element, attrs, ngModel) {
	      var inputElement;
	      var textMaskInputElement;

	      if (element[0].tagName === 'INPUT') {
	        // `textMask` directive is used directly on an input element
	        inputElement = element[0];
	      } else {
	        // `textMask` directive is used on an abstracted input element
	        inputElement = element[0].getElementsByTagName('INPUT')[0];
	      }

	      element.on('blur keyup change input', function () {
	        textMaskInputElement.update(inputElement.value);
	        ngModel.$setViewValue(inputElement.value);
	      });

	      // reset Text Mask when `scope.textMask` object changes
	      scope.$watch('textMask', function (newMask, oldMaks) {
	        initTextMask();
	        var value = void 0;
	        if (newMask.maskedConfig) {
	          value = prepareForMask(scope.intValue, newMask.maskedConfig);
	        }
	        textMaskInputElement.update(value);
	      }, true);

	      function initTextMask() {
	        textMaskInputElement = (0, _createTextMaskInputElement2.default)(_extends({ inputElement: inputElement }, scope.textMask));
	      }

	      function formatter(fromModelValue) {
	        // set the `inputElement.value` for cases where the `mask` is disabled
	        inputElement.value = fromModelValue;

	        textMaskInputElement.update(fromModelValue);
	        return inputElement.value;
	      }

	      initTextMask();
	      ngModel.$formatters.unshift(formatter);
	    }
	  };
	}

	var textMaskModule = angular.module('text-mask', []).directive('textMask', textMask).name;

	exports.default = textMaskModule;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var placeholderChar = exports.placeholderChar = '_';

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = conformToMask;

	var _utilities = __webpack_require__(3);

	var _constants = __webpack_require__(1);

	var emptyString = '';

	function conformToMask() {
	  var rawValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyString;
	  var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyString;
	  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  // These configurations tell us how to conform the mask
	  var _config$guide = config.guide,
	      guide = _config$guide === undefined ? true : _config$guide,
	      _config$previousConfo = config.previousConformedValue,
	      previousConformedValue = _config$previousConfo === undefined ? emptyString : _config$previousConfo,
	      _config$placeholderCh = config.placeholderChar,
	      placeholderChar = _config$placeholderCh === undefined ? _constants.placeholderChar : _config$placeholderCh,
	      _config$placeholder = config.placeholder,
	      placeholder = _config$placeholder === undefined ? (0, _utilities.convertMaskToPlaceholder)(mask, placeholderChar) : _config$placeholder,
	      currentCaretPosition = config.currentCaretPosition,
	      keepCharPositions = config.keepCharPositions;

	  // The configs below indicate that the user wants the algorithm to work in *no guide* mode

	  var suppressGuide = guide === false && previousConformedValue !== undefined;

	  // Calculate lengths once for performance
	  var rawValueLength = rawValue.length;
	  var previousConformedValueLength = previousConformedValue.length;
	  var placeholderLength = placeholder.length;
	  var maskLength = mask.length;

	  // This tells us the number of edited characters and the direction in which they were edited (+/-)
	  var editDistance = rawValueLength - previousConformedValueLength;

	  // In *no guide* mode, we need to know if the user is trying to add a character or not
	  var isAddition = editDistance > 0;

	  // Tells us the index of the first change. For (438) 394-4938 to (38) 394-4938, that would be 1
	  var indexOfFirstChange = currentCaretPosition + (isAddition ? -editDistance : 0);

	  // We're also gonna need the index of last change, which we can derive as follows...
	  var indexOfLastChange = indexOfFirstChange + Math.abs(editDistance);

	  // If `conformToMask` is configured to keep character positions, that is, for mask 111, previous value
	  // _2_ and raw value 3_2_, the new conformed value should be 32_, not 3_2 (default behavior). That's in the case of
	  // addition. And in the case of deletion, previous value _23, raw value _3, the new conformed string should be
	  // __3, not _3_ (default behavior)
	  //
	  // The next block of logic handles keeping character positions for the case of deletion. (Keeping
	  // character positions for the case of addition is further down since it is handled differently.)
	  // To do this, we want to compensate for all characters that were deleted
	  if (keepCharPositions === true && !isAddition) {
	    // We will be storing the new placeholder characters in this variable.
	    var compensatingPlaceholderChars = emptyString;

	    // For every character that was deleted from a placeholder position, we add a placeholder char
	    for (var i = indexOfFirstChange; i < indexOfLastChange; i++) {
	      if (placeholder[i] === placeholderChar) {
	        compensatingPlaceholderChars += placeholderChar;
	      }
	    }

	    // Now we trick our algorithm by modifying the raw value to make it contain additional placeholder characters
	    // That way when the we start laying the characters again on the mask, it will keep the non-deleted characters
	    // in their positions.
	    rawValue = rawValue.slice(0, indexOfFirstChange) + compensatingPlaceholderChars + rawValue.slice(indexOfFirstChange, rawValueLength);
	  }

	  // Convert `rawValue` string to an array, and mark characters based on whether they are newly added or have
	  // existed in the previous conformed value. Identifying new and old characters is needed for `conformToMask`
	  // to work if it is configured to keep character positions.
	  var rawValueArr = rawValue.split(emptyString).map(function (char, i) {
	    return { char: char, isNew: i >= indexOfFirstChange && i < indexOfLastChange };
	  });

	  // The loop below removes masking characters from user input. For example, for mask
	  // `00 (111)`, the placeholder would be `00 (___)`. If user input is `00 (234)`, the loop below
	  // would remove all characters but `234` from the `rawValueArr`. The rest of the algorithm
	  // then would lay `234` on top of the available placeholder positions in the mask.
	  for (var _i = rawValueLength - 1; _i >= 0; _i--) {
	    var char = rawValueArr[_i].char;


	    if (char !== placeholderChar) {
	      var shouldOffset = _i >= indexOfFirstChange && previousConformedValueLength === maskLength;

	      if (char === placeholder[shouldOffset ? _i - editDistance : _i]) {
	        rawValueArr.splice(_i, 1);
	      }
	    }
	  }

	  // This is the variable that we will be filling with characters as we figure them out
	  // in the algorithm below
	  var conformedValue = emptyString;
	  var someCharsRejected = false;

	  // Ok, so first we loop through the placeholder looking for placeholder characters to fill up.
	  placeholderLoop: for (var _i2 = 0; _i2 < placeholderLength; _i2++) {
	    var charInPlaceholder = placeholder[_i2];

	    // We see one. Let's find out what we can put in it.
	    if (charInPlaceholder === placeholderChar) {
	      // But before that, do we actually have any user characters that need a place?
	      if (rawValueArr.length > 0) {
	        // We will keep chipping away at user input until either we run out of characters
	        // or we find at least one character that we can map.
	        while (rawValueArr.length > 0) {
	          // Let's retrieve the first user character in the queue of characters we have left
	          var _rawValueArr$shift = rawValueArr.shift(),
	              rawValueChar = _rawValueArr$shift.char,
	              isNew = _rawValueArr$shift.isNew;

	          // If the character we got from the user input is a placeholder character (which happens
	          // regularly because user input could be something like (540) 90_-____, which includes
	          // a bunch of `_` which are placeholder characters) and we are not in *no guide* mode,
	          // then we map this placeholder character to the current spot in the placeholder


	          if (rawValueChar === placeholderChar && suppressGuide !== true) {
	            conformedValue += placeholderChar;

	            // And we go to find the next placeholder character that needs filling
	            continue placeholderLoop;

	            // Else if, the character we got from the user input is not a placeholder, let's see
	            // if the current position in the mask can accept it.
	          } else if (mask[_i2].test(rawValueChar)) {
	            // we map the character differently based on whether we are keeping character positions or not.
	            // If any of the conditions below are met, we simply map the raw value character to the
	            // placeholder position.
	            if (keepCharPositions !== true || isNew === false || previousConformedValue === emptyString || guide === false || !isAddition) {
	              conformedValue += rawValueChar;
	            } else {
	              // We enter this block of code if we are trying to keep character positions and none of the conditions
	              // above is met. In this case, we need to see if there's an available spot for the raw value character
	              // to be mapped to. If we couldn't find a spot, we will discard the character.
	              //
	              // For example, for mask `1111`, previous conformed value `_2__`, raw value `942_2__`. We can map the
	              // `9`, to the first available placeholder position, but then, there are no more spots available for the
	              // `4` and `2`. So, we discard them and end up with a conformed value of `92__`.
	              var rawValueArrLength = rawValueArr.length;
	              var indexOfNextAvailablePlaceholderChar = null;

	              // Let's loop through the remaining raw value characters. We are looking for either a suitable spot, ie,
	              // a placeholder character or a non-suitable spot, ie, a non-placeholder character that is not new.
	              // If we see a suitable spot first, we store its position and exit the loop. If we see a non-suitable
	              // spot first, we exit the loop and our `indexOfNextAvailablePlaceholderChar` will stay as `null`.
	              for (var _i3 = 0; _i3 < rawValueArrLength; _i3++) {
	                var charData = rawValueArr[_i3];

	                if (charData.char !== placeholderChar && charData.isNew === false) {
	                  break;
	                }

	                if (charData.char === placeholderChar) {
	                  indexOfNextAvailablePlaceholderChar = _i3;
	                  break;
	                }
	              }

	              // If `indexOfNextAvailablePlaceholderChar` is not `null`, that means the character is not blocked.
	              // We can map it. And to keep the character positions, we remove the placeholder character
	              // from the remaining characters
	              if (indexOfNextAvailablePlaceholderChar !== null) {
	                conformedValue += rawValueChar;
	                rawValueArr.splice(indexOfNextAvailablePlaceholderChar, 1);

	                // If `indexOfNextAvailablePlaceholderChar` is `null`, that means the character is blocked. We have to
	                // discard it.
	              } else {
	                _i2--;
	              }
	            }

	            // Since we've mapped this placeholder position. We move on to the next one.
	            continue placeholderLoop;
	          } else {
	            someCharsRejected = true;
	          }
	        }
	      }

	      // We reach this point when we've mapped all the user input characters to placeholder
	      // positions in the mask. In *guide* mode, we append the left over characters in the
	      // placeholder to the `conformedString`, but in *no guide* mode, we don't wanna do that.
	      //
	      // That is, for mask `(111)` and user input `2`, we want to return `(2`, not `(2__)`.
	      if (suppressGuide === false) {
	        conformedValue += placeholder.substr(_i2, placeholderLength);
	      }

	      // And we break
	      break;

	      // Else, the charInPlaceholder is not a placeholderChar. That is, we cannot fill it
	      // with user input. So we just map it to the final output
	    } else {
	      conformedValue += charInPlaceholder;
	    }
	  }

	  // The following logic is needed to deal with the case of deletion in *no guide* mode.
	  //
	  // Consider the silly mask `(111) /// 1`. What if user tries to delete the last placeholder
	  // position? Something like `(589) /// `. We want to conform that to `(589`. Not `(589) /// `.
	  // That's why the logic below finds the last filled placeholder character, and removes everything
	  // from that point on.
	  if (suppressGuide && isAddition === false) {
	    var indexOfLastFilledPlaceholderChar = null;

	    // Find the last filled placeholder position and substring from there
	    for (var _i4 = 0; _i4 < conformedValue.length; _i4++) {
	      if (placeholder[_i4] === placeholderChar) {
	        indexOfLastFilledPlaceholderChar = _i4;
	      }
	    }

	    if (indexOfLastFilledPlaceholderChar !== null) {
	      // We substring from the beginning until the position after the last filled placeholder char.
	      conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
	    } else {
	      // If we couldn't find `indexOfLastFilledPlaceholderChar` that means the user deleted
	      // the first character in the mask. So we return an empty string.
	      conformedValue = emptyString;
	    }
	  }

	  return { conformedValue: conformedValue, meta: { someCharsRejected: someCharsRejected } };
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertMaskToPlaceholder = convertMaskToPlaceholder;
	exports.isString = isString;
	exports.isNumber = isNumber;
	exports.processCaretTraps = processCaretTraps;

	var _constants = __webpack_require__(1);

	var emptyArray = [];

	function convertMaskToPlaceholder() {
	  var mask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyArray;
	  var placeholderChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.placeholderChar;

	  if (mask.indexOf(placeholderChar) !== -1) {
	    throw new Error('Placeholder character must not be used as part of the mask. Please specify a character ' + 'that is not present in your mask as your placeholder character.\n\n' + ('The placeholder character that was received is: ' + JSON.stringify(placeholderChar) + '\n\n') + ('The mask that was received is: ' + JSON.stringify(mask)));
	  }

	  return mask.map(function (char) {
	    return char instanceof RegExp ? placeholderChar : char;
	  }).join('');
	}

	function isString(value) {
	  return typeof value === 'string' || value instanceof String;
	}

	function isNumber(value) {
	  return typeof value === 'number' && value.length === undefined && !isNaN(value);
	}

	var strCaretTrap = '[]';
	function processCaretTraps(mask) {
	  var indexes = [];

	  var indexOfCaretTrap = void 0;
	  while (indexOfCaretTrap = mask.indexOf(strCaretTrap), indexOfCaretTrap !== -1) {
	    // eslint-disable-line
	    indexes.push(indexOfCaretTrap);

	    mask.splice(indexOfCaretTrap, 1);
	  }

	  return { maskWithoutCaretTraps: mask, indexes: indexes };
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = adjustCaretPosition;
	var defaultArray = [];
	var emptyString = '';

	function adjustCaretPosition(_ref) {
	  var _ref$previousConforme = _ref.previousConformedValue,
	      previousConformedValue = _ref$previousConforme === undefined ? emptyString : _ref$previousConforme,
	      _ref$previousPlacehol = _ref.previousPlaceholder,
	      previousPlaceholder = _ref$previousPlacehol === undefined ? emptyString : _ref$previousPlacehol,
	      _ref$currentCaretPosi = _ref.currentCaretPosition,
	      currentCaretPosition = _ref$currentCaretPosi === undefined ? 0 : _ref$currentCaretPosi,
	      conformedValue = _ref.conformedValue,
	      rawValue = _ref.rawValue,
	      placeholderChar = _ref.placeholderChar,
	      placeholder = _ref.placeholder,
	      _ref$indexesOfPipedCh = _ref.indexesOfPipedChars,
	      indexesOfPipedChars = _ref$indexesOfPipedCh === undefined ? defaultArray : _ref$indexesOfPipedCh,
	      _ref$caretTrapIndexes = _ref.caretTrapIndexes,
	      caretTrapIndexes = _ref$caretTrapIndexes === undefined ? defaultArray : _ref$caretTrapIndexes;

	  if (currentCaretPosition === 0) {
	    return 0;
	  }

	  // Store lengths for faster performance?
	  var rawValueLength = rawValue.length;
	  var previousConformedValueLength = previousConformedValue.length;
	  var placeholderLength = placeholder.length;
	  var conformedValueLength = conformedValue.length;

	  // This tells us how long the edit is. If user modified input from `(2__)` to `(243__)`,
	  // we know the user in this instance pasted two characters
	  var editLength = rawValueLength - previousConformedValueLength;

	  // If the edit length is positive, that means the user is adding characters, not deleting.
	  var isAddition = editLength > 0;

	  // This is the first raw value the user entered that needs to be conformed to mask
	  var isFirstRawValue = previousConformedValueLength === 0;

	  // A partial multi-character edit happens when the user makes a partial selection in their
	  // input and edits that selection. That is going from `(123) 432-4348` to `() 432-4348` by
	  // selecting the first 3 digits and pressing backspace.
	  //
	  // Such cases can also happen when the user presses the backspace while holding down the ALT
	  // key.
	  var isPartialMultiCharEdit = editLength > 1 && !isAddition && !isFirstRawValue;

	  // This algorithm doesn't support all cases of multi-character edits, so we just return
	  // the current caret position.
	  //
	  // This works fine for most cases.
	  if (isPartialMultiCharEdit) {
	    return currentCaretPosition;
	  }

	  // For a mask like (111), if the `previousConformedValue` is (1__) and user attempts to enter
	  // `f` so the `rawValue` becomes (1f__), the new `conformedValue` would be (1__), which is the
	  // same as the original `previousConformedValue`. We handle this case differently for caret
	  // positioning.
	  var possiblyHasRejectedChar = isAddition && (previousConformedValue === conformedValue || conformedValue === placeholder);

	  var startingSearchIndex = 0;
	  var trackRightCharacter = void 0;
	  var targetChar = void 0;

	  if (possiblyHasRejectedChar) {
	    startingSearchIndex = currentCaretPosition - editLength;
	  } else {
	    // At this point in the algorithm, we want to know where the caret is right before the raw input
	    // has been conformed, and then see if we can find that same spot in the conformed input.
	    //
	    // We do that by seeing what character lies immediately before the caret, and then look for that
	    // same character in the conformed input and place the caret there.

	    // First, we need to normalize the inputs so that letter capitalization between raw input and
	    // conformed input wouldn't matter.
	    var normalizedConformedValue = conformedValue.toLowerCase();
	    var normalizedRawValue = rawValue.toLowerCase();

	    // Then we take all characters that come before where the caret currently is.
	    var leftHalfChars = normalizedRawValue.substr(0, currentCaretPosition).split(emptyString);

	    // Now we find all the characters in the left half that exist in the conformed input
	    // This step ensures that we don't look for a character that was filtered out or rejected by `conformToMask`.
	    var intersection = leftHalfChars.filter(function (char) {
	      return normalizedConformedValue.indexOf(char) !== -1;
	    });

	    // The last character in the intersection is the character we want to look for in the conformed
	    // value and the one we want to adjust the caret close to
	    targetChar = intersection[intersection.length - 1];

	    // Calculate the number of mask characters in the previous placeholder
	    // from the start of the string up to the place where the caret is
	    var previousLeftMaskChars = previousPlaceholder.substr(0, intersection.length).split(emptyString).filter(function (char) {
	      return char !== placeholderChar;
	    }).length;

	    // Calculate the number of mask characters in the current placeholder
	    // from the start of the string up to the place where the caret is
	    var leftMaskChars = placeholder.substr(0, intersection.length).split(emptyString).filter(function (char) {
	      return char !== placeholderChar;
	    }).length;

	    // Has the number of mask characters up to the caret changed?
	    var masklengthChanged = leftMaskChars !== previousLeftMaskChars;

	    // Detect if `targetChar` is a mask character and has moved to the left
	    var targetIsMaskMovingLeft = previousPlaceholder[intersection.length - 1] !== undefined && placeholder[intersection.length - 2] !== undefined && previousPlaceholder[intersection.length - 1] !== placeholderChar && previousPlaceholder[intersection.length - 1] !== placeholder[intersection.length - 1] && previousPlaceholder[intersection.length - 1] === placeholder[intersection.length - 2];

	    // If deleting and the `targetChar` `is a mask character and `masklengthChanged` is true
	    // or the mask is moving to the left, we can't use the selected `targetChar` any longer
	    // if we are not at the end of the string.
	    // In this case, change tracking strategy and track the character to the right of the caret.
	    if (!isAddition && (masklengthChanged || targetIsMaskMovingLeft) && previousLeftMaskChars > 0 && placeholder.indexOf(targetChar) > -1 && rawValue[currentCaretPosition] !== undefined) {
	      trackRightCharacter = true;
	      targetChar = rawValue[currentCaretPosition];
	    }

	    // It is possible that `targetChar` will appear multiple times in the conformed value.
	    // We need to know not to select a character that looks like our target character from the placeholder or
	    // the piped characters, so we inspect the piped characters and the placeholder to see if they contain
	    // characters that match our target character.

	    // If the `conformedValue` got piped, we need to know which characters were piped in so that when we look for
	    // our `targetChar`, we don't select a piped char by mistake
	    var pipedChars = indexesOfPipedChars.map(function (index) {
	      return normalizedConformedValue[index];
	    });

	    // We need to know how many times the `targetChar` occurs in the piped characters.
	    var countTargetCharInPipedChars = pipedChars.filter(function (char) {
	      return char === targetChar;
	    }).length;

	    // We need to know how many times it occurs in the intersection
	    var countTargetCharInIntersection = intersection.filter(function (char) {
	      return char === targetChar;
	    }).length;

	    // We need to know if the placeholder contains characters that look like
	    // our `targetChar`, so we don't select one of those by mistake.
	    var countTargetCharInPlaceholder = placeholder.substr(0, placeholder.indexOf(placeholderChar)).split(emptyString).filter(function (char, index) {
	      return (
	        // Check if `char` is the same as our `targetChar`, so we account for it
	        char === targetChar &&

	        // but also make sure that both the `rawValue` and placeholder don't have the same character at the same
	        // index because if they are equal, that means we are already counting those characters in
	        // `countTargetCharInIntersection`
	        rawValue[index] !== char
	      );
	    }).length;

	    // The number of times we need to see occurrences of the `targetChar` before we know it is the one we're looking
	    // for is:
	    var requiredNumberOfMatches = countTargetCharInPlaceholder + countTargetCharInIntersection + countTargetCharInPipedChars + (
	    // The character to the right of the caret isn't included in `intersection`
	    // so add one if we are tracking the character to the right
	    trackRightCharacter ? 1 : 0);

	    // Now we start looking for the location of the `targetChar`.
	    // We keep looping forward and store the index in every iteration. Once we have encountered
	    // enough occurrences of the target character, we break out of the loop
	    // If are searching for the second `1` in `1214`, `startingSearchIndex` will point at `4`.
	    var numberOfEncounteredMatches = 0;
	    for (var i = 0; i < conformedValueLength; i++) {
	      var conformedValueChar = normalizedConformedValue[i];

	      startingSearchIndex = i + 1;

	      if (conformedValueChar === targetChar) {
	        numberOfEncounteredMatches++;
	      }

	      if (numberOfEncounteredMatches >= requiredNumberOfMatches) {
	        break;
	      }
	    }
	  }

	  // At this point, if we simply return `startingSearchIndex` as the adjusted caret position,
	  // most cases would be handled. However, we want to fast forward or rewind the caret to the
	  // closest placeholder character if it happens to be in a non-editable spot. That's what the next
	  // logic is for.

	  // In case of addition, we fast forward.
	  if (isAddition) {
	    // We want to remember the last placeholder character encountered so that if the mask
	    // contains more characters after the last placeholder character, we don't forward the caret
	    // that far to the right. Instead, we stop it at the last encountered placeholder character.
	    var lastPlaceholderChar = startingSearchIndex;

	    for (var _i = startingSearchIndex; _i <= placeholderLength; _i++) {
	      if (placeholder[_i] === placeholderChar) {
	        lastPlaceholderChar = _i;
	      }

	      if (
	      // If we're adding, we can position the caret at the next placeholder character.
	      placeholder[_i] === placeholderChar ||

	      // If a caret trap was set by a mask function, we need to stop at the trap.
	      caretTrapIndexes.indexOf(_i) !== -1 ||

	      // This is the end of the placeholder. We cannot move any further. Let's put the caret there.
	      _i === placeholderLength) {
	        return lastPlaceholderChar;
	      }
	    }
	  } else {
	    // In case of deletion, we rewind.
	    if (trackRightCharacter) {
	      // Searching for the character that was to the right of the caret
	      // We start at `startingSearchIndex` - 1 because it includes one character extra to the right
	      for (var _i2 = startingSearchIndex - 1; _i2 >= 0; _i2--) {
	        // If tracking the character to the right of the cursor, we move to the left until
	        // we found the character and then place the caret right before it

	        if (
	        // `targetChar` should be in `conformedValue`, since it was in `rawValue`, just
	        // to the right of the caret
	        conformedValue[_i2] === targetChar ||

	        // If a caret trap was set by a mask function, we need to stop at the trap.
	        caretTrapIndexes.indexOf(_i2) !== -1 ||

	        // This is the beginning of the placeholder. We cannot move any further.
	        // Let's put the caret there.
	        _i2 === 0) {
	          return _i2;
	        }
	      }
	    } else {
	      // Searching for the first placeholder or caret trap to the left

	      for (var _i3 = startingSearchIndex; _i3 >= 0; _i3--) {
	        // If we're deleting, we stop the caret right before the placeholder character.
	        // For example, for mask `(111) 11`, current conformed input `(456) 86`. If user
	        // modifies input to `(456 86`. That is, they deleted the `)`, we place the caret
	        // right after the first `6`

	        if (
	        // If we're deleting, we can position the caret right before the placeholder character
	        placeholder[_i3 - 1] === placeholderChar ||

	        // If a caret trap was set by a mask function, we need to stop at the trap.
	        caretTrapIndexes.indexOf(_i3) !== -1 ||

	        // This is the beginning of the placeholder. We cannot move any further.
	        // Let's put the caret there.
	        _i3 === 0) {
	          return _i3;
	        }
	      }
	    }
	  }
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = createTextMaskInputElement;

	var _adjustCaretPosition = __webpack_require__(4);

	var _adjustCaretPosition2 = _interopRequireDefault(_adjustCaretPosition);

	var _conformToMask2 = __webpack_require__(2);

	var _conformToMask3 = _interopRequireDefault(_conformToMask2);

	var _utilities = __webpack_require__(3);

	var _constants = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var strFunction = 'function';
	var emptyString = '';
	var strNone = 'none';
	var strObject = 'object';
	var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
	var defer = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : setTimeout;

	function createTextMaskInputElement(config) {
	  // Anything that we will need to keep between `update` calls, we will store in this `state` object.
	  var state = { previousConformedValue: undefined, previousPlaceholder: undefined };

	  return {
	    state: state,

	    // `update` is called by framework components whenever they want to update the `value` of the input element.
	    // The caller can send a `rawValue` to be conformed and set on the input element. However, the default use-case
	    // is for this to be read from the `inputElement` directly.
	    update: function update(rawValue) {
	      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config,
	          inputElement = _ref.inputElement,
	          providedMask = _ref.mask,
	          guide = _ref.guide,
	          pipe = _ref.pipe,
	          _ref$placeholderChar = _ref.placeholderChar,
	          placeholderChar = _ref$placeholderChar === undefined ? _constants.placeholderChar : _ref$placeholderChar,
	          _ref$keepCharPosition = _ref.keepCharPositions,
	          keepCharPositions = _ref$keepCharPosition === undefined ? false : _ref$keepCharPosition,
	          _ref$showMask = _ref.showMask,
	          showMask = _ref$showMask === undefined ? false : _ref$showMask;

	      // if `rawValue` is `undefined`, read from the `inputElement`
	      if (typeof rawValue === 'undefined') {
	        rawValue = inputElement.value;
	      }

	      // If `rawValue` equals `state.previousConformedValue`, we don't need to change anything. So, we return.
	      // This check is here to handle controlled framework components that repeat the `update` call on every render.
	      if (rawValue === state.previousConformedValue) {
	        return;
	      }

	      // Text Mask accepts masks that are a combination of a `mask` and a `pipe` that work together. If such a `mask` is
	      // passed, we destructure it below, so the rest of the code can work normally as if a separate `mask` and a `pipe`
	      // were passed.
	      if ((typeof providedMask === 'undefined' ? 'undefined' : _typeof(providedMask)) === strObject && providedMask.pipe !== undefined && providedMask.mask !== undefined) {
	        pipe = providedMask.pipe;
	        providedMask = providedMask.mask;
	      }

	      // The `placeholder` is an essential piece of how Text Mask works. For a mask like `(111)`, the placeholder would
	      // be `(___)` if the `placeholderChar` is set to `_`.
	      var placeholder = void 0;

	      // We don't know what the mask would be yet. If it is an array, we take it as is, but if it's a function, we will
	      // have to call that function to get the mask array.
	      var mask = void 0;

	      // If the provided mask is an array, we can call `convertMaskToPlaceholder` here once and we'll always have the
	      // correct `placeholder`.
	      if (providedMask instanceof Array) {
	        placeholder = (0, _utilities.convertMaskToPlaceholder)(providedMask, placeholderChar);
	      }

	      // In framework components that support reactivity, it's possible to turn off masking by passing
	      // `false` for `mask` after initialization. See https://github.com/text-mask/text-mask/pull/359
	      if (providedMask === false) {
	        return;
	      }

	      // We check the provided `rawValue` before moving further.
	      // If it's something we can't work with `getSafeRawValue` will throw.
	      var safeRawValue = getSafeRawValue(rawValue);

	      // `selectionStart` indicates to us where the caret position is after the user has typed into the input
	      var currentCaretPosition = inputElement.selectionStart;

	      // We need to know what the `previousConformedValue` and `previousPlaceholder` is from the previous `update` call

	      var previousConformedValue = state.previousConformedValue,
	          previousPlaceholder = state.previousPlaceholder;


	      var caretTrapIndexes = void 0;

	      // If the `providedMask` is a function. We need to call it at every `update` to get the `mask` array.
	      // Then we also need to get the `placeholder`
	      if ((typeof providedMask === 'undefined' ? 'undefined' : _typeof(providedMask)) === strFunction) {
	        mask = providedMask(safeRawValue, { currentCaretPosition: currentCaretPosition, previousConformedValue: previousConformedValue, placeholderChar: placeholderChar });

	        // disable masking if `mask` is `false`
	        if (mask === false) {
	          return;
	        }

	        // mask functions can setup caret traps to have some control over how the caret moves. We need to process
	        // the mask for any caret traps. `processCaretTraps` will remove the caret traps from the mask and return
	        // the indexes of the caret traps.

	        var _processCaretTraps = (0, _utilities.processCaretTraps)(mask),
	            maskWithoutCaretTraps = _processCaretTraps.maskWithoutCaretTraps,
	            indexes = _processCaretTraps.indexes;

	        mask = maskWithoutCaretTraps; // The processed mask is what we're interested in
	        caretTrapIndexes = indexes; // And we need to store these indexes because they're needed by `adjustCaretPosition`

	        placeholder = (0, _utilities.convertMaskToPlaceholder)(mask, placeholderChar);

	        // If the `providedMask` is not a function, we just use it as-is.
	      } else {
	        mask = providedMask;
	      }

	      // The following object will be passed to `conformToMask` to determine how the `rawValue` will be conformed
	      var conformToMaskConfig = {
	        previousConformedValue: previousConformedValue,
	        guide: guide,
	        placeholderChar: placeholderChar,
	        pipe: pipe,
	        placeholder: placeholder,
	        currentCaretPosition: currentCaretPosition,
	        keepCharPositions: keepCharPositions

	        // `conformToMask` returns `conformedValue` as part of an object for future API flexibility
	      };
	      var _conformToMask = (0, _conformToMask3.default)(safeRawValue, mask, conformToMaskConfig),
	          conformedValue = _conformToMask.conformedValue;

	      // The following few lines are to support the `pipe` feature.


	      var piped = (typeof pipe === 'undefined' ? 'undefined' : _typeof(pipe)) === strFunction;

	      var pipeResults = {};

	      // If `pipe` is a function, we call it.
	      if (piped) {
	        // `pipe` receives the `conformedValue` and the configurations with which `conformToMask` was called.
	        pipeResults = pipe(conformedValue, _extends({ rawValue: safeRawValue }, conformToMaskConfig));

	        // `pipeResults` should be an object. But as a convenience, we allow the pipe author to just return `false` to
	        // indicate rejection. Or return just a string when there are no piped characters.
	        // If the `pipe` returns `false` or a string, the block below turns it into an object that the rest
	        // of the code can work with.
	        if (pipeResults === false) {
	          // If the `pipe` rejects `conformedValue`, we use the `previousConformedValue`, and set `rejected` to `true`.
	          pipeResults = { value: previousConformedValue, rejected: true };
	        } else if ((0, _utilities.isString)(pipeResults)) {
	          pipeResults = { value: pipeResults };
	        }
	      }

	      // Before we proceed, we need to know which conformed value to use, the one returned by the pipe or the one
	      // returned by `conformToMask`.
	      var finalConformedValue = piped ? pipeResults.value : conformedValue;

	      // After determining the conformed value, we will need to know where to set
	      // the caret position. `adjustCaretPosition` will tell us.
	      var adjustedCaretPosition = (0, _adjustCaretPosition2.default)({
	        previousConformedValue: previousConformedValue,
	        previousPlaceholder: previousPlaceholder,
	        conformedValue: finalConformedValue,
	        placeholder: placeholder,
	        rawValue: safeRawValue,
	        currentCaretPosition: currentCaretPosition,
	        placeholderChar: placeholderChar,
	        indexesOfPipedChars: pipeResults.indexesOfPipedChars,
	        caretTrapIndexes: caretTrapIndexes
	      });

	      // Text Mask sets the input value to an empty string when the condition below is set. It provides a better UX.
	      var inputValueShouldBeEmpty = finalConformedValue === placeholder && adjustedCaretPosition === 0;
	      var emptyValue = showMask ? placeholder : emptyString;
	      var inputElementValue = inputValueShouldBeEmpty ? emptyValue : finalConformedValue;

	      state.previousConformedValue = inputElementValue; // store value for access for next time
	      state.previousPlaceholder = placeholder;

	      // In some cases, this `update` method will be repeatedly called with a raw value that has already been conformed
	      // and set to `inputElement.value`. The below check guards against needlessly readjusting the input state.
	      // See https://github.com/text-mask/text-mask/issues/231
	      if (inputElement.value === inputElementValue) {
	        return;
	      }

	      inputElement.value = inputElementValue; // set the input value
	      safeSetSelection(inputElement, adjustedCaretPosition); // adjust caret position
	    }
	  };
	}

	function safeSetSelection(element, selectionPosition) {
	  if (document.activeElement === element) {
	    if (isAndroid) {
	      defer(function () {
	        return element.setSelectionRange(selectionPosition, selectionPosition, strNone);
	      }, 0);
	    } else {
	      element.setSelectionRange(selectionPosition, selectionPosition, strNone);
	    }
	  }
	}

	function getSafeRawValue(inputValue) {
	  if ((0, _utilities.isString)(inputValue)) {
	    return inputValue;
	  } else if ((0, _utilities.isNumber)(inputValue)) {
	    return String(inputValue);
	  } else if (inputValue === undefined || inputValue === null) {
	    return emptyString;
	  } else {
	    throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value " + ('received was:\n\n ' + JSON.stringify(inputValue)));
	  }
	}

/***/ })
/******/ ])
});
;