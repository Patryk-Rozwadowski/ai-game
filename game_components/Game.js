import Player from './Player';
import Population from '../Population';

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
    this.deadPlayers = [];
    this.generation = 1;
    this.game = new Population();

    this.interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (this.game.population.length === 0) {

      } else {
        this.game.population.map((player, i) => {
          if (player.dead === true) {
            this.game.population.splice(i, 1);
            this.deadPlayers.push(player);
          }
          player.start();
        });
      }

    });
  }

  clearGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  stop() {
    clearInterval(this.interval);
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