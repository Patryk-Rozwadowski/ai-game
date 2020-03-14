const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 900;

class Ball {
	constructor () {
		this.x = 600;
		this.y = 600;
		this.x_speed = 1;
		this.y_speed = -5;
		this.color = 'blue';
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

	movement () {
		this.x += this.x_speed;
		this.y += this.y_speed;
	}

	changeColor () {
		let red = Math.floor(Math.random() * 3) * 127;
		let green = Math.floor(Math.random() * 3) * 127;
		let blue = Math.floor(Math.random() * 3) * 127;

		this.color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
	}

	start () {
		this.draw();
		this.movement();
	}
}

export default Ball;