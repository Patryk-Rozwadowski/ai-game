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

  applyMutate() {
    return Math.floor(Math.random() * 800);
  }

  mutate(rate) {
    for(let i = 0; i < this.genes.length; i++){
      if(Math.random() < rate) {
        this.genes[i] = this.applyMutate();

      }
    }
  }
}

export default DNA;