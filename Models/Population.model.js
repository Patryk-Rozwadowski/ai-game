import Player from './Player.model';
import {DNA} from './DNA.model';
import Ball from './Ball.model';
import {getRandomNumber} from '../utils/getRandomNumber.util';

class Population {
  constructor() {
    this.total = 100;

    this.matingPool = [];
    this.avgFitness = 0;
    this.bestPlayer = {fitness: 0};
    this.worstFitness = 0;
    this.generation = 1;
    this.mutationRatio = 0.05;
    this.mostBallHit = 0;

    this.deadPopulation = [];
    this.population = [];
    for (let i = 0; i < this.total; i++) {
      this.population[i] = new Player(new DNA(), false, new Ball());
    }
  }

  setMostBallHit() {
    for (let player of this.deadPopulation) {
      if (player.ballHit > this.mostBallHit) {
        this.mostBallHit = player.ballHit;
      }
    }
  }

  nextGeneration() {
    console.log('Next generation');
    this.generation++;
    for (let i = 0; i < this.total; i++) {
      let parentA = this.acceptReject();
      let parentB = this.acceptReject();
      if(!parentA) parentA = this.deadPopulation[getRandomNumber(this.total)];
      if(!parentB) parentB = this.deadPopulation[getRandomNumber(this.total)];
      const parentAGenes = parentA.getDNA();
      const parentBGenes = parentB.getDNA();


      const childDNA = parentAGenes.crossOver(parentBGenes);
      childDNA.mutate(this.mutationRatio);
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

  acceptReject() {
    let escapeLoop = 0;
    while (true) {
      const partner = this.deadPopulation[getRandomNumber(this.total)];
      const r = Math.floor(Math.random() * this.bestPlayer.fitness); //getRandomNumber(this.bestPlayer.fitness);
      if (r < partner.fitness) {
        return partner;
      }
      escapeLoop++;
      if (escapeLoop > 5000) { return;}
    }
  }

  getMaxFitness() {
    for (let player of this.deadPopulation) {
      if (player.fitness > this.bestPlayer.fitness) {
        this.bestPlayer = player;
      }
    }
  }

  getAvgFitnessPerGen() {
    let fitnessSum = 0;
    for(let i = 0; i < this.deadPopulation.length; i++) {
      fitnessSum += this.deadPopulation[i].fitness;
    }
    this.avgFitness = fitnessSum / this.deadPopulation.length;
  }

  getWorstFitness() {
    let worstFitness = this.deadPopulation[0].fitness;
    for (let i = 0; i < this.deadPopulation.length; i++) {
      if (worstFitness < this.deadPopulation[i].fitness) this.worstFitness = this.deadPopulation[i].fitness;
    }
  }

  calculateFitness() {
    for (let player of this.deadPopulation) {
      player.calcFitness();
    }
  }
}

export default Population;