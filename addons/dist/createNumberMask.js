!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.createNumberMask=t():e.createNumberMask=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){e.exports=o(2)},,function(e,t){"use strict";function o(){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=e.length;if(e===l||e[0]===y[0]&&1===o)return y.split(l).concat([v]).concat(h.split(l));if(e===O&&M){var c=t instanceof Object?t.previousConformedValue:void 0,u=c&&c!==l?m:v;return y.split(l).concat(["0",O,u]).concat(h.split(l))}var a=e.lastIndexOf(O),b=a!==-1,g=e[0]===d&&q,S=void 0,w=void 0,N=void 0;if(e.slice(R*-1)===h&&(e=e.slice(0,R*-1)),b&&(M||$)?(S=e.slice(e.slice(0,P)===y?P:0,a),w=e.slice(a+1,o),w=n(w.replace(f,l))):S=e.slice(0,P)===y?e.slice(P):e,I&&("undefined"==typeof I?"undefined":r(I))===p){var k="."===j?"[.]":""+j,L=(S.match(new RegExp(k,"g"))||[]).length;S=S.slice(0,I+L*T)}return S=S.replace(f,l),C||(S=S.replace(/^0+(0$|[^0])/,"$1")),S=x?i(S,j):S,N=n(S),(b&&M||$===!0)&&(e[a-1]!==O&&N.push(m),N.push(O,m),w&&(("undefined"==typeof D?"undefined":r(D))===p&&(w=w.slice(0,D)),N=N.concat(w)),$===!0&&e[a-1]===O&&N.push(v)),P>0&&(N=y.split(l).concat(N)),g&&(N.length===P&&N.push(v),N=[s].concat(N)),h.length>0&&(N=N.concat(h.split(l))),N}var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=t.prefix,y=void 0===o?c:o,b=t.suffix,h=void 0===b?l:b,g=t.includeThousandsSeparator,x=void 0===g||g,S=t.thousandsSeparatorSymbol,j=void 0===S?u:S,w=t.allowDecimal,M=void 0!==w&&w,N=t.decimalSymbol,O=void 0===N?a:N,k=t.decimalLimit,D=void 0===k?2:k,L=t.requireDecimal,$=void 0!==L&&L,_=t.allowNegative,q=void 0!==_&&_,B=t.allowLeadingZeroes,C=void 0!==B&&B,E=t.integerLimit,I=void 0===E?null:E,P=y&&y.length||0,R=h&&h.length||0,T=j&&j.length||0;return e.instanceOf="createNumberMask",e}function n(e){return e.split(l).map(function(e){return v.test(e)?v:e})}function i(e,t){return e.replace(/\B(?=(\d{3})+(?!\d))/g,t)}Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var c="$",l="",u=",",a=".",d="-",s=/-/,f=/\D+/g,p="number",v=/\d/,m="[]"}])});