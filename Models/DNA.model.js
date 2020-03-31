import {getRandomNumber} from '../utils/getRandomNumber.util';

export class DNA {
  constructor(length) {
    if (length) {
      this.genes = new Array(length);
    } else {
      this.genes = [];
    }
  }

  creatingGenes(lifeSpan) {
    for (let i = 0; i < lifeSpan; i++) {
      this.genes[i] = this.applyMutate();
    }
  }

  crossOver(partner) {
    let child = new DNA(this.genes.length);
    let midpoint = getRandomNumber(this.genes.length);

    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else if (i < midpoint) child.genes[i] = partner.genes[i];
    }
    return child;
  }

  applyMutate() {
    return getRandomNumber(2);
  }

  mutate(rate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (getRandomNumber(1) < rate) {
        this.genes[i] = this.applyMutate();
      }
    }
  }
}
