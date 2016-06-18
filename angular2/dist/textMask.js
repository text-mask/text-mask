!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@angular/common"),require("@angular/core")):"function"==typeof define&&define.amd?define(["@angular/common","@angular/core"],t):"object"==typeof exports?exports.textMask=t(require("@angular/common"),require("@angular/core")):e.textMask=t(e.ng.common,e.ng.core)}(this,function(e,t){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,a=arguments.length,i=3>a?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(i=(3>a?o(i):a>3?o(t,r,i):o(t,r))||i);return a>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},a=r(8),i=r(7),l=r(6),u=function(){function e(e,t){this.model=t,this.textMaskConfig={mask:"",guide:!0,placeholderCharacter:void 0,validator:void 0},this.inputElement=e.nativeElement}return e.prototype.ngOnInit=function(){var e=this.textMaskConfig,t=e.mask,r=e.guide,n=e.placeholderCharacter,o=e.validator;this.control=l["default"]({inputElement:this.inputElement,mask:t,guide:r,placeholderCharacter:n,validator:o})},e.prototype.ngOnDestroy=function(){this.control.destroy()},e.prototype.updateModel=function(e){this.model.viewToModelUpdate(e)},n([a.Input("textMask"),o("design:type",Object)],e.prototype,"textMaskConfig",void 0),e=n([a.Directive({selector:"input[textMask]",host:{"(keyup)":"updateModel($event.target.value)"}}),o("design:paramtypes",["function"==typeof(t="undefined"!=typeof a.ElementRef&&a.ElementRef)&&t||Object,"function"==typeof(r="undefined"!=typeof i.NgModel&&i.NgModel)&&r||Object])],e);var t,r}();Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=u,t.Directive=u},function(e,t,r){"use strict";function n(e){var t=e.mask,r=void 0===t?"":t,n=e.placeholderChar,o=void 0===n?f.placeholderCharacter:n;if(-1!==r.indexOf(o))throw console.log("Text Mask received placeholder character: ",o),console.log("Text Mask received mask: ",r),new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.");for(var a=!1,i="",l=0;l<r.length;l++){var u=r[l];"\\"!==u||a===!0?a!==!0?i+=-1!==f.maskingCharacters.indexOf(u)?o:u:(a=!1,i+=u):(a=!0,i+="")}return i}function o(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.replace(/\\./g," ")}function a(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.split("")}function i(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1];switch(t){case f.maskingCharactersEnums.numeric:return u(e);case f.maskingCharactersEnums.uppercase:case f.maskingCharactersEnums.lowercase:case f.maskingCharactersEnums.alphabetic:return c(e);case f.maskingCharactersEnums.alphanumeric:return u(e)||c(e);case f.maskingCharactersEnums.any:return!0;default:return!1}}function l(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1];switch(t){case f.maskingCharactersEnums.uppercase:return e.toUpperCase();case f.maskingCharactersEnums.lowercase:return e.toLowerCase();default:return e}}function u(e){return!isNaN(e)&&" "!==e}function c(e){return/^[a-zA-Z]+$/.test(e)}function s(e,t){for(var r=e.length>t.length?e.length:t.length,n=0;r>n;n++)if(e[n]!==t[n])return n;return null}function d(e){return"string"==typeof e||e instanceof String}function p(e){return e&&void 0===e.length&&!isNaN(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.unescapeMask=o,t.tokenize=a,t.isAcceptableCharacter=i,t.potentiallyTransformCharacter=l,t.getIndexOfFirstChange=s,t.isString=d,t.isNumber=p;var f=r(2)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.maskingCharactersEnums={numeric:"1",alphabetic:"A",alphanumeric:"?",uppercase:"U",lowercase:"L",any:"*"},t.maskingCharactersWithDescription={1:"Any number",A:"Any letter","?":"Any number or letter",U:"Any letter (will be transformed to uppercase)",L:"Any letter (will be transformed to lowercase)","*":"Any character"},t.maskingCharacters=["1","A","?","U","L","*"],t.placeholderCharacter="_"},function(e,t,r){"use strict";function n(e){var t=e.previousConformedInput,r=void 0===t?"":t,n=e.conformToMaskResults,a=void 0===n?{}:n,i=e.currentCaretPosition,l=void 0===i?0:i;if(0===l)return 0;var u=a.output,c=void 0===u?"":u,s=a.meta,d=void 0===s?{}:s,p=d.input,f=void 0===p?"":p,h=d.placeholderChar,v=d.placeholder,m=(0,o.getIndexOfFirstChange)(r,f),g=m-l>1;if(g)return l;var C=!(f.length<r.length),k=Math.abs(r.length-f.length)>1,y=1===f.length,b=k&&!C&&!y,M=C&&(r===c||c===v),P=""===r&&c===v,x=k||y?c:v,I=v[m]!==h,E=l;if(b)return l;if(k||y)E=0;else if(M)E--;else if(C)for(var _=l;_<v.length;_++){var j=I&&!P;if(v[_]===h){E=_+(j?1:0);break}}if(C||y){for(var O=E;O<=x.length;O++)if(x[O]===h||O===x.length)return O>c.length?c.length:O}else for(var T=E;T>=0;T--)if(x[T-1]===h||0===T)return T}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n;var o=r(1)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.userInput,r=void 0===t?"":t,n=e.componentPlaceholder,o=void 0===n?"":n,a=e.previousConformedInput,i=void 0===a?"":a,l=e.mask,u=void 0===l?"":l,s=e.guide,p=void 0===s?"":s,f=e.validator,h=e.currentCaretPosition,v=void 0===h?0:h,m=e.placeholderChar,g=(0,d["default"])(r,u,{previousConformedInput:i,guide:p,placeholderChar:m,validator:f}),C=g.output,k=(0,c["default"])({previousConformedInput:i,conformToMaskResults:g,currentCaretPosition:v,placeholderChar:m}),y=C===o&&0===k,b=y?"":C;return{conformedInput:b,adjustedCaretPosition:k}}function a(e){var t=e.inputValue,r=e.mask,n=e.validator,o=e.guide,a=e.placeholderChar,i=l(t),u=i.length>0,c={validator:n,guide:o,previousConformedInput:"",placeholderChar:a},s=u?(0,d["default"])(i,r,c):{output:""},f=s.output;return{conformedInput:f,adjustedCaretPosition:0,componentPlaceholder:(0,p.convertMaskToPlaceholder)({mask:r,placeholderChar:a})}}function i(e,t){document.activeElement===e&&e.setSelectionRange(t,t,"none")}function l(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return"";throw console.log("Text Mask received",e),new Error("The `value` provided to Text Mask needs to be a string or a number.")}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=void 0,t.processComponentChanges=o,t.getComponentInitialState=a,t.safeSetSelection=i;var u=r(3),c=n(u),s=r(5),d=n(s),p=r(1);t.convertMaskToPlaceholder=p.convertMaskToPlaceholder},function(e,t,r){"use strict";function n(){for(var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments.length<=1||void 0===arguments[1]?"":arguments[1],r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=r.guide,l=void 0===n?!0:n,u=r.previousConformedInput,c=void 0===u?"":u,s=r.placeholderChar,d=void 0===s?i.placeholderCharacter:s,p=r.validator,f=void 0===p?o:p,h=(0,a.convertMaskToPlaceholder)({mask:t,placeholderChar:d}),v=l===!1&&void 0!==c,m=(0,a.getIndexOfFirstChange)(c,e),g=e.length-c.length,C=(0,a.tokenize)(e),k=v&&!(e.length<c.length),y=(0,a.unescapeMask)(t),b=0,M=0;M<h.length&&C.length>0;M++){var P=M>=m&&""!==c,x=(P?M+g:M)-b;h[M]===C[x]&&C[x]!==d&&(C.splice(x,1),b++)}var I="";e:for(var E=0;E<h.length;E++){var _=h[E];if(_===d){if(C.length>0)for(;C.length>0;){var j=C.shift();if(j===d&&v!==!0){I+=d;continue e}if((0,a.isAcceptableCharacter)(j,y[E])){I+=(0,a.potentiallyTransformCharacter)(j,y[E]);continue e}}v===!1&&(I+=h.substr(E,h.length));break}I+=_}if(v&&k===!1){for(var O=null,T=0;T<I.length;T++)h[T]===d&&(O=T);I=null!==O?I.substr(0,O+1):""}return{output:f(I)?I:c,meta:{input:e,mask:t,guide:l,placeholderChar:d,placeholder:h}}}function o(){return!0}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n;var a=r(1),i=r(2)},function(e,t,r){"use strict";function n(e){var t=e.inputElement,r=e.mask,n=e.guide,a=e.validator,i=e.placeholderCharacter,l=t.value,u=(0,o.getComponentInitialState)({inputValue:l,mask:r,guide:n,placeholderChar:i}),c=function(){var e=t.value,l=t.selectionStart,c=u.componentPlaceholder,s=u.conformedInput,d=(0,o.processComponentChanges)({userInput:e,componentPlaceholder:c,previousConformedInput:s,validator:a,mask:r,guide:n,placeholderChar:i,currentCaretPosition:l}),p=d.adjustedCaretPosition,f=d.conformedInput;u.conformedInput=f,t.value=f,(0,o.safeSetSelection)(t,p)};return t.placeholder=""!==t.placeholder?t.placeholder:u.componentPlaceholder,t.value=u.conformedInput,t.addEventListener("input",c),{state:u,update:c,destroy:function(){t.removeEventListener("input",c)}}}Object.defineProperty(t,"__esModule",{value:!0}),t.maskInput=n;var o=r(4);t["default"]=n},function(t,r){t.exports=e},function(e,r){e.exports=t}])});