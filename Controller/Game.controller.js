import Population from '../Models/Population.model';
import {Settings} from '../View/Settings.view';

const csvButton = document.getElementById('save-csv-btn');
class Game {

  constructor() {
    this.generation = 1;
    this.history = [];
    this.game = new Population();
    const {canvasWidth, canvasHeight} = Settings;
    this.interval = setInterval(() => {
          Settings.ctx.clearRect(0, 0,canvasWidth, canvasHeight);
          this.game.info_params();

          if (this.game.population.length === 0) {
            this.game.calculateFitness();
            this.game.getMaxFitness();
            this.game.getWorstFitness();
            this.game.getAvgFitnessPerGen();
            this.game.setMostBallHit();
            this.game.nextGeneration();

            this.history.push({
              Generation: this.game.generation,
              Most_Ball_Hit: this.game.mostBallHit,
              Best_Fitness: this.game.bestPlayer.fitness,
              Worst_Fitness: this.game.worstFitness,
              Average_Fitness: this.game.avgFitness,
              Mutation_Ratio: this.game.mutationRatio,
            });
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
        }, 1
    );
  }

  clearGame() {
    Settings.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  stop() {
    clearInterval(this.interval);
  }

  start() {
    this.interval;
    this.game.population.map(player => document.addEventListener('keydown', (e) => player.control(e)));
  }

  getProgressTimeAndDate() {
    const time = new Date();
    const date = new Date();
    return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()} ${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`
  }

  saveToCsv() {
    let csvRows = Object.keys(this.history[0]).join(';');
    let csvCols = '';
    for (let record of this.history) {
      csvCols += `\n${record.Generation};${record.Most_Ball_Hit};${record.Best_Fitness};${record.Worst_Fitness};${record.Average_Fitness};${record.Mutation_Ratio}`;
    }
    let csvContent = [
      [csvRows],
      [csvCols],
    ];
    const mimeType = 'text/csv;encoding:utf-8';
    const a = document.createElement('a');
    a.href = URL.createObjectURL((new Blob([csvContent], {
      type: mimeType,
    })));
    a.setAttribute('download', `${this.getProgressTimeAndDate()} progress session.csv`);
    a.click();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game;
  csvButton.addEventListener('click', () => game.saveToCsv());
  game.start();
});