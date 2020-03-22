class DNA {
  constructor() {
    this.genes = [];
  }

  creatingGenes() {
    const x = Math.floor(Math.random() * 800);
    this.genes.push(x);
  }

  genesInfo() {
    return this.genes;
  }
}

export default DNA;