const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 900;

class Ball {
  constructor() {
    this.x = 500;
    this.y = canvas.height / 2;
    this.x_speed = 2;
    this.y_speed = -10;
    this.color = '';
    this.mass = this.ballRadius * this.ballRadius * this.ballRadius;
    this.ballRadius = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  movement() {
    this.x += this.x_speed;
    this.y += this.y_speed;
  }

  start() {
    this.draw();
    this.movement();
  }
}

export default Ball;