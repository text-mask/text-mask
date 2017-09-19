(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["textMaskAddons"] = factory();
	else
		root["textMaskAddons"] = factory();
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

	var _createAutoCorrectedDatePipe = __webpack_require__(1);

	Object.defineProperty(exports, 'createAutoCorrectedDatePipe', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_createAutoCorrectedDatePipe).default;
	  }
	});

	var _createNumberMask = __webpack_require__(2);

	Object.defineProperty(exports, 'createNumberMask', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_createNumberMask).default;
	  }
	});

	var _emailMask = __webpack_require__(3);

	Object.defineProperty(exports, 'emailMask', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_emailMask).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createAutoCorrectedDatePipe;
	function createAutoCorrectedDatePipe() {
	  var dateFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mm dd yyyy';

	  return function (conformedValue) {
	    var indexesOfPipedChars = [];
	    var dateFormatArray = dateFormat.split(/[^dmy]+/);
	    var maxValue = { 'dd': 31, 'mm': 12, 'yy': 99, 'yyyy': 9999 };
	    var minValue = { 'dd': 1, 'mm': 1, 'yy': 0, 'yyyy': 1 };
	    var conformedValueArr = conformedValue.split('');

	    // Check first digit
	    dateFormatArray.forEach(function (format) {
	      var position = dateFormat.indexOf(format);
	      var maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);

	      if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
	        conformedValueArr[position + 1] = conformedValueArr[position];
	        conformedValueArr[position] = 0;
	        indexesOfPipedChars.push(position);
	      }
	    });

	    // Check for invalid date
	    var isInvalid = dateFormatArray.some(function (format) {
	      var position = dateFormat.indexOf(format);
	      var length = format.length;
	      var textValue = conformedValue.substr(position, length).replace(/\D/g, '');
	      var value = parseInt(textValue, 10);

	      return value > maxValue[format] || textValue.length === length && value < minValue[format];
	    });

	    if (isInvalid) {
	      return false;
	    }

	    return {
	      value: conformedValueArr.join(''),
	      indexesOfPipedChars: indexesOfPipedChars
	    };
	  };
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = createNumberMask;
	var dollarSign = '$';
	var emptyString = '';
	var comma = ',';
	var period = '.';
	var minus = '-';
	var minusRegExp = /-/;
	var nonDigitsRegExp = /\D+/g;
	var number = 'number';
	var digitRegExp = /\d/;
	var caretTrap = '[]';

	function createNumberMask() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref$prefix = _ref.prefix,
	      prefix = _ref$prefix === undefined ? dollarSign : _ref$prefix,
	      _ref$suffix = _ref.suffix,
	      suffix = _ref$suffix === undefined ? emptyString : _ref$suffix,
	      _ref$includeThousands = _ref.includeThousandsSeparator,
	      includeThousandsSeparator = _ref$includeThousands === undefined ? true : _ref$includeThousands,
	      _ref$thousandsSeparat = _ref.thousandsSeparatorSymbol,
	      thousandsSeparatorSymbol = _ref$thousandsSeparat === undefined ? comma : _ref$thousandsSeparat,
	      _ref$allowDecimal = _ref.allowDecimal,
	      allowDecimal = _ref$allowDecimal === undefined ? false : _ref$allowDecimal,
	      _ref$decimalSymbol = _ref.decimalSymbol,
	      decimalSymbol = _ref$decimalSymbol === undefined ? period : _ref$decimalSymbol,
	      _ref$decimalLimit = _ref.decimalLimit,
	      decimalLimit = _ref$decimalLimit === undefined ? 2 : _ref$decimalLimit,
	      _ref$requireDecimal = _ref.requireDecimal,
	      requireDecimal = _ref$requireDecimal === undefined ? false : _ref$requireDecimal,
	      _ref$allowNegative = _ref.allowNegative,
	      allowNegative = _ref$allowNegative === undefined ? false : _ref$allowNegative,
	      _ref$allowLeadingZero = _ref.allowLeadingZeroes,
	      allowLeadingZeroes = _ref$allowLeadingZero === undefined ? false : _ref$allowLeadingZero,
	      _ref$integerLimit = _ref.integerLimit,
	      integerLimit = _ref$integerLimit === undefined ? null : _ref$integerLimit;

	  var prefixLength = prefix && prefix.length || 0;
	  var suffixLength = suffix && suffix.length || 0;
	  var thousandsSeparatorSymbolLength = thousandsSeparatorSymbol && thousandsSeparatorSymbol.length || 0;

	  function numberMask() {
	    var rawValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyString;

	    var rawValueLength = rawValue.length;

	    if (rawValue === emptyString || rawValue[0] === prefix[0] && rawValueLength === 1) {
	      return prefix.split(emptyString).concat([digitRegExp]).concat(suffix.split(emptyString));
	    }

	    var indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
	    var hasDecimal = indexOfLastDecimal !== -1;
	    var isNegative = rawValue[0] === minus && allowNegative;

	    var integer = void 0;
	    var fraction = void 0;
	    var mask = void 0;

	    // remove the suffix
	    if (rawValue.slice(suffixLength * -1) === suffix) {
	      rawValue = rawValue.slice(0, suffixLength * -1);
	    }

	    if (hasDecimal && (allowDecimal || requireDecimal)) {
	      integer = rawValue.slice(rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0, indexOfLastDecimal);

	      fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
	      fraction = convertToMask(fraction.replace(nonDigitsRegExp, emptyString));
	    } else {
	      if (rawValue.slice(0, prefixLength) === prefix) {
	        integer = rawValue.slice(prefixLength);
	      } else {
	        integer = rawValue;
	      }
	    }

	    if (integerLimit && (typeof integerLimit === 'undefined' ? 'undefined' : _typeof(integerLimit)) === number) {
	      var thousandsSeparatorRegex = thousandsSeparatorSymbol === '.' ? '[.]' : '' + thousandsSeparatorSymbol;
	      var reg = new RegExp('[^0-9' + thousandsSeparatorSymbol + ']', 'g');
	      integer = integer.replace(reg, '');
	      var numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []).length;

	      integer = integer.slice(0, integerLimit + numberOfThousandSeparators * thousandsSeparatorSymbolLength);
	    }

	    integer = integer.replace(nonDigitsRegExp, emptyString);

	    if (!allowLeadingZeroes) {
	      integer = String(Number(integer));
	    }

	    integer = includeThousandsSeparator ? addThousandsSeparator(integer, thousandsSeparatorSymbol) : integer;

	    mask = convertToMask(integer);

	    if (hasDecimal && allowDecimal || requireDecimal === true) {
	      if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
	        mask.push(caretTrap);
	      }

	      mask.push(decimalSymbol, caretTrap);

	      if (fraction) {
	        if ((typeof decimalLimit === 'undefined' ? 'undefined' : _typeof(decimalLimit)) === number) {
	          fraction = fraction.slice(0, decimalLimit);
	        }

	        mask = mask.concat(fraction);
	      }

	      if (requireDecimal === true && rawValue[indexOfLastDecimal - 1] === decimalSymbol) {
	        mask.push(digitRegExp);
	      }
	    }

	    if (prefixLength > 0) {
	      mask = prefix.split(emptyString).concat(mask);
	    }

	    if (isNegative) {
	      // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
	      if (mask.length === prefixLength) {
	        mask.push(digitRegExp);
	      }

	      mask = [minusRegExp].concat(mask);
	    }

	    if (suffix.length > 0) {
	      mask = mask.concat(suffix.split(emptyString));
	    }

	    return mask;
	  }

	  numberMask.instanceOf = 'createNumberMask';

	  return numberMask;
	}

	function convertToMask(strNumber) {
	  return strNumber.split(emptyString).map(function (char) {
	    return digitRegExp.test(char) ? digitRegExp : char;
	  });
	}

	// http://stackoverflow.com/a/10899795/604296
	function addThousandsSeparator(n, thousandsSeparatorSymbol) {
	  return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _emailPipe = __webpack_require__(4);

	var _emailPipe2 = _interopRequireDefault(_emailPipe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var asterisk = '*';
	var dot = '.';
	var emptyString = '';
	var atSymbol = '@';
	var caretTrap = '[]';
	var space = ' ';
	var g = 'g';
	var anyNonWhitespaceRegExp = /[^\s]/;
	var anyNonDotOrWhitespaceRegExp = /[^.\s]/;
	var allWhitespaceRegExp = /\s/g;

	function emailMask(rawValue, config) {
	  rawValue = rawValue.replace(allWhitespaceRegExp, emptyString);

	  var placeholderChar = config.placeholderChar,
	      currentCaretPosition = config.currentCaretPosition;

	  var indexOfFirstAtSymbol = rawValue.indexOf(atSymbol);
	  var indexOfLastDot = rawValue.lastIndexOf(dot);
	  var indexOfTopLevelDomainDot = indexOfLastDot < indexOfFirstAtSymbol ? -1 : indexOfLastDot;

	  var localPartToDomainConnector = getConnector(rawValue, indexOfFirstAtSymbol + 1, atSymbol);
	  var domainNameToTopLevelDomainConnector = getConnector(rawValue, indexOfTopLevelDomainDot - 1, dot);

	  var localPart = getLocalPart(rawValue, indexOfFirstAtSymbol, placeholderChar);
	  var domainName = getDomainName(rawValue, indexOfFirstAtSymbol, indexOfTopLevelDomainDot, placeholderChar);
	  var topLevelDomain = getTopLevelDomain(rawValue, indexOfTopLevelDomainDot, placeholderChar, currentCaretPosition);

	  localPart = convertToMask(localPart);
	  domainName = convertToMask(domainName);
	  topLevelDomain = convertToMask(topLevelDomain, true);

	  var mask = localPart.concat(localPartToDomainConnector).concat(domainName).concat(domainNameToTopLevelDomainConnector).concat(topLevelDomain);

	  return mask;
	}

	function getConnector(rawValue, indexOfConnection, connectionSymbol) {
	  var connector = [];

	  if (rawValue[indexOfConnection] === connectionSymbol) {
	    connector.push(connectionSymbol);
	  } else {
	    connector.push(caretTrap, connectionSymbol);
	  }

	  connector.push(caretTrap);

	  return connector;
	}

	function getLocalPart(rawValue, indexOfFirstAtSymbol) {
	  if (indexOfFirstAtSymbol === -1) {
	    return rawValue;
	  } else {
	    return rawValue.slice(0, indexOfFirstAtSymbol);
	  }
	}

	function getDomainName(rawValue, indexOfFirstAtSymbol, indexOfTopLevelDomainDot, placeholderChar) {
	  var domainName = emptyString;

	  if (indexOfFirstAtSymbol !== -1) {
	    if (indexOfTopLevelDomainDot === -1) {
	      domainName = rawValue.slice(indexOfFirstAtSymbol + 1, rawValue.length);
	    } else {
	      domainName = rawValue.slice(indexOfFirstAtSymbol + 1, indexOfTopLevelDomainDot);
	    }
	  }

	  domainName = domainName.replace(new RegExp('[\\s' + placeholderChar + ']', g), emptyString);

	  if (domainName === atSymbol) {
	    return asterisk;
	  } else if (domainName.length < 1) {
	    return space;
	  } else if (domainName[domainName.length - 1] === dot) {
	    return domainName.slice(0, domainName.length - 1);
	  } else {
	    return domainName;
	  }
	}

	function getTopLevelDomain(rawValue, indexOfTopLevelDomainDot, placeholderChar, currentCaretPosition) {
	  var topLevelDomain = emptyString;

	  if (indexOfTopLevelDomainDot !== -1) {
	    topLevelDomain = rawValue.slice(indexOfTopLevelDomainDot + 1, rawValue.length);
	  }

	  topLevelDomain = topLevelDomain.replace(new RegExp('[\\s' + placeholderChar + '.]', g), emptyString);

	  if (topLevelDomain.length === 0) {
	    return rawValue[indexOfTopLevelDomainDot - 1] === dot && currentCaretPosition !== rawValue.length ? asterisk : emptyString;
	  } else {
	    return topLevelDomain;
	  }
	}

	function convertToMask(str, noDots) {
	  return str.split(emptyString).map(function (char) {
	    return char === space ? char : noDots ? anyNonDotOrWhitespaceRegExp : anyNonWhitespaceRegExp;
	  });
	}

	exports.default = { mask: emailMask, pipe: _emailPipe2.default };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = emailPipe;
	var atSymbol = '@';
	var allAtSymbolsRegExp = /@/g;
	var emptyString = '';
	var atDot = '@.';
	var dot = '.';
	var dotDot = '..';
	var emptyArray = [];
	var allDotsRegExp = /\./g;

	function emailPipe(conformedValue, config) {
	  var currentCaretPosition = config.currentCaretPosition,
	      rawValue = config.rawValue,
	      previousConformedValue = config.previousConformedValue,
	      placeholderChar = config.placeholderChar;


	  var value = conformedValue;

	  value = removeAllAtSymbolsButFirst(value);

	  var indexOfAtDot = value.indexOf(atDot);

	  var emptyEmail = rawValue.match(new RegExp('[^@\\s.' + placeholderChar + ']')) === null;

	  if (emptyEmail) {
	    return emptyString;
	  }

	  if (value.indexOf(dotDot) !== -1 || indexOfAtDot !== -1 && currentCaretPosition !== indexOfAtDot + 1 || rawValue.indexOf(atSymbol) === -1 && previousConformedValue !== emptyString && rawValue.indexOf(dot) !== -1) {
	    return false;
	  }

	  var indexOfAtSymbol = value.indexOf(atSymbol);
	  var domainPart = value.slice(indexOfAtSymbol + 1, value.length);

	  if ((domainPart.match(allDotsRegExp) || emptyArray).length > 1 && value.substr(-1) === dot && currentCaretPosition !== rawValue.length) {
	    value = value.slice(0, value.length - 1);
	  }

	  return value;
	}

	function removeAllAtSymbolsButFirst(str) {
	  var atSymbolCount = 0;

	  return str.replace(allAtSymbolsRegExp, function () {
	    atSymbolCount++;

	    return atSymbolCount === 1 ? atSymbol : emptyString;
	  });
	}

/***/ })
/******/ ])
});
;