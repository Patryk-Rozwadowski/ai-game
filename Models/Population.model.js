import Player from './Player.model';
import { DNA } from './DNA.model';
import Ball from './Ball.model';
import { getRandomNumber } from '../utils/getRandomNumber.util';

class Population {
  constructor() {
    this.total = 50;

    // Fitness
    this.avgFitness = 0;
    this.bestPlayer = { fitness: 0 };
    this.worstFitness = 0;

    // GA params
    this.mutationRatio = 0.05;
    this.generation = 1;

    // Population params
    this.matingPool = [];
    this.deadPopulation = [];
    this.population = [];
    this.populationHistory = [];

    // MISC
    this.mostBallHit = 0;
    for (let i = 0; i < this.total; i++) {
      this.population[i] = new Player(new DNA(), false, new Ball());
    }
  }

  calculatePopulation() {
    this._calculateFitness();
    this._getMaxFitness();
    this._getWorstFitness();
    this._getAvgFitnessPerGen();
    this._setMostBallHit();
    this._nextGeneration();
  }

  populationLearning() {
    if (this.population) {
      this.population.map((player, i) => {
        let deathPenalty = this.population.length;
        player.start();
        if (player.dead === true) {
          player.deathPenalty = deathPenalty;
          this.population.splice(i, 1);
          this.deadPopulation.push(player);
        }
      });
    }
  }

  fillHistory() {
    console.log(this.populationHistory);
    this.populationHistory.push({
      Generation: this.generation,
      Most_Ball_Hit: this.mostBallHit,
      Best_Fitness: this.bestPlayer.fitness,
      Worst_Fitness: this.worstFitness,
      Average_Fitness: this.avgFitness,
      Mutation_Ratio: this.mutationRatio,
    });
  }

  _nextGeneration() {
    console.log('Next generation');
    this.generation++;
    for (let i = 0; i < this.total; i++) {
      let parentA = this._acceptReject();
      let parentB = this._acceptReject();
      if (!parentA) parentA = this.deadPopulation[getRandomNumber(this.total)];
      if (!parentB) parentB = this.deadPopulation[getRandomNumber(this.total)];
      const parentAGenes = parentA.getDNA();
      const parentBGenes = parentB.getDNA();

      const childDNA = parentAGenes.crossOver(parentBGenes);
      childDNA._mutate(this.mutationRatio);
      this.population[i] = new Player(childDNA, true, new Ball());
    }
  }

  pickMatingPool() {
    this.matingPool = [];
    for (let i = 0; i < this.total; i++) {
      let n = this.deadPopulation[i].fitness;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.deadPopulation[j]);
      }
    }
  }

  _getMaxFitness() {
    for (let player of this.deadPopulation) {
      if (player.fitness > this.bestPlayer.fitness) {
        this.bestPlayer = player;
      }
    }
  }

  _getAvgFitnessPerGen() {
    let fitnessSum = 0;
    for (let i = 0; i < this.deadPopulation.length; i++) {
      fitnessSum += this.deadPopulation[i].fitness;
    }
    this.avgFitness = fitnessSum / this.deadPopulation.length;
  }

  _getWorstFitness() {
    let fitnessArr = [];

    for (let i = 0; i < this.deadPopulation.length; i++) {
      fitnessArr.push(this.deadPopulation[i].fitness);
    }
    this.worstFitness = Math.min(...fitnessArr);
    console.log(this.worstFitness);
  }

  _calculateFitness() {
    for (let player of this.deadPopulation) {
      player.calcFitness();
    }
  }

  _acceptReject() {
    let escapeLoop = 0;
    while (true) {
      const partner = this.deadPopulation[getRandomNumber(this.total)];
      const r = Math.floor(Math.random() * this.bestPlayer.fitness);
      if (r < partner.fitness) {
        return partner;
      }
      escapeLoop++;
      if (escapeLoop > 5000) {
        return;
      }
    }
  }

  _setMostBallHit() {
    for (let player of this.deadPopulation) {
      if (player.ballHit > this.mostBallHit) {
        this.mostBallHit = player.ballHit;
      }
    }
  }
}

export default Population;
