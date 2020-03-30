import Population from '../Models/Population.model';
import {Settings} from '../View/Settings.view';
import {WriteGameInfo} from '../View/GameInfo.view';

const csvButton = document.getElementById('save-csv-btn');
const startGameBtn = document.getElementById('startGame');
const pauseGameBtn = document.getElementById('pauseGameBtn');
const resumeGameBtn = document.getElementById('resumeGameBtn');
const controlButtons = document.getElementById('controlButtons');

class Game {

  constructor() {
    this.generation = 1;
    this.history = [];
    this.game = new Population();
    this.gameStarted = true;
    this.learningSpeed = 5;
    const {canvasWidth, canvasHeight} = Settings;
    this.interval = setInterval(() => {
          if (!this.isPaused) {
            Settings.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            WriteGameInfo(
                this.game.generation,
                this.game.population,
                this.game.bestPlayer,
                this.game.worstFitness,
                this.game.avgFitness,
                this.game.mostBallHit,
                this.game.mutationRatio,
                this.game.deadPopulation,
            );
            this.whenPopulationIsNotEmpty();
            this.whenPopulationIsEmpty();
          }
        }, this.learningSpeed,
    );
  }

  stop() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  start() {
    this.interval;
    this.gameStarted = true;
  }

  whenPopulationIsNotEmpty() {
    if (this.game.population) {
      this.game.population.map((player, i) => {
        let deathPenalty = this.game.population.length;
        player.start();
        if (player.dead === true) {
          player.deathPenalty = deathPenalty;
          this.game.population.splice(i, 1);
          this.game.deadPopulation.push(player);
        }
      });
    }
  }

  whenPopulationIsEmpty() {
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
  }

  getProgressTimeAndDate() {
    const time = new Date();
    const date = new Date();
    const {
      getFullYear,
      getMonth,
      getDate,
    } = date;
    const {
      getHours,
      getMinutes,
      getSeconds,
    } = time;
    return `${getFullYear()}.${getMonth() + 1}.${getDate()} ${getHours()}-${getMinutes()}-${getSeconds()}`;
  }

  saveToCsv() {
    let csvRows = Object.keys(this.history[0]).join(';');
    let csvCols = '';
    for (let record of this.history) {
      const {
        Generation,
        Most_Ball_Hit,
        Best_Fitness,
        Worst_Fitness,
        Average_Fitness,
        Mutation_Ratio,
      } = record;
      csvCols += `\n${Generation};${Most_Ball_Hit};${Best_Fitness};${Worst_Fitness};${Average_Fitness};${Mutation_Ratio}`;
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

startGameBtn.addEventListener('click', () => {
  const game = new Game;

  game.start();
  controlPanel(game.gameStarted);

  csvButton.addEventListener('click', () => game.saveToCsv());
  pauseGameBtn.addEventListener('click', () => game.stop());
  resumeGameBtn.addEventListener('click', () => game.resume());
});

const controlPanel = (gameStarted) => {
  if (gameStarted) {
    controlButtons.style.display = 'block';
    startGameBtn.style.display = 'none';
  }
};

