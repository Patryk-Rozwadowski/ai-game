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
    this.bestPair = [];
    this.bestPlayer = '';
    this.bestFitness = '';
    this.fitness = '';
    this.generation = 1;
    this.avgFitness = '';
    this.matingPool = [];

    this.interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (this.players.length === 0) {
        this.avgFitness = 0;
        let temporaryScores = [];
        this.deadPlayers.map(player => temporaryScores.push(player.score));
        this.bestPlayer = Math.max.apply(Math, temporaryScores);

        this.calculateFitness();
        this.calculateBestFitness();
        this.nextGeneration();
      } else {
        this.players.map((player, i) => {
          debugger

          if (player.dead === true) {
            this.players.splice(i, 1);
            this.deadPlayers.push(player);
          }

          player.start();
          this.players.map(player => player.think());
          this.info_params();

        });
      }


    });
  }

  calculateBestFitness() {
    debugger;
    this.bestPair = [];
    this.bestFitness = 0;

    for (let player of this.deadPlayers) {
      if (player.fitness > this.bestFitness) {
        this.bestFitness = player.fitness;
      }
    }
  }

  nextGeneration() {
    console.log('Next generation');
    this.generation++;
    for (let i = 0; i < this.total; i++) {
      const parentA = this.acceptReject();
      const parentB = this.acceptReject();
      this.players[i] = new Player(this.bestFitness);
      this.players[i].changeColor();
    }
  }

  acceptReject() {
    let escapeLoop = 0;
    while (true) {
      const index = Math.floor(Math.random() * this.total);
      const partner = this.deadPlayers[index];
      const r = Math.floor(Math.random() * this.bestFitness + 1);
      if (r < partner.fitness) { return new Player(partner.fitness);}
      escapeLoop++;
      if (escapeLoop > 500) { return}
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
      player.fitness = (player.score / scoreSum) + 0.01;
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
      <h2>${this.bestPlayer ? `Best score: ${this.bestPlayer}` : 'No best player yet!'}</h2>
    `;

    deadPlayersList.innerHTML = `
			<h2>Dead players: ${this.deadPlayers.length}</h2>
			${this.deadPlayers.map(player => `<li>${player.id}</li>`)}
		`;

    nnInfo.innerHTML = `
    		<h2>Generations:</h2>
    		<p>${this.generation}</p>
    		<p>${this.avgFitness}</p>
    `;
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