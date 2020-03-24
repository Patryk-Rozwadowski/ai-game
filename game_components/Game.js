import Population from '../Population';

const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

class Game {

  constructor() {
    this.deadPlayers = [];
    this.generation = 1;
    this.game = new Population();

    this.interval = setInterval(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (this.game.population.length === 0) {
            this.game.calculateFitness();
            this.game.getMaxFitness();
            this.game.nextGeneration();
            this.game.deadPopulation = [];
            this.game.info_params();
          }
          if (this.game.population) {
            this.game.population.map((player, i) => {
              if (player.dead === true || player.lifeSpan === 0) {
                this.game.population.splice(i, 1);
                this.game.deadPopulation.push(player);
                this.game.info_params();
              }
              player.start();

              //document.addEventListener('keydown', (e) => player.control(e))
            });
          }
        }, 1
    );
  }

  clearGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  stop() {
    clearInterval(this.interval);
  }

  start() {
    this.interval;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const newGame = new Game;
  newGame.start();
});

export default Game;