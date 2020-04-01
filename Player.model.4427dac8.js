// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"View/Settings.view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settings = void 0;
var canvas = document.getElementById('gameContainer');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var Settings = {
  gameContainer: document.getElementById('gameContainer'),
  canvasWidth: canvas.width,
  canvasHeight: canvas.height,
  ctx: canvas.getContext('2d')
};
exports.Settings = Settings;
},{}],"utils/getRandomNumber.util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomNumber = void 0;

var getRandomNumber = function getRandomNumber(len) {
  return Math.floor(Math.random() * len);
};

exports.getRandomNumber = getRandomNumber;
},{}],"Models/Player.model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Settings = require("../View/Settings.view");

var _getRandomNumber = require("../utils/getRandomNumber.util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvasWidth = _Settings.Settings.canvasWidth,
    canvasHeight = _Settings.Settings.canvasHeight;

var Player = /*#__PURE__*/function () {
  function Player(dna, newGenes, ball) {
    _classCallCheck(this, Player);

    this.id = (0, _getRandomNumber.getRandomNumber)(1);
    this.lifeSpan = 2900;

    if (newGenes) {
      this.dna = dna;
      this.newGenes = true;
      this.x = 400;
    } else {
      this.dna = dna;
      this.dna.creatingGenes(this.lifeSpan);
      this.newGenes = false;
      this.x = Math.floor(Math.random() * canvasWidth);
    }

    this.y = _Settings.Settings.canvasHeight - 25;
    this.x_step = 25;
    this.height = 15;
    this.width = canvasWidth / 6;
    this.color = this.changeColor();
    this.dead = false;
    this.ball = ball;
    this.index = 0;
    this.lifes = 1;
    this.score = 0;
    this.ballHit = 0;
    this.fitness = 0;
    this.distanceFromBall = 0;
    this.deathPenalty = 0;
  }

  _createClass(Player, [{
    key: "calcFitness",
    value: function calcFitness() {
      this.distanceFromBall = Math.abs(this.distanceFromBall);
      this.fitness = this.score * this.ballHit / this.deathPenalty + this.distanceFromBall;
    }
  }, {
    key: "walls_collision",
    value: function walls_collision() {
      var ROOF = this.ball.y + this.ball.y_speed - this.ball.ballRadius < 0;
      var RIGHT_WALL = this.ball.x + this.ball.x_speed + this.ball.ballRadius > canvasWidth;
      var LEFT_WALL = this.ball.x + this.ball.x_speed - this.ball.ballRadius < 0;
      var GROUND = this.ball.y + this.ball.y_speed + this.ball.ballRadius > canvasHeight;

      switch (true) {
        case ROOF:
          this.ball.y_speed = -this.ball.y_speed;
          break;

        case LEFT_WALL:
          this.ball.x_speed = -this.ball.x_speed;
          break;

        case RIGHT_WALL:
          this.ball.x_speed = -this.ball.x_speed;
          break;

        case GROUND:
          this.ball.y_speed = -this.ball.y_speed;
          this.lifes -= 1;

          if (this.lifes === 0) {
            this.dead = true;
            this.calcFitness();
          }

      }
    }
  }, {
    key: "player_collision",
    value: function player_collision() {
      if (this.ball.y + this.ball.y_speed + this.ball.ballRadius >= this.y + this.height && this.ball.x + this.ball.ballRadius < this.x + this.width && this.x < this.ball.x + this.ball.ballRadius) {
        this.ball.y_speed = -this.ball.y_speed;
        this.ballHit++;
      }
    }
  }, {
    key: "drawPlayer",
    value: function drawPlayer() {
      var ctx = _Settings.Settings.ctx;
      ctx.beginPath();
      ctx.rect(this.x, canvasHeight - this.height, this.width, this.height);
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = this.color;
      this.ball.color = this.color;
    }
  }, {
    key: "drawBallLine",
    value: function drawBallLine() {
      var ctx = _Settings.Settings.ctx;
      ctx.moveTo(this.x + this.width / 2, this.y + this.height);
      ctx.lineTo(this.ball.x, this.ball.y);
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }, {
    key: "think",
    value: function think() {
      this.dna.genes[this.index] == 0 ? this.left() : this.right();
    }
  }, {
    key: "left",
    value: function left() {
      this.x > 0 ? this.x -= this.x_step : [];
    }
  }, {
    key: "right",
    value: function right() {
      this.x + this.width < canvasWidth ? this.x += this.x_step : [];
    }
  }, {
    key: "changeColor",
    value: function changeColor() {
      var red = Math.floor(Math.random() * 3) * 127;
      var green = Math.floor(Math.random() * 3) * 127;
      var blue = Math.floor(Math.random() * 3) * 127;
      return "rgba(".concat(red, ", ").concat(green, ", ").concat(blue, ", ").concat(Math.random());
    }
  }, {
    key: "control",
    value: function control(_ref) {
      var key = _ref.key;

      switch (key) {
        case 'a':
          this.left();
          break;

        case 'd':
          this.right();
          break;
      }
    }
  }, {
    key: "getDNA",
    value: function getDNA() {
      return this.dna;
    }
  }, {
    key: "start",
    value: function start() {
      if (!this.newGenes) this.dna.creatingGenes(this.lifeSpan);
      this.drawPlayer(); //this.drawBallLine();

      this.ball.start();
      this.player_collision();
      this.walls_collision();
      this.think();
      this.score++;
      this.lifeSpan--;
      this.index++;
    }
  }]);

  return Player;
}();

var _default = Player;
exports.default = _default;
},{"../View/Settings.view":"View/Settings.view.js","../utils/getRandomNumber.util":"utils/getRandomNumber.util.js"}],"C:/Users/papryk/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64529" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/papryk/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Models/Player.model.js"], null)
//# sourceMappingURL=/Player.model.4427dac8.js.map