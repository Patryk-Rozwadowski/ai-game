import DNA from './DNA';
import Player from './game_components/Player';

class Population {
  constructor() {

    this.matingPool = [];
    this.avgFitness = '';
    this.bestPlayer = '';
    this.bestFitness = '';
    this.generation = '';
    this.total = 2;

    this.population = [];
    for(let i = 0; i < this.total; i++){
      this.population[i] = new Player(new DNA());
    }
  }

  calculateBestFitness() {
    this.bestPair = [];
    this.bestFitness = 0;

    for (let player of this.deadPlayers) {
      if (player.fitness > this.bestFitness) {
        this.bestFitness = player.fitness;
      }
    }
  }

  nextGeneration() {
    console.log('Next generation');
    this.generation++;
    for (let i = 0; i < this.total; i++) {
      const parentA = this.acceptReject();
      const parentB = this.acceptReject();
      this.players[i] = new Player(this.bestFitness);
      this.players[i].changeColor();
    }
  }


  calculateFitness() {
    debugger;
    let scoreSum = 0;
    let playersFitness = 0;

    for (let player of this.deadPlayers) {
      scoreSum += player.score;
    }

    for (let player of this.deadPlayers) {
      player.fitness = (player.score / scoreSum) + 0.01;
      playersFitness += player.fitness;
    }
    this.avgFitness = playersFitness / this.deadPlayers.length;
  }


  acceptReject() {
    let escapeLoop = 0;
    while (true) {
      const index = Math.floor(Math.random() * this.total);
      const partner = this.deadPlayers[index];
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