class DNA {
  constructor(length) {

    if (length) {
      this.genes = new Array(length);
    } else {
      this.genes = [];
    }
  }

  creatingGenes() {
    const x = Math.floor(Math.random() * 800);
    this.genes.push(x);
  }

  genesInfo() {
    return this.genes;
  }

  crossOver(partner) {
    let child = new DNA(this.genes.length);
    let midpoint = Math.floor(Math.random() * this.genes.length);

    for (let i = 0; i < midpoint; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }
}

export default DNA;