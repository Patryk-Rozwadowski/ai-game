import Population from '../GA_components/Population';

const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

class Game {
  constructor() {
    this.generation = 1;
    this.game = new Population();

    this.interval = setInterval(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          this.game.info_params();

          if (this.game.population.length === 0) {
            this.game.calculateFitness();
            this.game.getMaxFitness();
            this.game.getWorstFitness();
            this.game.getAvgFitnessPerGen();
            this.game.setMostBallHit();
            this.game.nextGeneration();
            this.game.deadPopulation = [];
          }
          if (this.game.population) {
            this.game.population.map((player, i) => {
              let deathPenalty = this.game.population.length;
              if (player.dead === true || player.lifeSpan === 0) {
                player.deathPenalty = deathPenalty;
                this.game.population.splice(i, 1);
                this.game.deadPopulation.push(player);
              }
              player.start();
            });
          }
        }, 10,
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
    this.game.population.map(player => document.addEventListener('keydown', (e) => player.control(e)));
  }

  saveToCsv() {
    debugger
    //this.game.population.map(player => )
    const arr = [1,2,3,4,5,6,7,8];
    const rows = ['player', 'fitness', 'best fitness', 'worst fitness', 'average fitness', 'ball hit'];
    var encodedUri = encodeURI(rows);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }
}

const csvButton = document.getElementById('save-csv-btn');


document.addEventListener('DOMContentLoaded', () => {
  const game = new Game;
  csvButton.addEventListener('click', () => game.saveToCsv());
  game.start();
});

export default Game;