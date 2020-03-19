import Player from './Player';

const playerInfo = document.getElementById('playerInfo');
const deadPlayersList = document.getElementById('deadPlayersList');
const ballInfo = document.getElementById('ballInfo');
const gameInfo = document.getElementById('gameInfo');
const nnInfo = document.getElementById('nnInfo');
const bestPlayer = document.getElementById('bestPlayer');

const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;

class Game {

  constructor() {
    this.total = 3;
    this.players = [];
    this.deadPlayers = [];
    this.bestPlayer = '';
    this.fitness = '';
    this.generation = 1;
    this.avgFitness = '';
    this.interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.players.map((player, i) => {
        player.start();

        if (player.dead === true) {

          this.players.splice(i, 1);
          this.deadPlayers.push(player);
        }
      });

      if (this.players.length === 0) {
        this.avgFitness = 0;
        let temporaryScores = [];
        this.deadPlayers.map(player => temporaryScores.push(player.score));
        this.bestPlayer = Math.max.apply(Math, temporaryScores);

        this.calculateFitness();

        this.nextGeneration();
      }
      this.players.map(player => player.think());
      this.info_params();
    });
  }

  nextGeneration() {
    console.log('Next generation');
    this.generation++;
    for (let i = 0; i < this.total; i++) {
      this.players[i] = new Player;
      this.players[i].changeColor();
    }
  }

  calculateFitness() {
    debugger;
    let scoreSum = 0;
    let playersFitness = 0;

    for (let player of this.deadPlayers) {
      scoreSum += player.score;
    }

    for (let player of this.deadPlayers) {
      player.fitness = player.score / scoreSum;
      playersFitness += player.fitness;
    }

    this.avgFitness = playersFitness / this.deadPlayers.length;
  }

  clearGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  stop() {
    clearInterval(this.interval);
  }

  info_params() {
    playerInfo.innerHTML =
        `
				<h2>Live players: ${this.players.length}</h2>
						${this.players.map(player => `
							<li>Player id: ${player.id}</li>
							<li>Score: ${player.score}</li>
							<li>Player id: ${player.lifes}</li>
							<li>Player dead: ${player.dead}</li>
							`,
        )}
		`;

    bestPlayer.innerHTML = `
      <h2>${this.bestPlayer ? this.bestPlayer : 'No best player yet!'}</h2>
    `;

    deadPlayersList.innerHTML = `
			<h2>Dead players: ${this.deadPlayers.length}</h2>
			${this.deadPlayers.map(player => `<li>${player.id}</li>`)}
		`;

    // ballInfo.innerHTML = `
    // 		<h2>Ball params:</h2>
    // 		<p>Ball position X: ${this.ball.x}</p>
    // 		<p>Ball position Y: ${this.ball.y}</p>
    // 		<p>Ball speed: ${this.ball.y_speed}</p>
    // 		<p>Ball wall bounce: ${this.ball.x_speed}</p>
    //
    // `
    //
    // gameInfo.innerHTML = `
    // 		<h2>Game params:</h2>
    // 		<p>Lifes: ${this.lifes}</p>
    // `

    nnInfo.innerHTML = `
    		<h2>Generations:</h2>
    		<p>${this.generation}</p>
    		<p>${this.avgFitness}</p>
    `
  }

  start() {
    for (let i = 0; i < this.total; i++) {
      this.players[i] = new Player;
      this.players[i].changeColor();
    }
    this.interval;
    //document.addEventListener('keydown', (e) => this.player.control(e))
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const newGame = new Game;
  newGame.start();
});

export default Game;