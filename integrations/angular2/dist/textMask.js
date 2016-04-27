(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular2/core"));
	else if(typeof define === 'function' && define.amd)
		define(["angular2/core"], factory);
	else if(typeof exports === 'object')
		exports["textMask"] = factory(require("angular2/core"));
	else
		root["textMask"] = factory(root["angular2/core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
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
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var index_1 = __webpack_require__(1);
	var core_1 = __webpack_require__(7);
	var MaskedInput = (function () {
	    function MaskedInput(el) {
	        this.previousValue = '';
	        this.conformToMaskResults = { output: '' };
	        this.currentCaretPosition = null;
	        this.textMaskConfig = { mask: '' };
	        this.inputElement = el.nativeElement;
	    }
	    MaskedInput.prototype.ngOnInit = function () {
	        this.onChange();
	    };
	    MaskedInput.prototype.ngOnChanges = function () {
	        this.onChange();
	    };
	    MaskedInput.prototype.onChange = function (updatedValue) {
	        if (updatedValue === void 0) { updatedValue = ''; }
	        this.previousValue = (this.conformToMaskResults.output ||
	            this.previousValue ||
	            this.inputElement.value);
	        this.conformToMaskResults = index_1.conformToMask(updatedValue, this.textMaskConfig.mask);
	        this.currentCaretPosition = this.inputElement.selectionStart;
	        this.inputElement.placeholder = this.inputElement.placeholder ||
	            index_1.convertMaskToPlaceholder(this.textMaskConfig.mask);
	        this.inputElement.value = (this.conformToMaskResults.output !== this.inputElement.placeholder) ?
	            this.conformToMaskResults.output :
	            '';
	        var caretPosition = index_1.adjustCaretPosition({
	            previousInput: this.previousValue,
	            conformToMaskResults: this.conformToMaskResults,
	            currentCaretPosition: this.currentCaretPosition
	        });
	        this.inputElement.setSelectionRange(caretPosition, caretPosition);
	    };
	    __decorate([
	        core_1.Input('text-mask'), 
	        __metadata('design:type', Object)
	    ], MaskedInput.prototype, "textMaskConfig", void 0);
	    __decorate([
	        core_1.HostListener('input', ['$event.target.value']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], MaskedInput.prototype, "onChange", null);
	    MaskedInput = __decorate([
	        core_1.Directive({
	            selector: 'input[text-mask]'
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], MaskedInput);
	    return MaskedInput;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MaskedInput;
	var index_2 = __webpack_require__(1);
	exports.conformToMask = index_2.conformToMask;
	exports.convertMaskToPlaceholder = index_2.convertMaskToPlaceholder;
	exports.adjustCaretPosition = index_2.adjustCaretPosition;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _conformToMask = __webpack_require__(2);

	Object.defineProperty(exports, 'conformToMask', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_conformToMask).default;
	  }
	});

	var _adjustCaretPosition = __webpack_require__(5);

	Object.defineProperty(exports, 'adjustCaretPosition', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_adjustCaretPosition).default;
	  }
	});

	var _utilities = __webpack_require__(3);

	Object.defineProperty(exports, 'convertMaskToPlaceholder', {
	  enumerable: true,
	  get: function get() {
	    return _utilities.convertMaskToPlaceholder;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = conformToMask;

	var _utilities = __webpack_require__(3);

	var _constants = __webpack_require__(4);

	function conformToMask() {
	  var userInput = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var mask = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  var placeholder = (0, _utilities.convertMaskToPlaceholder)(mask);
	  var maskDelimiters = (0, _utilities.getDelimiters)(mask);

	  var numberOfPendingUserInputCharacters = userInput.length;

	  return {
	    input: userInput,
	    mask: mask,

	    // Go through the placeholder to determine what to place in it
	    output: (0, _utilities.tokenize)(placeholder).map(function (characterInPlaceholder, index) {
	      // if current character is a placeholder character, that means we could potentially
	      // place user input in it. So, if we still have pending user tokens, let's do it!
	      if (characterInPlaceholder === _constants.placeholderCharacter && numberOfPendingUserInputCharacters > 0) {
	        // Let's loop through the remaining user input characters to find out what
	        // should go in the current placeholder position
	        for (var i = userInput.length - numberOfPendingUserInputCharacters; i < userInput.length; i++) {
	          // Pull user character to potentially map it to the current
	          // placeholder position.
	          var userInputCharacter = userInput[i];

	          numberOfPendingUserInputCharacters--;

	          if (
	          // is the character in the user input a placeholder character?
	          userInputCharacter === _constants.placeholderCharacter ||

	          // or, are we sure the character is not part of the mask
	          // delimiters and that it is an acceptable character?
	          maskDelimiters.indexOf(userInputCharacter) === -1 && (0, _utilities.isAcceptableCharacter)(userInputCharacter, mask[index]) === true) {
	            // if so, map it to a potentially transformed character!
	            return (0, _utilities.potentiallyTransformCharacter)(userInputCharacter, mask[index]);
	          }
	        }
	      }

	      // if the current character is not placeholder or we don't have any more user input
	      // characters to assign, then just return the same current character
	      return characterInPlaceholder;
	    }).join('')
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertMaskToPlaceholder = convertMaskToPlaceholder;
	exports.getDelimiters = getDelimiters;
	exports.tokenize = tokenize;
	exports.isAcceptableCharacter = isAcceptableCharacter;
	exports.potentiallyTransformCharacter = potentiallyTransformCharacter;

	var _constants = __webpack_require__(4);

	function convertMaskToPlaceholder() {
	  var mask = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  return tokenize(mask).map(function (character) {
	    return _constants.maskingCharacters.indexOf(character) !== -1 ? _constants.placeholderCharacter : character;
	  }).join('');
	}

	function getDelimiters() {
	  var mask = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  return tokenize(mask).reduce(function (accumulator, character) {
	    if (_constants.maskingCharacters.indexOf(character) === -1 && accumulator.indexOf(character) === -1) {
	      accumulator.push(character);
	    }

	    return accumulator;
	  }, []);
	}

	function tokenize() {
	  var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  return string.split('');
	}

	function isAcceptableCharacter() {
	  var character = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var maskingCharacter = arguments[1];

	  switch (maskingCharacter) {
	    case _constants.maskingCharactersEnums.numeric:
	      return isNumeric(character);

	    case _constants.maskingCharactersEnums.uppercase:
	    case _constants.maskingCharactersEnums.lowercase:
	    case _constants.maskingCharactersEnums.alphabetic:
	      return isAlphabetic(character);

	    case _constants.maskingCharactersEnums.alphanumeric:
	      return isNumeric(character) || isAlphabetic(character);

	    default:
	      return true;
	  }
	}

	function potentiallyTransformCharacter() {
	  var character = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var maskingCharacter = arguments[1];

	  switch (maskingCharacter) {
	    case _constants.maskingCharactersEnums.uppercase:
	      return character.toUpperCase();

	    case _constants.maskingCharactersEnums.lowercase:
	      return character.toLowerCase();

	    default:
	      return character;
	  }
	}

	function isNumeric(character) {
	  return !isNaN(character);
	}

	function isAlphabetic(character) {
	  return (/^[a-zA-Z]+$/.test(character)
	  );
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var maskingCharactersEnums = exports.maskingCharactersEnums = {
	  numeric: '1',
	  alphabetic: 'A',
	  alphanumeric: '?',
	  uppercase: 'U',
	  lowercase: 'L',
	  any: '*'
	};

	var maskingCharactersWithDescription = exports.maskingCharactersWithDescription = {
	  '1': 'Any number',
	  'A': 'Any letter',
	  '?': 'Any number or letter',
	  'U': 'Any letter (will be transformed to uppercase)',
	  'L': 'Any letter (will be transformed to lowercase)',
	  '*': 'Any character'
	};

	var maskingCharacters = exports.maskingCharacters = ['1', 'A', '?', 'U', 'L', '*'];

	var placeholderCharacter = exports.placeholderCharacter = '_';

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = adjustCaretPosition;

	var _utilities = __webpack_require__(3);

	var _constants = __webpack_require__(4);

	var _getChangeDetails = __webpack_require__(6);

	var _getChangeDetails2 = _interopRequireDefault(_getChangeDetails);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function adjustCaretPosition(_ref) {
	  var _ref$previousInput = _ref.previousInput;
	  var previousInput = _ref$previousInput === undefined ? '' : _ref$previousInput;
	  var _ref$conformToMaskRes = _ref.conformToMaskResults;
	  var conformToMaskResults = _ref$conformToMaskRes === undefined ? {} : _ref$conformToMaskRes;
	  var _ref$currentCaretPosi = _ref.currentCaretPosition;
	  var currentCaretPosition = _ref$currentCaretPosi === undefined ? 0 : _ref$currentCaretPosi;

	  // ensure sane argument values
	  conformToMaskResults.input = conformToMaskResults.input || '';
	  conformToMaskResults.output = conformToMaskResults.output || '';
	  conformToMaskResults.mask = conformToMaskResults.mask || '';

	  var placeholder = (0, _utilities.convertMaskToPlaceholder)(conformToMaskResults.mask);

	  // First determine if the operation is deletion or addition to know whether we will be
	  // seeking to move the caret forward or back.
	  var isDeletion =
	  // If previous input is the placeholder, then any change to it is addition.
	  previousInput !== placeholder && (
	  // if the conformed string or the input to be conformed is smaller than
	  // previous input, then the operation is deletion.
	  conformToMaskResults.output.length < previousInput.length || conformToMaskResults.input.length < previousInput.length);

	  // is addition...
	  if (isDeletion === false) {
	    // if previous input and conformToMaskResults.output are exactly the same, it means
	    // adjustCaretPosition was called after conformToMask rejected a character
	    if (previousInput === conformToMaskResults.output) {
	      // in that case, revert movement of the caret
	      return currentCaretPosition - 1;

	      // previous input is different from conformToMaskResults.output, so we need to do some work
	    } else {
	        var changeDetails = (0, _getChangeDetails2.default)(previousInput || placeholder, conformToMaskResults.output);

	        // if the index of the last changed character is ahead of current caret position by more
	        // than one, then an ambiguous change happened.
	        // I.e. (333) ___-____ => (333) 3__-____, so we don't know which character was last added.
	        // In that case, just return the current caret position unmodified.
	        if (changeDetails.indexOfLastChange - currentCaretPosition > 1) {
	          return currentCaretPosition;
	        }

	        // otherwise, starting at the position right after the last added character, seek the next
	        // placeholder where we can position the caret
	        for (var i = changeDetails.indexOfLastChange + 1; i < placeholder.length; i++) {
	          if (placeholder[i] === _constants.placeholderCharacter) {
	            return i;
	          }
	        }
	      }

	    // If the previous for-loop couldn't find a placeholder in which to position the caret, that
	    // means there isn't a placeholder after the index of the last character, so just position
	    // the caret at the end of the conformed string
	    return conformToMaskResults.output.length;

	    // is deletion...
	  } else if (isDeletion === true) {
	      // if previous input and conformed string are the same, it means adjustCaretPosition is called
	      // because the user is pressing the backspace to move the caret back
	      if (previousInput === conformToMaskResults.output) {
	        // if the caret is at a placeholder character position, it's okay to keep it where it is
	        if (placeholder[currentCaretPosition] === _constants.placeholderCharacter) {
	          return currentCaretPosition;
	        }

	        // if the caret is anywhere that's not a placeholder character, seek back to the closest
	        // placeholder character and place the caret right after it.
	        for (var _i = currentCaretPosition; _i > 0; _i--) {
	          if (placeholder[_i] === _constants.placeholderCharacter) {
	            return _i + 1; // It should be immediately after the next placeholder character
	          }
	        }

	        // the user has actually deleted a character, so we need to do some work
	      } else {
	          var _changeDetails = (0, _getChangeDetails2.default)(previousInput, conformToMaskResults.output);

	          // if the index of the last changed character is more than one position far from the current
	          // caret position, then an ambiguous change happened.
	          // I.e. (333) ___-____ => (333) 3__-____, so we don't know which character was removed.
	          // In that case, just return the current caret position unmodified.
	          if (_changeDetails.indexOfFirstChange - currentCaretPosition > 1) {
	            return currentCaretPosition;
	          }

	          // if the previous character in the placeholder is a placeholder character,
	          // it's okay to keep the caret at its current position
	          if (placeholder[currentCaretPosition - 1] === _constants.placeholderCharacter) {
	            return currentCaretPosition;
	          }

	          // otherwise, starting at the index of the first removed character, seek back until we find
	          // a placeholder character at which to position the caret
	          for (var _i2 = _changeDetails.indexOfFirstChange - 1; _i2 > 0; _i2--) {
	            if (placeholder[_i2] === _constants.placeholderCharacter) {
	              return _i2 + 1; // it should be immediately after the next placeholder character
	            }
	          }
	        }

	      // if we sought back and couldn't find a placeholder character at which to position the caret
	      // we'd reach this point in the code. So, just place the caret at the beginning of the input
	      return 0;
	    }
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getChangeDetails;
	function getChangeDetails() {
	  var originalStr = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var newStr = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  var details = {
	    indexOfFirstChange: null,
	    indexOfLastChange: null,
	    numberOfChanges: 0
	  };

	  for (var i = 0; i < originalStr.length; i++) {
	    if (originalStr[i] !== newStr[i]) {
	      if (details.indexOfFirstChange === null) {
	        details.indexOfFirstChange = i;
	      }

	      details.indexOfLastChange = i;

	      details.numberOfChanges++;
	    }
	  }

	  return details;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;