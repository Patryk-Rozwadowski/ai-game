import Population from '../Models/Population.model';
import {Settings} from '../View/Settings.view';
import {WriteGameInfo} from '../View/GameInfo.view';
import {showElement} from '../utils/showBtn.util';

const csvButton = document.getElementById('save-csv-btn');
const startGameBtn = document.getElementById('startGame');
const pauseGameBtn = document.getElementById('pauseGameBtn');
const resumeGameBtn = document.getElementById('resumeGameBtn');
const controlButtons = document.getElementById('controlButtons');

class Game {

  constructor() {
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
            this._whenPopulationIsNotEmpty();
            this._whenPopulationIsEmpty();
          }
        }, this.learningSpeed,
    );
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  start() {
    this.interval;
    this.gameStarted = true;
  }

  _whenPopulationIsNotEmpty() {
    this.game.populationLearning();
  }

  _whenPopulationIsEmpty() {
    if (this.game.population.length === 0) {
      this.game.calculatePopulation();
      this.game.fillHistory();

      if (this.game.populationHistory.length > 0) showElement([csvButton]);
      this.game.deadPopulation = [];
    }
  }

  _getProgressTimeAndDate() {
    const time = new Date();
    const date = new Date();
    return `${date.getFullYear()}.${date.getMonth() +
    1}.${date.getDate()} ${time.getHours()}:${time.getMinutes()}`;
  }

  _saveToCsv() {
    let csvRows = Object.keys(this.game.populationHistory[0]).join(';');
    let csvCols = '';

    for (let record of this.game.populationHistory) {
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

    // DATE HOURS:MINUTES MR-(Mutation Rate) GN-(Generation)
    a.setAttribute('download',
        `${this._getProgressTimeAndDate()} MR-${this.game.mutationRatio} GN-${this.game.generation}.csv`);
    a.click();
  }
}

startGameBtn.addEventListener('click', () => {
  const game = new Game;

  game.start();
  controlPanel(game.gameStarted, game.populationHistory);

  pauseGameBtn.addEventListener('click', () => game.pause());
  resumeGameBtn.addEventListener('click', () => game.resume());
  csvButton.addEventListener('click', () => game._saveToCsv());
});

const controlPanel = (gameStarted) => {
  if (gameStarted) showElement([controlButtons])([startGameBtn]);
};

