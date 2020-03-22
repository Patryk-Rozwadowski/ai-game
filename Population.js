import DNA from './DNA';
import Player from './game_components/Player';

class Population {
  constructor() {

    this.matingPool = [];
    this.avgFitness = 0;
    this.bestPlayer = 0;
    this.bestFitness = 0;
    this.generation = 0;
    this.total = 2;

    this.deadPopulation = [];
    this.population = [];
    for(let i = 0; i < this.total; i++){
      this.population[i] = new Player(new DNA());
    }
  }



  nextGeneration() {
    console.log('Next generation');
    this.generation++;
    this.pickMatingPool();
    const index = Math.floor(Math.random() * this.deadPopulation.length);
      const a = this.matingPool[index];
      const b = this.matingPool[index];
  }

  pickMatingPool() {
    for(let i = 0; i < this.deadPopulation.length; i++) {
      let n = this.deadPopulation[i].fitness * 100;

      for(let i = 0; i < n; i++) {
        this.matingPool.push(this.deadPopulation[i]);
      }
    }
  }

  getMaxFitness() {
    let bestFitness = this.bestFitness;
    debugger
    for (let player of this.deadPopulation) {
      if (player.fitness > this.bestFitness) {
        this.bestFitness = player.fitness;
      }
    }
  }

  calculateFitness() {

    for(let player of this.deadPopulation) {
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
      if (r < partner.fitness) { return new Player(partner.fitness);}
      escapeLoop++;
      if (escapeLoop > 500) { return}
    }
  }

  info_params() {
    playerInfo.innerHTML =
        `
				<h2>Live players: ${this.players.length}</h2>
						${this.players.map(player => `
							<li>Player id: ${player.id}</li>
							<li>Score: ${player.score}</li>
							<li>Player id: ${player.lifes}</li>
							<li>Player dead: ${player.dead}</li>
							`,
        )}
		`;

    bestPlayer.innerHTML = `
      <h2>${this.bestPlayer ? `Best score: ${this.bestPlayer}` : 'No best player yet!'}</h2>
    `;

    deadPlayersList.innerHTML = `
			<h2>Dead players: ${this.deadPlayers.length}</h2>
			${this.deadPlayers.map(player => `<li>${player.id}</li>`)}
		`;

    nnInfo.innerHTML = `
    		<h2>Generations:</h2>
    		<p>${this.generation}</p>
    		<p>${this.avgFitness}</p>
    `;
  }


}

export default Population;