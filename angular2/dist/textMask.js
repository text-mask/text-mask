!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@angular/common"),require("@angular/core")):"function"==typeof define&&define.amd?define(["@angular/common","@angular/core"],t):"object"==typeof exports?exports.textMask=t(require("@angular/common"),require("@angular/core")):e.textMask=t(e.ng.common,e.ng.core)}(this,function(e,t){return function(e){function __webpack_require__(r){if(t[r])return t[r].exports;var a=t[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,__webpack_require__),a.loaded=!0,a.exports}var t={};return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.p="",__webpack_require__(0)}([function(e,t,r){"use strict";var a=this&&this.__decorate||function(e,t,r,a){var n,o=arguments.length,i=3>o?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,a);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(i=(3>o?n(i):o>3?n(t,r,i):n(t,r))||i);return o>3&&i&&Object.defineProperty(t,r,i),i},n=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},o=r(4),i=r(8),l=r(7),u=function(){function MaskedInputDirective(e,t){this.model=t,this.textMaskConfig={mask:"",guide:!0,placeholderCharacter:void 0,validator:void 0},this.inputElement=e.nativeElement}return MaskedInputDirective.prototype.setComponentInitialState=function(e){var t=e.inputValue,r=e.mask,a=e.guide,n=e.placeholderChar,i=e.validator,l=o.getComponentInitialState({inputValue:t,validator:i,mask:r,guide:a,placeholderChar:n}),u=l.conformedInput,c=l.componentPlaceholder;this.conformedInput=u,this.componentPlaceholder=c,this.inputElement.placeholder=void 0!==this.inputElement.placeholder?this.inputElement.placeholder:this.componentPlaceholder,this.model.valueAccessor.writeValue(u),this.updateModel(u)},MaskedInputDirective.prototype.ngOnInit=function(e){var t=void 0===e?this.textMaskConfig:e,r=t.mask,a=t.validator,n=t.guide,o=t.placeholderCharacter;this.setComponentInitialState({inputValue:this.model.viewModel,validator:a,mask:r,guide:n,placeholderChar:o})},MaskedInputDirective.prototype.ngOnChanges=function(e){var t=e.textMaskConfig,r=t.currentValue,a=r.mask,n=r.guide,o=r.validator,i=r.placeholderCharacter,l=t.previousValue,u=(l.mask,l.guide,l.validator);l.placeholderCharacter;o!==u&&this.setComponentInitialState({inputValue:this.model.viewModel,mask:a,guide:n,validator:o,placeholderChar:i})},MaskedInputDirective.prototype.onInput=function(e){void 0===e&&(e="");var t=this,r=t.textMaskConfig,a=r.mask,n=r.guide,i=r.placeholderCharacter,l=t.componentPlaceholder,u=t.conformedInput,c=o.processComponentChanges({userInput:e,componentPlaceholder:l,previousConformedInput:u,mask:a,guide:n,placeholderChar:i,currentCaretPosition:this.inputElement.selectionStart}),s=c.adjustedCaretPosition,d=c.conformedInput;this.conformedInput=d,this.model.valueAccessor.writeValue(d),o.safeSetSelection(this.inputElement,s)},MaskedInputDirective.prototype.updateModel=function(e){this.model.viewToModelUpdate(e)},a([i.Input("textMask"),n("design:type",Object)],MaskedInputDirective.prototype,"textMaskConfig",void 0),MaskedInputDirective=a([i.Directive({selector:"input[textMask][ngModel]",host:{"(input)":"onInput($event.target.value)","(keyup)":"updateModel($event.target.value)"}}),n("design:paramtypes",["function"==typeof(e="undefined"!=typeof i.ElementRef&&i.ElementRef)&&e||Object,"function"==typeof(t="undefined"!=typeof l.NgModel&&l.NgModel)&&t||Object])],MaskedInputDirective);var e,t}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=u,t.Directive=u;var c=r(5);t.conformToMask=c.default;var s=r(1);t.convertMaskToPlaceholder=s.convertMaskToPlaceholder},function(e,t,r){"use strict";function convertMaskToPlaceholder(e){var t=e.mask,r=void 0===t?"":t,n=e.placeholderChar,o=void 0===n?a.placeholderCharacter:n;if(-1!==r.indexOf(o))throw console.log("Text Mask received placeholder character: ",o),console.log("Text Mask received mask: ",r),new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.");for(var i=!1,l="",u=0;u<r.length;u++){var c=r[u];"\\"!==c||i===!0?i!==!0?l+=-1!==a.maskingCharacters.indexOf(c)?o:c:(i=!1,l+=c):(i=!0,l+="")}return l}function unescapeMask(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.replace(/\\./g," ")}function tokenize(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.split("")}function isAcceptableCharacter(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1];switch(t){case a.maskingCharactersEnums.numeric:return isNumeric(e);case a.maskingCharactersEnums.uppercase:case a.maskingCharactersEnums.lowercase:case a.maskingCharactersEnums.alphabetic:return isAlphabetic(e);case a.maskingCharactersEnums.alphanumeric:return isNumeric(e)||isAlphabetic(e);case a.maskingCharactersEnums.any:return!0;default:return!1}}function potentiallyTransformCharacter(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1];switch(t){case a.maskingCharactersEnums.uppercase:return e.toUpperCase();case a.maskingCharactersEnums.lowercase:return e.toLowerCase();default:return e}}function isNumeric(e){return!isNaN(e)&&" "!==e}function isAlphabetic(e){return/^[a-zA-Z]+$/.test(e)}function getIndexOfFirstChange(e,t){for(var r=e.length>t.length?e.length:t.length,a=0;r>a;a++)if(e[a]!==t[a])return a;return null}function isString(e){return"string"==typeof e||e instanceof String}function isNumber(e){return e&&void 0===e.length&&!isNaN(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=convertMaskToPlaceholder,t.unescapeMask=unescapeMask,t.tokenize=tokenize,t.isAcceptableCharacter=isAcceptableCharacter,t.potentiallyTransformCharacter=potentiallyTransformCharacter,t.getIndexOfFirstChange=getIndexOfFirstChange,t.isString=isString,t.isNumber=isNumber;var a=r(2)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.maskingCharactersEnums={numeric:"1",alphabetic:"A",alphanumeric:"?",uppercase:"U",lowercase:"L",any:"*"},t.maskingCharactersWithDescription={1:"Any number",A:"Any letter","?":"Any number or letter",U:"Any letter (will be transformed to uppercase)",L:"Any letter (will be transformed to lowercase)","*":"Any character"},t.maskingCharacters=["1","A","?","U","L","*"],t.placeholderCharacter="_"},function(e,t,r){"use strict";function adjustCaretPosition(e){var t=e.previousConformedInput,r=void 0===t?"":t,n=e.conformToMaskResults,o=void 0===n?{}:n,i=e.currentCaretPosition,l=void 0===i?0:i;if(0===l)return 0;var u=o.output,c=void 0===u?"":u,s=o.meta,d=void 0===s?{}:s,p=d.input,h=void 0===p?"":p,f=d.placeholderChar,v=d.placeholder,m=(0,a.getIndexOfFirstChange)(r,h),g=m-l>1;if(g)return l;var C=!(h.length<r.length),k=Math.abs(r.length-h.length)>1,M=1===h.length,_=k&&!C&&!M,b=C&&(r===c||c===v),y=""===r&&c===v,I=k||M?c:v,P=v[m]!==f,x=l;if(_)return l;if(k||M)x=0;else if(b)x--;else if(C)for(var w=l;w<v.length;w++){var T=P&&!y;if(v[w]===f){x=w+(T?1:0);break}}if(C||M){for(var S=x;S<=I.length;S++)if(I[S]===f||S===I.length)return S>c.length?c.length:S}else for(var j=x;j>=0;j--)if(I[j-1]===f||0===j)return j}Object.defineProperty(t,"__esModule",{value:!0}),t.default=adjustCaretPosition;var a=r(1)},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function processComponentChanges(e){var t=e.userInput,r=void 0===t?"":t,a=e.componentPlaceholder,o=void 0===a?"":a,l=e.previousConformedInput,u=void 0===l?"":l,c=e.mask,s=void 0===c?"":c,d=e.guide,p=void 0===d?"":d,h=e.validator,f=e.currentCaretPosition,v=void 0===f?0:f,m=e.placeholderChar,g=(0,i.default)(r,s,{previousConformedInput:u,guide:p,placeholderChar:m,validator:h}),C=g.output,k=(0,n.default)({previousConformedInput:u,conformToMaskResults:g,currentCaretPosition:v,placeholderChar:m}),M=C===o&&0===k,_=M?"":C;return{conformedInput:_,adjustedCaretPosition:k}}function getComponentInitialState(e){var t=e.inputValue,r=e.mask,a=e.validator,n=e.guide,o=e.placeholderChar,u=getSafeInputValue(t),c=u.length>0,s={validator:a,guide:n,previousConformedInput:"",placeholderChar:o},d=c?(0,i.default)(u,r,s):{output:""},p=d.output;return{conformedInput:p,adjustedCaretPosition:0,componentPlaceholder:(0,l.convertMaskToPlaceholder)({mask:r,placeholderChar:o})}}function safeSetSelection(e,t){document.activeElement===e&&e.setSelectionRange(t,t,"none")}function getSafeInputValue(e){if((0,l.isString)(e))return e;if((0,l.isNumber)(e))return String(e);if(void 0===e||null===e)return"";throw console.log("Text Mask received",e),new Error("The `value` provided to Text Mask needs to be a string or a number.")}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=void 0,t.processComponentChanges=processComponentChanges,t.getComponentInitialState=getComponentInitialState,t.safeSetSelection=safeSetSelection;var a=r(3),n=_interopRequireDefault(a),o=r(5),i=_interopRequireDefault(o),l=r(1);t.convertMaskToPlaceholder=l.convertMaskToPlaceholder},function(e,t,r){"use strict";function conformToMask(){for(var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments.length<=1||void 0===arguments[1]?"":arguments[1],r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],o=r.guide,i=void 0===o?!0:o,l=r.previousConformedInput,u=void 0===l?"":l,c=r.placeholderChar,s=void 0===c?n.placeholderCharacter:c,d=r.validator,p=void 0===d?alwaysReturnTrue:d,h=(0,a.convertMaskToPlaceholder)({mask:t,placeholderChar:s}),f=i===!1&&void 0!==u,v=(0,a.getIndexOfFirstChange)(u,e),m=e.length-u.length,g=(0,a.tokenize)(e),C=f&&!(e.length<u.length),k=(0,a.unescapeMask)(t),M=0,_=0;_<h.length&&g.length>0;_++){var b=_>=v&&""!==u,y=(b?_+m:_)-M;h[_]===g[y]&&g[y]!==s&&(g.splice(y,1),M++)}var I="";e:for(var P=0;P<h.length;P++){var x=h[P];if(x===s){if(g.length>0)for(;g.length>0;){var w=g.shift();if(w===s&&f!==!0){I+=s;continue e}if((0,a.isAcceptableCharacter)(w,k[P])){I+=(0,a.potentiallyTransformCharacter)(w,k[P]);continue e}}f===!1&&(I+=h.substr(P,h.length));break}I+=x}if(f&&C===!1){for(var T=null,S=0;S<I.length;S++)h[S]===s&&(T=S);I=null!==T?I.substr(0,T+1):""}return{output:p(I)?I:u,meta:{input:e,mask:t,guide:i,placeholderChar:s,placeholder:h}}}function alwaysReturnTrue(){return!0}Object.defineProperty(t,"__esModule",{value:!0}),t.default=conformToMask;var a=r(1),n=r(2)},,function(t,r){t.exports=e},function(e,r){e.exports=t}])});