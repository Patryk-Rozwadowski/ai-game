class DNA {
  constructor(total) {
    this.genes = [];
    this.fitness = 0;
    this.genes = this.randomCoords();
  }

  randomCoords() {
    const x = Math.floor(Math.random() * 800);
    const lifes = 1;
    return [x, lifes];
  }
}

export default DNA;