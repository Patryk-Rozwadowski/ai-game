const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

class Player {
  constructor(dna, newGenes, ball) {
    this.id = Math.random();
    this.lifeSpan = 3900;
    if (newGenes) {
      this.dna = dna;
      this.newGenes = true;
    } else {
      this.dna = dna;
      this.dna.creatingGenes(this.lifeSpan);
      this.newGenes = false;
    }

    this.x = this.dna.genes[0];

    this.y = canvas.height - 25;
    this.x_step = 10;
    this.height = 15;
    this.width = 300;
    this.color = this.changeColor();

    this.dead = false;
    this.ball = ball;
    this.index = 0;
    this.lifes = 1;
    this.score = 0;
    this.ballHit = 0;
    this.fitness = 0;
  }

  calcFitness() {
    this.fitness =  this.score * this.ballHit;
  }

  walls_collision() {
    const ROOF = this.ball.y + this.ball.y_speed - this.ball.ballRadius < 0;
    const RIGHT_WALL = this.ball.x + this.ball.x_speed + this.ball.ballRadius > canvas.width;
    const LEFT_WALL = this.ball.x + this.ball.x_speed - this.ball.ballRadius < 0;
    const GROUND = this.ball.y + this.ball.y_speed + this.ball.ballRadius > canvas.height;

    switch (true) {
      case ROOF:
        this.ball.y_speed = -this.ball.y_speed;
        break;

      case LEFT_WALL:
        this.ball.x_speed = -this.ball.x_speed;
        break;

      case RIGHT_WALL:
        this.ball.x_speed = -this.ball.x_speed;
        break;

      case GROUND:
        this.ball.y_speed = -this.ball.y_speed;
        this.lifes -= 1;
        if (this.lifes === 0) {
          this.dead = true;
          this.calcFitness();
        }
    }
  }

  player_collision() {
    if (this.ball.y + this.ball.y_speed + this.ball.ballRadius > this.y
        && this.ball.x + this.ball.ballRadius < this.x + this.width
        && this.x < this.ball.x + this.ball.ballRadius) {
      this.ball.y_speed = -this.ball.y_speed;
      this.ballHit++;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    this.ball.color = this.color;
  }

  think() {
    this.dna.genes[this.index] < 400 ?  this.left() : this.right();
    //this.x = this.dna.genes[this.index];
  }

  update() {
    ctx.rect(this.x, this.y, this.width, this.height);
  }

  left() {
    this.x > 0 ? this.x -= this.x_step : null;
  }

  right() {
    this.x + this.x_step + this.width <= canvas.width ? this.x += this.x_step : null;
  }

  changeColor() {
    let red = Math.floor(Math.random() * 3) * 127;
    let green = Math.floor(Math.random() * 3) * 127;
    let blue = Math.floor(Math.random() * 3) * 127;
    return `rgba(${red}, ${green}, ${blue}, ${Math.random()}`;
  }

  control({key, type}) {
    switch (key) {
      case 'a':
        this.left();
        break;

      case 'd':
        this.x + this.x_step + this.width <= canvas.width ? this.x += this.x_step : console.log('right stop');
        break;
    }
  }

  getDNA() {
    return this.dna;
  }

  start() {
    if (!this.newGenes) this.dna.creatingGenes(this.lifeSpan);
    this.draw();
    this.ball.start();
    this.player_collision();
    this.walls_collision();
    this.think();
    this.score++;
    this.lifeSpan--;
    this.index++;
  }
}

export default Player;