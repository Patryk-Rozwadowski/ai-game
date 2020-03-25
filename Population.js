import DNA from './DNA';
import Player from './game_components/Player';
import Ball from './game_components/Ball';

const playerInfo = document.getElementById('playerInfo');
const deadPlayersList = document.getElementById('deadPlayersList');
const ballInfo = document.getElementById('ballInfo');
const gameInfo = document.getElementById('gameInfo');
const nnInfo = document.getElementById('nnInfo');
const populationInformation = document.getElementById('populationInformation');

class Population {
  constructor() {

    this.matingPool = [];
    this.avgFitness = 0;

    this.bestFitness = 0;
    this.worstFitness = 0;
    this.generation = 1;
    this.total = 355;

    this.deadPopulation = [];
    this.population = [];
    this.mostBallHit = 0;
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

  getMostBallHit() {
    return this.mostBallHit;
  }

  nextGeneration() {
    console.log('Next generation');
    this.generation++;
    for (let i = 0; i < this.total; i++) {
      const parentA = this.acceptReject();
      const parentB = this.acceptReject();

      const parentAGenes = parentA.getDNA();
      const parentBGenes = parentB.getDNA();

      const childDNA = parentAGenes.crossOver(parentBGenes);
      childDNA.mutate(0.01);
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
      const index = Math.floor(Math.random() * this.total);

      const partner = this.deadPopulation[index];
      const r = Math.floor(Math.random() * this.bestFitness);
      if (r < partner.fitness) {
        return partner;
      }

      escapeLoop++;
      if (escapeLoop > 1000) { return;}
    }
  }

  getMaxFitness() {
    for (let player of this.deadPopulation) {
      if (player.fitness > this.bestFitness) {
        this.bestFitness = player.fitness;
      }
    }
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

  info_params() {
    playerInfo.innerHTML = `
        <h2>Generations: ${this.generation}</h2>
				<h2>Alive population: ${this.population.length}</h2>
		`;
    populationInformation.innerHTML = `
      <h2>${this.bestFitness ? `Best fitness: ${this.bestFitness}` : 'No best fitness yet!'}</h2>
      <h2>${this.bestFitness ? `Worst fitness: ${this.worstFitness}` : 'No best worst yet!'}</h2>
      <h2>${this.mostBallHit ? `Most ball hit: ${this.mostBallHit}` : 'No best ball hit yet!'}</h2>
    `;

    deadPlayersList.innerHTML = `
			<h2>Dead players: ${this.deadPopulation.length}</h2>
			
		`;
    // ${this.deadPopulation.map(player => `
    //         <li>${player.id}</li>
    // <li>Fitness: ${player.fitness}</li>
    // <li>Score: ${player.score}</li>
    //     `)}
  }

}

export default Population;