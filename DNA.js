class DNA {
  constructor(total) {
    this.genes = [];
    this.genes = this.randomCoords();
  }

  randomCoords() {
    const x = Math.floor(Math.random() * 800);
    debugger;
    return [x];
  }

  genesInfo() {
    return this.genes;
  }
}

export default DNA;