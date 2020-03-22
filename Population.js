import DNA from './DNA';
import Player from './game_components/Player';

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
    this.total = 65;

    this.deadPopulation = [];
    this.population = [];
    for (let i = 0; i < this.total; i++) {
      this.population[i] = new Player(new DNA(), false);
    }
  }

  nextGeneration() {
    console.log('Next generation');
    this.generation++;
    this.pickMatingPool();
    //this.acceptReject()


    const a = Math.floor(Math.random() * this.deadPopulation.length);
    const b = Math.floor(Math.random() * this.deadPopulation.length);
    this.deadPopulation = [];
    const parentA = this.matingPool[a];
    const parentB = this.matingPool[b];

    const parentAGenes = parentA.getDNA();
    const parentBGenes = parentB.getDNA();

    const childDNA = parentAGenes.crossOver(parentBGenes);
    childDNA.mutate(0.5);
    for(let i = 0; i < this.total; i++) {
      this.population[i] = new Player(childDNA, true);
    }
  }

  pickMatingPool() {
    debugger
    this.matingPool = [];
    for (let i = 0; i < this.total; i++) {
      let n = this.deadPopulation[i].fitness * this.total / 2;
      for (let i = 0; i < n; i++) {
        this.matingPool.push(this.deadPopulation[i]);
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

    // let scoreSum = 0;
    // let playersFitness = 0;
    // debugger
    // for (let player of this.deadPopulation) {
    //   scoreSum += player.score;
    // }
    //
    // for (let player of this.deadPopulation) {
    //   player.fitness = (player.score / scoreSum) + 0.01;
    //   playersFitness += player.fitness;
    // }
    // this.avgFitness = playersFitness / this.deadPopulation.length;
    // console.log(this.deadPopulation)
  }

  acceptReject() {
    let escapeLoop = 0;
    while (true) {
      const index = Math.floor(Math.random() * this.total);
      const partner = this.deadPopulation[index];
      const r = Math.floor(Math.random() * this.bestFitness + 1);
      if (r < partner.fitness) {
        this.population.push(new Player(partner.getDNA().mutate(0.1), true))
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
							<li>Score: ${player.score}</li>
							<li>Player id: ${player.lifes}</li>
							<li>Player dead: ${player.dead}</li>
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