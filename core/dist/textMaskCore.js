!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.textMaskCore=r():e.textMaskCore=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var a=t[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0});var a=t(3);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(a)["default"]}});var o=t(2);Object.defineProperty(r,"adjustCaretPosition",{enumerable:!0,get:function(){return n(o)["default"]}});var i=t(5);Object.defineProperty(r,"createTextMaskInputElement",{enumerable:!0,get:function(){return n(i)["default"]}})},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.maskingCharactersEnums={numeric:"1",alphabetic:"A",alphanumeric:"?",uppercase:"U",lowercase:"L",any:"*"},r.maskingCharactersWithDescription={1:"Any number",A:"Any letter","?":"Any number or letter",U:"Any letter (will be transformed to uppercase)",L:"Any letter (will be transformed to lowercase)","*":"Any character (except white space)"},r.maskingCharacters=["1","A","?","U","L","*"],r.placeholderChar="_"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?"":r,a=e.currentCaretPosition,o=void 0===a?0:a,i=e.conformedValue,s=e.rawValue,u=e.placeholderChar,c=e.placeholder,l=e.indexesOfPipedChars,f=void 0===l?n:l;if(0===o)return 0;var d=s.length,h=t.length,p=c.length,v=i.length,m=d-h,g=m>0,C=1===d,b=m>1&&!g&&!C;if(b)return o;var y=g&&(t===i||i===c),k=0;if(y?k=o-m:!function(){for(var e=i.toLowerCase(),r=s.toLowerCase(),t=r.substr(0,o).split(""),n=t.filter(function(r){return e.indexOf(r)!==-1}),a=n[n.length-1],u=f.map(function(r){return e[r]}),c=u.filter(function(e){return e===a}).length,l=n.filter(function(e){return e===a}).length,d=l+c,h=0,p=0;p<v;p++){var m=e[p];if(k=p+1,m===a&&h++,h>=d)break}}(),g){for(var P=k,w=k;w<=p;w++)if(c[w]===u&&(P=w),c[w]===u||w===p)return P}else for(var j=k;j>=0;j--)if(c[j-1]===u||0===j)return j}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=t;var n=[]},function(e,r,t){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],r=arguments.length<=1||void 0===arguments[1]?"":arguments[1],t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=t.guide,i=void 0===n||n,s=t.previousConformedValue,u=void 0===s?"":s,c=t.placeholderChar,l=void 0===c?o.placeholderChar:c,f=t.placeholder,d=void 0===f?(0,a.convertMaskToPlaceholder)(r,l):f,h=t.currentCaretPosition,p=t.keepCharPositions,v=i===!1&&void 0!==u,m=e.length,g=u.length,C=d.length,b=m-g,y=b>0,k=h+(y?-b:0),P=k+Math.abs(b);if(p===!0&&!y){for(var w="",j=k;j<P;j++)d[j]===l&&(w+=l);e=e.slice(0,k)+w+e.slice(k,m)}for(var x=r.replace(/\\./g," "),M=e.split("").map(function(e,r){return{"char":e,isNew:r>=k&&r<P}}),O=0,_=0;_<C;_++){var V=_>=k&&""!==u,A=(V?_+b:_)-O,E=M[A];void 0!==E&&d[_]===E["char"]&&E["char"]!==l&&(M.splice(A,1),O++)}var T="",N=!1;e:for(var S=0;S<C;S++){var L=d[S];if(L===l){if(M.length>0)for(;M.length>0;){var R=M.shift(),U=R["char"],J=R.isNew;if(U===l&&v!==!0){T+=l;continue e}if((0,a.isAcceptableChar)(U,x[S])){if(p===!0&&J!==!1&&""!==u&&i!==!1&&y){for(var z=M.length,D=null,I=0;I<z;I++){var W=M[I];if(W["char"]!==l&&W.isNew===!1)break;if(W["char"]===l){D=I;break}}null!==D?(T+=(0,a.potentiallyTransformChar)(U,x[S]),M.splice(D,1)):S--}else T+=(0,a.potentiallyTransformChar)(U,x[S]);continue e}N=!0}v===!1&&(T+=d.substr(S,C));break}T+=L}if(v&&y===!1){for(var Z=null,$=0;$<T.length;$++)d[$]===l&&(Z=$);T=null!==Z?T.substr(0,Z+1):""}return{conformedValue:T,meta:{someCharsRejected:N}}}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=n;var a=t(4),o=t(1)},function(e,r,t){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?d:arguments[0],r=arguments.length<=1||void 0===arguments[1]?f.placeholderChar:arguments[1];if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));for(var t=!1,n=d,a=0;a<e.length;a++){var o=e[a];"\\"!==o||t===!0?t!==!0?n+=f.maskingCharacters.indexOf(o)!==-1?r:o:(t=!1,n+=o):(t=!0,n+=d)}return n}function a(){var e=arguments.length<=0||void 0===arguments[0]?d:arguments[0];return e.split(d)}function o(){var e=arguments.length<=0||void 0===arguments[0]?d:arguments[0],r=arguments[1];switch(r){case f.maskingCharactersEnums.numeric:return s(e);case f.maskingCharactersEnums.uppercase:case f.maskingCharactersEnums.lowercase:case f.maskingCharactersEnums.alphabetic:return u(e);case f.maskingCharactersEnums.alphanumeric:return s(e)||u(e);case f.maskingCharactersEnums.any:return h.test(e)===!1;default:return!1}}function i(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],r=arguments[1];switch(r){case f.maskingCharactersEnums.uppercase:return e.toUpperCase();case f.maskingCharactersEnums.lowercase:return e.toLowerCase();default:return e}}function s(e){return!isNaN(e)&&h.test(e)!==!0}function u(e){return p.test(e)}function c(e){return"string"==typeof e||e instanceof String}function l(e){return e&&void 0===e.length&&!isNaN(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.tokenize=a,r.isAcceptableChar=o,r.potentiallyTransformChar=i,r.isString=c,r.isNumber=l;var f=t(1),d="",h=/\s/g,p=/^[a-zA-Z]+$/},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var r=e.inputElement,t=e.mask,n=e.guide,a=e.pipe,s=e.placeholderChar,c=void 0===s?d.placeholderChar:s,h=e.onAccept,p=e.onReject,v=e.keepCharPositions,m=void 0!==v&&v,g={previousConformedValue:""},C=void 0,b=void 0;return(0,f.isString)(t)&&(C=(0,f.convertMaskToPlaceholder)(t,c)),""===r.placeholder&&r.setAttribute("placeholder",C),{state:g,update:function(){var e=arguments.length<=0||void 0===arguments[0]?r.value:arguments[0];if(e!==g.previousConformedValue){var s=i(e);"function"==typeof t?(b=t(s),C=(0,f.convertMaskToPlaceholder)(b,c)):b=t;var d=r.selectionStart,v=g.previousConformedValue,y={previousConformedValue:v,guide:n,placeholderChar:c,pipe:a,placeholder:C,currentCaretPosition:d,keepCharPositions:m},k=(0,l["default"])(s,b,y),P=k.conformedValue,w=k.meta.someCharsRejected,j="function"==typeof a,x={};j&&(x=a(P,y),x===!1&&(x={value:v,rejected:!0}));var M=j?x.value:P,O=(0,u["default"])({previousConformedValue:v,conformedValue:M,placeholder:C,rawValue:s,currentCaretPosition:d,placeholderChar:c,indexesOfPipedChars:x.indexesOfPipedChars}),_=M===C&&0===O,V=_?"":M;r.value=V,o(r,O),g.previousConformedValue=V,"function"==typeof h&&V!==v&&h();var A=s.length<v.length;"function"==typeof p&&(w||x.rejected)&&A===!1&&p({conformedValue:M,pipeRejection:x.rejected,maskRejection:w})}}}}function o(e,r){document.activeElement===e&&e.setSelectionRange(r,r,"none")}function i(e){if((0,f.isString)(e))return e;if((0,f.isNumber)(e))return String(e);if(void 0===e||null===e)return"";throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=a;var s=t(2),u=n(s),c=t(3),l=n(c),f=t(4),d=t(1)}])});