!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.textMask=t(require("react")):e.textMask=t(e.React)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.adjustCaretPosition=t.convertMaskToPlaceholder=t.conformToMask=t.MaskedInput=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=r(5);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return o.conformToMask}}),Object.defineProperty(t,"convertMaskToPlaceholder",{enumerable:!0,get:function(){return o.convertMaskToPlaceholder}}),Object.defineProperty(t,"adjustCaretPosition",{enumerable:!0,get:function(){return o.adjustCaretPosition}});var i=r(7),s=n(i),u=t.MaskedInput=s["default"].createClass({displayName:"MaskedInput",propTypes:{mask:i.PropTypes.string.isRequired,guide:i.PropTypes.bool},getInitialState:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=e.mask,r=void 0===t?this.props.mask:t;return{conformedInput:"",adjustedCaretPosition:0,previousCaretPosition:0,placeholder:(0,o.convertMaskToPlaceholder)(r)}},componentWillReceiveProps:function(e){e.mask===this.props.mask&&e.guide===this.props.guide||this.setState(this.getInitialState({mask:e.mask}))},componentDidUpdate:function(){(0,o.safeSetSelection)(this.refs.inputElement,this.state.adjustedCaretPosition)},render:function(){var e=this.props,t=this.state,r=t.placeholder,n=t.conformedInput,o=this.onChange,i=e.placeholder;return s["default"].createElement("input",a({},e,{type:e.type||"text",onChange:o,value:n,placeholder:i||r,ref:"inputElement"}))},onChange:function(e){var t=e.target.value,r=this.props,n=r.mask,a=r.guide,i=this.state,s=i.placeholder,u=i.conformedInput,c=(0,o.conformToMask)(t,n,a===!1?{guide:!1,previousConformedInput:u}:{}),l=c.output,d=(0,o.adjustCaretPosition)({previousConformedInput:u,conformToMaskResults:c,currentCaretPosition:this.refs.inputElement.selectionStart}),f=l===s&&0===d?"":l;this.setState({conformedInput:f,adjustedCaretPosition:d}),"function"==typeof this.props.onChange&&this.props.onChange(e)}});t["default"]=u},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.maskingCharactersEnums={numeric:"1",alphabetic:"A",alphanumeric:"?",uppercase:"U",lowercase:"L",any:"*"},t.maskingCharactersWithDescription={1:"Any number",A:"Any letter","?":"Any number or letter",U:"Any letter (will be transformed to uppercase)",L:"Any letter (will be transformed to lowercase)","*":"Any character"},t.maskingCharacters=["1","A","?","U","L","*"],t.placeholderCharacter="_"},function(e,t,r){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return o(e).map(function(e){return-1!==f.maskingCharacters.indexOf(e)?f.placeholderCharacter:e}).join("")}function a(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return o(e).reduce(function(e,t){return-1===f.maskingCharacters.indexOf(t)&&-1===e.indexOf(t)&&e.push(t),e},[])}function o(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.split("")}function i(e,t){return-1!==e.indexOf(t)}function s(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1];switch(t){case f.maskingCharactersEnums.numeric:return c(e);case f.maskingCharactersEnums.uppercase:case f.maskingCharactersEnums.lowercase:case f.maskingCharactersEnums.alphabetic:return l(e);case f.maskingCharactersEnums.alphanumeric:return c(e)||l(e);case f.maskingCharactersEnums.any:return!0;default:return!1}}function u(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1];switch(t){case f.maskingCharactersEnums.uppercase:return e.toUpperCase();case f.maskingCharactersEnums.lowercase:return e.toLowerCase();default:return e}}function c(e){return!isNaN(e)&&" "!==e}function l(e){return/^[a-zA-Z]+$/.test(e)}function d(e,t){for(var r=e.length>t.length?e.length:t.length,n=0;r>n;n++)if(e[n]!==t[n])return n;return null}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.getDelimiters=a,t.tokenize=o,t.contains=i,t.isAcceptableCharacter=s,t.potentiallyTransformCharacter=u,t.getIndexOfFirstChange=d;var f=r(1)},function(e,t,r){"use strict";function n(e){var t=e.previousConformedInput,r=void 0===t?"":t,n=e.conformToMaskResults,i=void 0===n?{}:n,s=e.currentCaretPosition,u=void 0===s?0:s;if(0===u)return 0;var c=i.output,l=void 0===c?"":c,d=i.meta,f=void 0===d?{}:d,p=f.input,h=void 0===p?"":p,m=f.mask,v=void 0===m?"":m,g=(0,a.getIndexOfFirstChange)(r,h),C=g-u>1;if(C)return u;var k=(0,a.convertMaskToPlaceholder)(v),b=!(h.length<r.length),P=Math.abs(r.length-h.length)>1,y=b&&(r===l||l===k),M=""===r&&l===k,j=P?l:k,O=k[g]!==o.placeholderCharacter,T=u;if(P)T=0;else if(y)T--;else if(b)for(var x=u;x<k.length;x++){var _=O&&M===!1;if(k[x]===o.placeholderCharacter){T=x+(_?1:0);break}}if(b){for(var I=T;I<=j.length;I++)if(j[I]===o.placeholderCharacter||I===j.length)return I>l.length?l.length:I}else for(var E=T;E>=0;E--)if(j[E-1]===o.placeholderCharacter||0===E)return E}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n;var a=r(2),o=r(1)},function(e,t,r){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments.length<=1||void 0===arguments[1]?"":arguments[1],r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=(0,a.convertMaskToPlaceholder)(t),i=r.guide,s=void 0===i?!0:i,u=r.previousConformedInput,c=s===!1&&void 0!==u,l=(0,a.tokenize)(e),d=c&&!(e.length<u.length),f="";if(""!==e){e:for(var p=0;p<n.length;p++){var h=n[p];if(h===o.placeholderCharacter){if(l.length>0)for(;l.length>0;){var m=l.shift();if(m===o.placeholderCharacter&&c!==!0){f+=o.placeholderCharacter;continue e}if((0,a.isAcceptableCharacter)(m,t[p])){f+=(0,a.potentiallyTransformCharacter)(m,t[p]);continue e}}if(c)break;f+=h}else f+=h}if(c&&d===!1){for(var v=null,g=0;g<f.length;g++)n[g]===o.placeholderCharacter&&f[g]!==o.placeholderCharacter&&(v=g);f=null!==v?f.substr(0,v+1):""}}return{output:f,meta:{input:e,mask:t,guide:s}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n;var a=r(2),o=r(1)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(4);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(a)["default"]}});var o=r(3);Object.defineProperty(t,"adjustCaretPosition",{enumerable:!0,get:function(){return n(o)["default"]}});var i=r(6);Object.defineProperty(t,"safeSetSelection",{enumerable:!0,get:function(){return n(i)["default"]}});var s=r(2);Object.defineProperty(t,"convertMaskToPlaceholder",{enumerable:!0,get:function(){return s.convertMaskToPlaceholder}})},function(e,t){"use strict";function r(e,t){document.activeElement===e&&e.setSelectionRange(t,t,"none")}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r},function(t,r){t.exports=e}])});