const populationInformation = document.getElementById('populationInformation');
export const WriteGameInfo = (
  generation,
  population,
  bestPlayer,
  worstFitness,
  avgFitness,
  mostBallHit,
  mutationRatio,
  deadPopulation
) => {
  const { fitness } = bestPlayer;
  populationInformation.innerHTML = `
      <p class="h2">Generation: ${generation}</p>
      
      <p class="h4">${
        bestPlayer ? `Best fitness: ${fitness}` : 'No best fitness yet!'
      }</p>
      <p class="h4">${
        worstFitness
          ? `Worst fitness: ${worstFitness}`
          : 'No worst fitness yet!'
      }</h2>
      <p class="h4">${
        avgFitness
          ? `Average fitness per generation: ${avgFitness}`
          : 'No average fitness yet!'
      }</h2>
      <p class="h4">${
        mostBallHit ? `Most ball hit: ${mostBallHit}` : 'No best ball hit yet!'
      }</h2>
      <p class="h4">Mutation ratio: ${mutationRatio * 100}%</h2>
      <p class="h2">Alive population: ${population.length}</p>
      <p class="h2">Dead population: ${deadPopulation.length}</h2>
    `;
};
