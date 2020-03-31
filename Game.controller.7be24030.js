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
    this.x_step = 15;
    this.height = 15;
    this.width = 180;
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
      this.fitness = this.score * this.ballHit / this.deathPenalty;
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
},{"../View/Settings.view":"View/Settings.view.js","../utils/getRandomNumber.util":"utils/getRandomNumber.util.js"}],"Models/DNA.model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DNA = void 0;

var _getRandomNumber = require("../utils/getRandomNumber.util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DNA = /*#__PURE__*/function () {
  function DNA(length) {
    _classCallCheck(this, DNA);

    if (length) {
      this.genes = new Array(length);
    } else {
      this.genes = [];
    }
  }

  _createClass(DNA, [{
    key: "creatingGenes",
    value: function creatingGenes(lifeSpan) {
      for (var i = 0; i < lifeSpan; i++) {
        this.genes[i] = this.applyMutate();
      }
    }
  }, {
    key: "crossOver",
    value: function crossOver(partner) {
      var child = new DNA(this.genes.length);
      var midpoint = (0, _getRandomNumber.getRandomNumber)(this.genes.length);

      for (var i = 0; i < this.genes.length; i++) {
        if (i > midpoint) child.genes[i] = this.genes[i];else if (i < midpoint) child.genes[i] = partner.genes[i];
      }

      return child;
    }
  }, {
    key: "applyMutate",
    value: function applyMutate() {
      return (0, _getRandomNumber.getRandomNumber)(2);
    }
  }, {
    key: "mutate",
    value: function mutate(rate) {
      for (var i = 0; i < this.genes.length; i++) {
        if ((0, _getRandomNumber.getRandomNumber)(1) < rate) {
          this.genes[i] = this.applyMutate();
        }
      }
    }
  }]);

  return DNA;
}();

exports.DNA = DNA;
},{"../utils/getRandomNumber.util":"utils/getRandomNumber.util.js"}],"Models/Ball.model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Settings = require("../View/Settings.view");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball = /*#__PURE__*/function () {
  function Ball() {
    _classCallCheck(this, Ball);

    this.x = 500;
    this.y = _Settings.Settings.canvasHeight / 2;
    this.x_speed = 2;
    this.y_speed = -15;
    this.color = '';
    this.mass = this.ballRadius * this.ballRadius * this.ballRadius;
    this.ballRadius = 10;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw() {
      var ctx = _Settings.Settings.ctx;
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
},{"../View/Settings.view":"View/Settings.view.js"}],"Models/Population.model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Player = _interopRequireDefault(require("./Player.model"));

var _DNA = require("./DNA.model");

var _Ball = _interopRequireDefault(require("./Ball.model"));

var _getRandomNumber = require("../utils/getRandomNumber.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Population = /*#__PURE__*/function () {
  function Population() {
    _classCallCheck(this, Population);

    this.total = 100;
    this.matingPool = [];
    this.avgFitness = 0;
    this.bestPlayer = {
      fitness: 0
    };
    this.worstFitness = 0;
    this.generation = 1;
    this.mutationRatio = 0.05;
    this.mostBallHit = 0;
    this.deadPopulation = [];
    this.population = [];

    for (var i = 0; i < this.total; i++) {
      this.population[i] = new _Player.default(new _DNA.DNA(), false, new _Ball.default());
    }
  }

  _createClass(Population, [{
    key: "setMostBallHit",
    value: function setMostBallHit() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.deadPopulation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var player = _step.value;

          if (player.ballHit > this.mostBallHit) {
            this.mostBallHit = player.ballHit;
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
        if (!parentA) parentA = this.deadPopulation[(0, _getRandomNumber.getRandomNumber)(this.total)];
        if (!parentB) parentB = this.deadPopulation[(0, _getRandomNumber.getRandomNumber)(this.total)];
        var parentAGenes = parentA.getDNA();
        var parentBGenes = parentB.getDNA();
        var childDNA = parentAGenes.crossOver(parentBGenes);
        childDNA.mutate(this.mutationRatio);
        this.population[i] = new _Player.default(childDNA, true, new _Ball.default());
      }
    }
  }, {
    key: "pickMatingPool",
    value: function pickMatingPool() {
      this.matingPool = [];

      for (var i = 0; i < this.total; i++) {
        var n = this.deadPopulation[i].fitness;

        for (var j = 0; j < n; j++) {
          this.matingPool.push(this.deadPopulation[j]);
        }
      }
    }
  }, {
    key: "acceptReject",
    value: function acceptReject() {
      var escapeLoop = 0;

      while (true) {
        var partner = this.deadPopulation[(0, _getRandomNumber.getRandomNumber)(this.total)];
        var r = (0, _getRandomNumber.getRandomNumber)(this.bestPlayer.fitness);

        if (r < partner.fitness) {
          return partner;
        }

        escapeLoop++;

        if (escapeLoop > 5000) {
          return;
        }
      }
    }
  }, {
    key: "getMaxFitness",
    value: function getMaxFitness() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.deadPopulation[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var player = _step2.value;

          if (player.fitness > this.bestPlayer.fitness) {
            this.bestPlayer = player;
          }
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
    }
  }, {
    key: "getAvgFitnessPerGen",
    value: function getAvgFitnessPerGen() {
      var fitnessSum = 0;

      for (var i = 0; i < this.deadPopulation.length; i++) {
        fitnessSum += this.deadPopulation[i].fitness;
      }

      this.avgFitness = fitnessSum / this.deadPopulation.length;
    }
  }, {
    key: "getWorstFitness",
    value: function getWorstFitness() {
      var worstFitness = this.deadPopulation[0].fitness;

      for (var i = 0; i < this.deadPopulation.length; i++) {
        if (worstFitness < this.deadPopulation[i].fitness) this.worstFitness = this.deadPopulation[i].fitness;
      }
    }
  }, {
    key: "calculateFitness",
    value: function calculateFitness() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.deadPopulation[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var player = _step3.value;
          player.calcFitness();
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
    }
  }]);

  return Population;
}();

var _default = Population;
exports.default = _default;
},{"./Player.model":"Models/Player.model.js","./DNA.model":"Models/DNA.model.js","./Ball.model":"Models/Ball.model.js","../utils/getRandomNumber.util":"utils/getRandomNumber.util.js"}],"View/GameInfo.view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteGameInfo = void 0;
var populationInformation = document.getElementById('populationInformation');

var WriteGameInfo = function WriteGameInfo(generation, population, bestPlayer, worstFitness, avgFitness, mostBallHit, mutationRatio, deadPopulation) {
  var fitness = bestPlayer.fitness;
  populationInformation.innerHTML = "\n      <p class=\"h2\">Generation: ".concat(generation, "</p>\n      \n      <p class=\"h4\">").concat(bestPlayer ? "Best fitness: ".concat(fitness) : 'No best fitness yet!', "</p>\n      <p class=\"h4\">").concat(worstFitness ? "Worst fitness: ".concat(worstFitness) : 'No worst fitness yet!', "</h2>\n      <p class=\"h4\">").concat(avgFitness ? "Average fitness per generation: ".concat(avgFitness) : 'No average fitness yet!', "</h2>\n      <p class=\"h4\">").concat(mostBallHit ? "Most ball hit: ".concat(mostBallHit) : 'No best ball hit yet!', "</h2>\n      <p class=\"h4\">Mutation ratio: ").concat(mutationRatio * 100, "%</h2>\n      <p class=\"h2\">Alive population: ").concat(population.length, "</p>\n      <p class=\"h2\">Dead population: ").concat(deadPopulation.length, "</h2>\n    ");
};

exports.WriteGameInfo = WriteGameInfo;
},{}],"utils/showBtn.util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showElement = void 0;

var showElement = function showElement(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('el-hide');
    elements[i].classList.add('el-show');
  }

  return function (hideElements) {
    for (var _i = 0; _i < hideElements.length; _i++) {
      hideElements[_i].classList.remove('el-show');

      hideElements[_i].classList.add('el-hide');
    }
  };
};

exports.showElement = showElement;
},{}],"Controller/Game.controller.js":[function(require,module,exports) {
"use strict";

var _Population = _interopRequireDefault(require("../Models/Population.model"));

var _Settings = require("../View/Settings.view");

var _GameInfo = require("../View/GameInfo.view");

var _showBtn = require("../utils/showBtn.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var csvButton = document.getElementById('save-csv-btn');
var startGameBtn = document.getElementById('startGame');
var pauseGameBtn = document.getElementById('pauseGameBtn');
var resumeGameBtn = document.getElementById('resumeGameBtn');
var controlButtons = document.getElementById('controlButtons');

var Game = /*#__PURE__*/function () {
  function Game() {
    var _this = this;

    _classCallCheck(this, Game);

    this.generation = 1;
    this.populationHistory = [];
    this.game = new _Population.default();
    this.gameStarted = true;
    this.learningSpeed = 5;
    var canvasWidth = _Settings.Settings.canvasWidth,
        canvasHeight = _Settings.Settings.canvasHeight;
    this.interval = setInterval(function () {
      if (!_this.isPaused) {
        _Settings.Settings.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        (0, _GameInfo.WriteGameInfo)(_this.game.generation, _this.game.population, _this.game.bestPlayer, _this.game.worstFitness, _this.game.avgFitness, _this.game.mostBallHit, _this.game.mutationRatio, _this.game.deadPopulation);

        _this.whenPopulationIsNotEmpty();

        _this.whenPopulationIsEmpty();
      }
    }, this.learningSpeed);
  }

  _createClass(Game, [{
    key: "stop",
    value: function stop() {
      this.isPaused = true;
    }
  }, {
    key: "resume",
    value: function resume() {
      this.isPaused = false;
    }
  }, {
    key: "start",
    value: function start() {
      this.interval;
      this.gameStarted = true;
    }
  }, {
    key: "whenPopulationIsNotEmpty",
    value: function whenPopulationIsNotEmpty() {
      var _this2 = this;

      if (this.game.population) {
        this.game.population.map(function (player, i) {
          var deathPenalty = _this2.game.population.length;
          player.start();

          if (player.dead === true) {
            player.deathPenalty = deathPenalty;

            _this2.game.population.splice(i, 1);

            _this2.game.deadPopulation.push(player);
          }
        });
      }
    }
  }, {
    key: "whenPopulationIsEmpty",
    value: function whenPopulationIsEmpty() {
      if (this.game.population.length === 0) {
        this.game.calculateFitness();
        this.game.getMaxFitness();
        this.game.getWorstFitness();
        this.game.getAvgFitnessPerGen();
        this.game.setMostBallHit();
        this.game.nextGeneration();
        this.populationHistory.push({
          Generation: this.game.generation,
          Most_Ball_Hit: this.game.mostBallHit,
          Best_Fitness: this.game.bestPlayer.fitness,
          Worst_Fitness: this.game.worstFitness,
          Average_Fitness: this.game.avgFitness,
          Mutation_Ratio: this.game.mutationRatio
        });
        if (this.populationHistory.length > 0) (0, _showBtn.showElement)([csvButton]);
        this.game.deadPopulation = [];
      }
    }
  }, {
    key: "getProgressTimeAndDate",
    value: function getProgressTimeAndDate() {
      var time = new Date();
      var date = new Date();
      return "".concat(date.getFullYear(), ".").concat(date.getMonth() + 1, ".").concat(date.getDate(), " ").concat(time.getHours(), "-").concat(time.getMinutes(), "-").concat(time.getSeconds());
    }
  }, {
    key: "saveToCsv",
    value: function saveToCsv() {
      var csvRows = Object.keys(this.populationHistory[0]).join(';');
      var csvCols = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.populationHistory[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var record = _step.value;
          var Generation = record.Generation,
              Most_Ball_Hit = record.Most_Ball_Hit,
              Best_Fitness = record.Best_Fitness,
              Worst_Fitness = record.Worst_Fitness,
              Average_Fitness = record.Average_Fitness,
              Mutation_Ratio = record.Mutation_Ratio;
          csvCols += "\n".concat(Generation, ";").concat(Most_Ball_Hit, ";").concat(Best_Fitness, ";").concat(Worst_Fitness, ";").concat(Average_Fitness, ";").concat(Mutation_Ratio);
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

      var csvContent = [[csvRows], [csvCols]];
      var mimeType = 'text/csv;encoding:utf-8';
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([csvContent], {
        type: mimeType
      }));
      a.setAttribute('download', "".concat(this.getProgressTimeAndDate(), " progress session.csv"));
      a.click();
    }
  }]);

  return Game;
}();

startGameBtn.addEventListener('click', function () {
  var game = new Game();
  game.start();
  controlPanel(game.gameStarted, game.populationHistory);
  pauseGameBtn.addEventListener('click', function () {
    return game.stop();
  });
  resumeGameBtn.addEventListener('click', function () {
    return game.resume();
  });
  csvButton.addEventListener('click', function () {
    return game.saveToCsv();
  });
});

var controlPanel = function controlPanel(gameStarted) {
  if (gameStarted) (0, _showBtn.showElement)([controlButtons])([startGameBtn]);
};
},{"../Models/Population.model":"Models/Population.model.js","../View/Settings.view":"View/Settings.view.js","../View/GameInfo.view":"View/GameInfo.view.js","../utils/showBtn.util":"utils/showBtn.util.js"}],"C:/Users/papryk/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62447" + '/');

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
},{}]},{},["C:/Users/papryk/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Controller/Game.controller.js"], null)
//# sourceMappingURL=/Game.controller.7be24030.js.map