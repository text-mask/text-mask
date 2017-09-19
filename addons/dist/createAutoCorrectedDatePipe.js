(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["createAutoCorrectedDatePipe"] = factory();
	else
		root["createAutoCorrectedDatePipe"] = factory();
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

	module.exports = __webpack_require__(1);


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

/***/ })
/******/ ])
});
;