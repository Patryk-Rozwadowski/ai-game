import DNA from './DNA';
import Player from './game_components/Player';
import Ball from './game_components/Ball';

const playerInfo = document.getElementById('playerInfo');
const deadPlayersList = document.getElementById('deadPlayersList');
const ballInfo = document.getElementById('ballInfo');
const gameInfo = document.getElementById('gameInfo');
const nnInfo = document.getElementById('nnInfo');
const bestPlayer = document.getElementById('bestPlayer');

class Population {
  constructor() {

    this.matingPool = [];
    this.avgFitness = 0;
    this.bestPlayer = 0;
    this.bestFitness = 0;
    this.generation = 1;
    this.total = 15;

    this.deadPopulation = [];
    this.population = [];
    for (let i = 0; i < this.total; i++) {
      this.population[i] = new Player(new DNA(), false, new Ball());
    }
  }

  nextGeneration() {
    console.log('Next generation');
    this.generation++;
    for(let i = 0; i < this.total; i++) {
      let a = Math.floor(Math.random() * this.matingPool.length);
      let b = Math.floor(Math.random() * this.matingPool.length);
      debugger
      const parentA = this.matingPool[a];
      const parentB = this.matingPool[b];

      if(parentA.id === parentB.id) {
        while (parentA.id !== parentB.id) {
          parentA[Math.floor(Math.random() * this.matingPool.length)];
        }
        return parentA;
      }

      if (parentA.id === parentB.id) {
        return parentA[a];
      }

      const parentAGenes = parentA.getDNA();
      const parentBGenes = parentB.getDNA();

      const childDNA = parentAGenes.crossOver(parentBGenes);
      childDNA.mutate(0.01);
      this.population[i] = new Player(childDNA, true, new Ball());
    }
  }

  pickMatingPool() {
    this.matingPool = [];
    let bestFitness = this.bestFitness;
    for (let i = 0; i < this.total; i++) {

      debugger
      let n = this.deadPopulation[i].fitness;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.deadPopulation[j]);
      }
    }
  }

  getMaxFitness() {
    for (let player of this.deadPopulation) {
      if (player.fitness > this.bestFitness) {
        this.bestFitness = player.fitness;
      }
    }
  }

  calculateFitness() {
    for (let player of this.deadPopulation) {
      player.calcFitness();
    }
  }

  acceptReject() {
    let escapeLoop = 0;
    while (true) {
      const index = Math.floor(Math.random() * this.total);
      const partner = this.deadPopulation[index];
      const r = Math.floor(Math.random() * this.bestFitness);
      if (r < partner.fitness) {
        this.population.push(new Player(partner.getDNA().mutate(0.1), true));
      }
      escapeLoop++;
      if (escapeLoop > 500) { return;}
    }
  }

  info_params() {
    playerInfo.innerHTML =
        `
        <h2>Generations: ${this.generation}</h2>
				<h2>Alive population: ${this.population.length}</h2>
						${this.population.map(player => `
							<li>Player id: ${player.id}</li>
							<li>Player id: ${player.fitness ? player.fitness : '0'}</li>
							<li>Score: ${player.score}</li>
							<li>Player id: ${player.lifes}</li>
							<li>Player dead: ${player.dead}</li>
							<li>Player X: ${player.x}</li>
							`,
        )}
		`;

    bestPlayer.innerHTML = `
      <h2>${this.bestFitness ? `Best fitness: ${this.bestFitness}` : 'No best fitness yet!'}</h2>
    `;

    deadPlayersList.innerHTML = `
			<h2>Dead players: ${this.deadPopulation.length}</h2>
			${this.deadPopulation.map(player => `
        <li>${player.id}</li>
        <li>Fitness: ${player.fitness}</li>
        <li>Score: ${player.score}</li>
`)}
		`;

  }

}

export default Population;