class DNA {
  constructor(length) {

    if (length) {
      this.genes = new Array(length);
    } else {
      this.genes = [];
    }
  }

  creatingGenes(lifeSpan) {
    for(let i = 0; i < lifeSpan; i++) {
      this.genes[i] = Math.floor(Math.random() * 2);
    }

  }

  genesInfo() {
    return this.genes;
  }

  crossOver(partner) {
    let child = new DNA(this.genes.length);
    let midpoint = Math.floor(Math.random() * this.genes.length);

    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else if(i < midpoint) child.genes[i] = partner.genes[i];
    }

    return child;
  }

  applyMutate() {
    return Math.floor(Math.random() * 2);
  }

  mutate(rate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < rate) {
        this.genes[i] = this.applyMutate();
      }
    }
  }
}

export default DNA;