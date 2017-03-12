!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.textMaskCore=r():e.textMaskCore=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var o=t(3);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(o).default}});var i=t(2);Object.defineProperty(r,"adjustCaretPosition",{enumerable:!0,get:function(){return n(i).default}});var a=t(5);Object.defineProperty(r,"createTextMaskInputElement",{enumerable:!0,get:function(){return n(a).default}})},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.placeholderChar="_"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?o:r,i=e.currentCaretPosition,a=void 0===i?0:i,u=e.conformedValue,l=e.rawValue,f=e.placeholderChar,s=e.placeholder,d=e.indexesOfPipedChars,c=void 0===d?n:d,p=e.caretTrapIndexes,v=void 0===p?n:p;if(0===a)return 0;var h=l.length,m=t.length,g=s.length,y=u.length,b=h-m,C=b>0,P=0===m,x=b>1&&!C&&!P;if(x)return a;var k=C&&(t===u||u===s),O=0;if(k)O=a-b;else for(var j=u.toLowerCase(),M=l.toLowerCase(),T=M.substr(0,a).split(o),_=T.filter(function(e){return j.indexOf(e)!==-1}),w=_[_.length-1],S=c.map(function(e){return j[e]}),V=S.filter(function(e){return e===w}).length,N=_.filter(function(e){return e===w}).length,E=s.substr(0,s.indexOf(f)).split(o).filter(function(e,r){return e===w&&l[r]!==e}).length,R=E+N+V,A=0,I=0;I<y;I++){var J=j[I];if(O=I+1,J===w&&A++,A>=R)break}if(C){for(var L=O,W=O;W<=g;W++)if(s[W]===f&&(L=W),s[W]===f||v.indexOf(W)!==-1||W===g)return L}else for(var q=O;q>=0;q--)if(s[q-1]===f||v.indexOf(q)!==-1||0===q)return q}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n=[],o=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=t.guide,u=void 0===n||n,l=t.previousConformedValue,f=void 0===l?a:l,s=t.placeholderChar,d=void 0===s?i.placeholderChar:s,c=t.placeholder,p=void 0===c?(0,o.convertMaskToPlaceholder)(r,d):c,v=t.currentCaretPosition,h=t.keepCharPositions,m=u===!1&&void 0!==f,g=e.length,y=f.length,b=p.length,C=r.length,P=g-y,x=P>0,k=v+(x?-P:0),O=k+Math.abs(P);if(h===!0&&!x){for(var j=a,M=k;M<O;M++)p[M]===d&&(j+=d);e=e.slice(0,k)+j+e.slice(k,g)}for(var T=e.split(a).map(function(e,r){return{char:e,isNew:r>=k&&r<O}}),_=g-1;_>=0;_--){var w=T[_].char;if(w!==d){var S=_>=k&&y===C;w===p[S?_-P:_]&&T.splice(_,1)}}var V=a,N=!1;e:for(var E=0;E<b;E++){var R=p[E];if(R===d){if(T.length>0)for(;T.length>0;){var A=T.shift(),I=A.char,J=A.isNew;if(I===d&&m!==!0){V+=d;continue e}if(r[E].test(I)){if(h===!0&&J!==!1&&f!==a&&u!==!1&&x){for(var L=T.length,W=null,q=0;q<L;q++){var z=T[q];if(z.char!==d&&z.isNew===!1)break;if(z.char===d){W=q;break}}null!==W?(V+=I,T.splice(W,1)):E--}else V+=I;continue e}N=!0}m===!1&&(V+=p.substr(E,b));break}V+=R}if(m&&x===!1){for(var B=null,D=0;D<V.length;D++)p[D]===d&&(B=D);V=null!==B?V.substr(0,B+1):a}return{conformedValue:V,meta:{someCharsRejected:N}}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=n;var o=t(4),i=t(1),a=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.placeholderChar;if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?r:e}).join("")}function o(e){return"string"==typeof e||e instanceof String}function i(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function a(e){for(var r=[],t=void 0;t=e.indexOf(f),t!==-1;)r.push(t),e.splice(t,1);return{maskWithoutCaretTraps:e,indexes:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.isString=o,r.isNumber=i,r.processCaretTraps=a;var u=t(1),l=[],f="[]"},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r={previousConformedValue:void 0};return{state:r,update:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,f=n.mask,d=n.guide,g=n.pipe,b=n.placeholderChar,C=void 0===b?v.placeholderChar:b,P=n.keepCharPositions,x=void 0!==P&&P;if("undefined"==typeof t&&(t=o.value),t!==r.previousConformedValue){("undefined"==typeof f?"undefined":l(f))===y&&void 0!==f.pipe&&void 0!==f.mask&&(g=f.pipe,f=f.mask);var k=void 0,O=void 0;if(f instanceof Array&&(k=(0,p.convertMaskToPlaceholder)(f,C)),f!==!1){var j=a(t),M=o.selectionStart,T=r.previousConformedValue,_=void 0;if(("undefined"==typeof f?"undefined":l(f))===h){if(O=f(j,{currentCaretPosition:M,previousConformedValue:T,placeholderChar:C}),O===!1)return;var w=(0,p.processCaretTraps)(O),S=w.maskWithoutCaretTraps,V=w.indexes;O=S,_=V,k=(0,p.convertMaskToPlaceholder)(O,C)}else O=f;var N={previousConformedValue:T,guide:d,placeholderChar:C,pipe:g,placeholder:k,currentCaretPosition:M,keepCharPositions:x},E=(0,c.default)(j,O,N),R=E.conformedValue,A=("undefined"==typeof g?"undefined":l(g))===h,I={};A&&(I=g(R,u({rawValue:j},N)),I===!1?I={value:T,rejected:!0}:(0,p.isString)(I)&&(I={value:I}));var J=A?I.value:R,L=(0,s.default)({previousConformedValue:T,conformedValue:J,placeholder:k,rawValue:j,currentCaretPosition:M,placeholderChar:C,indexesOfPipedChars:I.indexesOfPipedChars,caretTrapIndexes:_}),W=J===k&&0===L,q=W?m:J;r.previousConformedValue=q,o.value!==q&&(o.value=q,i(o,L))}}}}}function i(e,r){document.activeElement===e&&(b?setTimeout(function(){return e.setSelectionRange(r,r,g)},0):e.setSelectionRange(r,r,g))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return m;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0});var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=o;var f=t(2),s=n(f),d=t(3),c=n(d),p=t(4),v=t(1),h="function",m="",g="none",y="object",b="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent)}])});