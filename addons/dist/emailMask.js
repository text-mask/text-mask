(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["emailMask"] = factory();
	else
		root["emailMask"] = factory();
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

	module.exports = __webpack_require__(3);


/***/ }),
/* 1 */,
/* 2 */,
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