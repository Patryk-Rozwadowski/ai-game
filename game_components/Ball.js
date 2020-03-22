const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 900;

class Ball {
	constructor () {
		this.x = 600 + Math.floor(Math.random() * 100);
		this.y = canvas.height / 2 + Math.floor(Math.random() * 100);
		this.x_speed = 1;
		this.y_speed = -18;
		this.color = '';
		this.mass = this.ballRadius * this.ballRadius * this.ballRadius;
		this.ballRadius = 10;
	}

	draw () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	crossOver() {
		debugger;
		this.dna.crossOver()
	}

	movement () {
		this.x += this.x_speed;
		this.y += this.y_speed;
	}

	start () {
		this.draw();
		this.movement();
	}
}

export default Ball;