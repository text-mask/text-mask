'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createObject;
function createObject() {
  var newObject = {};
  var args = arguments.slice();

  args.forEach(function (obj) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object' && obj.constructor == Object) {
      Object.keys(obj).forEach(function (key) {
        newObject[key] = obj[key];
      });
    }
  });

  return newObject;
}