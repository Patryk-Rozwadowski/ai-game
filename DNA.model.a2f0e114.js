parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"u6tv":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.DNA=void 0;var r=function(){function t(n){e(this,t),this.genes=n?new Array(n):[]}return n(t,[{key:"creatingGenes",value:function(e){for(var t=0;t<e;t++)this.genes[t]=this._applyMutate()}},{key:"crossOver",value:function(e){for(var n=new t(this.genes.length),r=Math.floor(Math.random()*this.genes.length),a=0;a<this.genes.length;a++)a>r?n.genes[a]=this.genes[a]:a<r&&(n.genes[a]=e.genes[a]);return n}},{key:"_applyMutate",value:function(){return Math.floor(2*Math.random())}},{key:"_mutate",value:function(e){for(var t=0;t<this.genes.length;t++)Math.random()<e&&(this.genes[t]=this._applyMutate())}}]),t}();exports.DNA=r;
},{}]},{},["u6tv"], null)
//# sourceMappingURL=DNA.model.a2f0e114.js.map