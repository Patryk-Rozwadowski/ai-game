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
})({"game_components/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.getElementById('gameContainer');
var ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 900;

var Ball = /*#__PURE__*/function () {
  function Ball() {
    _classCallCheck(this, Ball);

    this.x = 600 + Math.floor(Math.random() * 100);
    this.y = canvas.height / 2 + Math.floor(Math.random() * 100);
    this.x_speed = 1;
    this.y_speed = -10;
    this.color = '';
    this.mass = this.ballRadius * this.ballRadius * this.ballRadius;
    this.ballRadius = 10;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "movement",
    value: function movement() {
      this.x += this.x_speed;
      this.y += this.y_speed;
    }
  }, {
    key: "start",
    value: function start() {
      this.draw();
      this.movement();
    }
  }]);

  return Ball;
}();

var _default = Ball;
exports.default = _default;
},{}],"game_components/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Ball = _interopRequireDefault(require("./Ball"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.getElementById('gameContainer');
var ctx = canvas.getContext('2d');

var Player = /*#__PURE__*/function () {
  function Player(dna) {
    _classCallCheck(this, Player);

    this.id = Math.random();
    this.dna = dna;
    debugger;
    this.x = this.dna.genes[0];
    this.y = canvas.height - 25;
    this.x_step = 10;
    this.height = 15;
    this.width = canvas.width / 7;
    this.color = this.changeColor();
    this.dead = false;
    this.ball = new _Ball.default();
    this.score = 0;
  }

  _createClass(Player, [{
    key: "walls_collision",
    value: function walls_collision() {
      var ROOF = this.ball.y + this.ball.y_speed - this.ball.ballRadius < 0;
      var RIGHT_WALL = this.ball.x + this.ball.x_speed + this.ball.ballRadius > canvas.width;
      var LEFT_WALL = this.ball.x + this.ball.x_speed - this.ball.ballRadius < 0;
      var GROUND = this.ball.y + this.ball.y_speed + this.ball.ballRadius > canvas.height;

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
            console.log("remove player ".concat(this.id, " from game"));
          }

      }
    }
  }, {
    key: "player_collision",
    value: function player_collision() {
      if (this.ball.y + this.ball.y_speed + this.ball.ballRadius > this.y && this.ball.x + this.ball.ballRadius < this.x + this.width && this.x < this.ball.x + this.ball.ballRadius) {
        this.ball.y_speed = -this.ball.y_speed;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      this.ball.color = this.color;
    }
  }, {
    key: "update",
    value: function update() {
      ctx.rect(this.x, this.y, this.width, this.height);
    }
  }, {
    key: "left",
    value: function left() {
      this.x > 0 ? this.x -= this.x_step : null;
    }
  }, {
    key: "right",
    value: function right() {
      this.x + this.x_step + this.width <= canvas.width ? this.x += this.x_step : null;
    }
  }, {
    key: "changeColor",
    value: function changeColor() {
      var red = Math.floor(Math.random() * 3) * 127;
      var green = Math.floor(Math.random() * 3) * 127;
      var blue = Math.floor(Math.random() * 3) * 127;
      return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }
  }, {
    key: "control",
    value: function control(_ref) {
      var key = _ref.key,
          type = _ref.type;

      switch (key) {
        case 'a':
          this.left();
          break;

        case 'd':
          this.x + this.x_step + this.width <= canvas.width ? this.x += this.x_step : console.log('right stop');
          break;
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.draw();
      this.ball.start();
      this.player_collision();
      this.walls_collision();
      this.score++;
    }
  }]);

  return Player;
}();

var _default = Player;
exports.default = _default;
},{"./Ball":"game_components/Ball.js"}],"DNA.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DNA = /*#__PURE__*/function () {
  function DNA(total) {
    _classCallCheck(this, DNA);

    this.genes = [];
    this.fitness = 0;
    this.genes = this.randomCoords();
  }

  _createClass(DNA, [{
    key: "randomCoords",
    value: function randomCoords() {
      var x = Math.floor(Math.random() * 800);
      var lifes = 1;
      return [x, lifes];
    }
  }]);

  return DNA;
}();

var _default = DNA;
exports.default = _default;
},{}],"Population.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DNA = _interopRequireDefault(require("./DNA"));

var _Player = _interopRequireDefault(require("./game_components/Player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Population = /*#__PURE__*/function () {
  function Population() {
    _classCallCheck(this, Population);

    this.matingPool = [];
    this.avgFitness = '';
    this.bestPlayer = '';
    this.bestFitness = '';
    this.generation = '';
    this.total = 2;
    this.population = [];

    for (var i = 0; i < this.total; i++) {
      this.population[i] = new _Player.default(new _DNA.default());
    }
  }

  _createClass(Population, [{
    key: "calculateBestFitness",
    value: function calculateBestFitness() {
      this.bestPair = [];
      this.bestFitness = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.deadPlayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var player = _step.value;

          if (player.fitness > this.bestFitness) {
            this.bestFitness = player.fitness;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "nextGeneration",
    value: function nextGeneration() {
      console.log('Next generation');
      this.generation++;

      for (var i = 0; i < this.total; i++) {
        var parentA = this.acceptReject();
        var parentB = this.acceptReject();
        this.players[i] = new _Player.default(this.bestFitness);
        this.players[i].changeColor();
      }
    }
  }, {
    key: "calculateFitness",
    value: function calculateFitness() {
      debugger;
      var scoreSum = 0;
      var playersFitness = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.deadPlayers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var player = _step2.value;
          scoreSum += player.score;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.deadPlayers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _player = _step3.value;
          _player.fitness = _player.score / scoreSum + 0.01;
          playersFitness += _player.fitness;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this.avgFitness = playersFitness / this.deadPlayers.length;
    }
  }, {
    key: "acceptReject",
    value: function acceptReject() {
      var escapeLoop = 0;

      while (true) {
        var index = Math.floor(Math.random() * this.total);
        var partner = this.deadPlayers[index];
        var r = Math.floor(Math.random() * this.bestFitness + 1);

        if (r < partner.fitness) {
          return new _Player.default(partner.fitness);
        }

        escapeLoop++;

        if (escapeLoop > 500) {
          return;
        }
      }
    }
  }, {
    key: "info_params",
    value: function info_params() {
      playerInfo.innerHTML = "\n\t\t\t\t<h2>Live players: ".concat(this.players.length, "</h2>\n\t\t\t\t\t\t").concat(this.players.map(function (player) {
        return "\n\t\t\t\t\t\t\t<li>Player id: ".concat(player.id, "</li>\n\t\t\t\t\t\t\t<li>Score: ").concat(player.score, "</li>\n\t\t\t\t\t\t\t<li>Player id: ").concat(player.lifes, "</li>\n\t\t\t\t\t\t\t<li>Player dead: ").concat(player.dead, "</li>\n\t\t\t\t\t\t\t");
      }), "\n\t\t");
      bestPlayer.innerHTML = "\n      <h2>".concat(this.bestPlayer ? "Best score: ".concat(this.bestPlayer) : 'No best player yet!', "</h2>\n    ");
      deadPlayersList.innerHTML = "\n\t\t\t<h2>Dead players: ".concat(this.deadPlayers.length, "</h2>\n\t\t\t").concat(this.deadPlayers.map(function (player) {
        return "<li>".concat(player.id, "</li>");
      }), "\n\t\t");
      nnInfo.innerHTML = "\n    \t\t<h2>Generations:</h2>\n    \t\t<p>".concat(this.generation, "</p>\n    \t\t<p>").concat(this.avgFitness, "</p>\n    ");
    }
  }]);

  return Population;
}();

var _default = Population;
exports.default = _default;
},{"./DNA":"DNA.js","./game_components/Player":"game_components/Player.js"}],"game_components/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Player = _interopRequireDefault(require("./Player"));

var _Population = _interopRequireDefault(require("../Population"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var playerInfo = document.getElementById('playerInfo');
var deadPlayersList = document.getElementById('deadPlayersList');
var ballInfo = document.getElementById('ballInfo');
var gameInfo = document.getElementById('gameInfo');
var nnInfo = document.getElementById('nnInfo');
var bestPlayer = document.getElementById('bestPlayer');
var canvas = document.getElementById('gameContainer');
var ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;

var Game = /*#__PURE__*/function () {
  function Game() {
    var _this = this;

    _classCallCheck(this, Game);

    this.deadPlayers = [];
    this.generation = 1;
    this.game = new _Population.default();
    this.interval = setInterval(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (_this.game.population.length === 0) {} else {
        _this.game.population.map(function (player, i) {
          if (player.dead === true) {
            _this.game.population.splice(i, 1);

            _this.deadPlayers.push(player);
          }

          player.start();
        });
      }
    });
  }

  _createClass(Game, [{
    key: "clearGame",
    value: function clearGame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.interval);
    }
  }, {
    key: "start",
    value: function start() {
      for (var i = 0; i < this.total; i++) {
        this.players[i] = new _Player.default();
        this.players[i].changeColor();
      }

      this.interval; //document.addEventListener('keydown', (e) => this.player.control(e))
    }
  }]);

  return Game;
}();

document.addEventListener('DOMContentLoaded', function () {
  var newGame = new Game();
  newGame.start();
});
var _default = Game;
exports.default = _default;
},{"./Player":"game_components/Player.js","../Population":"Population.js"}],"C:/Users/papryk/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53455" + '/');

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
},{}]},{},["C:/Users/papryk/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","game_components/Game.js"], null)
//# sourceMappingURL=/Game.eb98264e.js.map