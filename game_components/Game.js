import Population from '../Population';

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
            /// next generation
            console.log('next gen');
            this.game.calculateFitness();
            this.game.getMaxFitness();
            this.game.pickMatingPool();
            this.game.nextGeneration();

          }
          if (this.game.population) {
            this.game.population.map((player, i) => {
              if (player.dead === true) {
                this.game.population.splice(i, 1);
                this.game.deadPopulation.push(player);
              }
              player.start();
              this.game.info_params();
              document.addEventListener('keydown', (e) => player.control(e))
            });
          }
        }, 10
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