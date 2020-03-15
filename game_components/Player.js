import NeuralNetwork from '../nn'
import Ball from './Ball'

const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

class Player {
	constructor () {
		this.id = Math.random();
		this.x = 500;
		this.y = canvas.height - 25;
		this.x_step = 10;
		this.height = 15;
		this.width = canvas.width / 7;
		this.color = '';

		this.brain = new NeuralNetwork(5, 15, 2)
		this.inputs = []
		this.brain.createModel();

		this.lifes = 1;
		this.dead = false
		this.ball = new Ball();
	}

	walls_collision () {
		const ROOF = this.ball.y + this.ball.y_speed - this.ball.ballRadius < 0
		const RIGHT_WALL = this.ball.x + this.ball.x_speed + this.ball.ballRadius > canvas.width
		const LEFT_WALL = this.ball.x + this.ball.x_speed - this.ball.ballRadius < 0
		const GROUND = this.ball.y + this.ball.y_speed + this.ball.ballRadius > canvas.height

		switch (true) {
			case ROOF:
				this.ball.y_speed = -this.ball.y_speed
				break

			case LEFT_WALL:
				this.ball.x_speed = -this.ball.x_speed
				break

			case RIGHT_WALL:
				this.ball.x_speed = -this.ball.x_speed
				break

			case GROUND:
				this.ball.y_speed = -this.ball.y_speed
				this.lifes -= 1
				if (this.lifes === 0) {
					this.dead = true;
					console.log(`remove player ${this.id} from game`)
					// this.players.splice(i, 1)
					// this.stop()
					// console.log(this.players)
					// this.clearGame()
				}
				//
				// .map((player, i) => {
				// 		debugger;
				// 		player.lifes -= 1
				// 		if (player.lifes === 0) {
				// 			console.log(`remove player ${i} from game`)
				// 			this.players.splice(i, 1)
				// 			this.stop()
				// 			console.log(this.players)
				// 			this.clearGame()
				// 		}
				// 		console.log(player.lifes)
				// 	},
				// )
		}
	}

	player_collision () {
			if (this.ball.y + this.ball.y_speed + this.ball.ballRadius > this.y
				&& this.ball.x + this.ball.ballRadius < this.x + this.width
				&& this.x < this.ball.x + this.ball.ballRadius) {
				this.ball.y_speed = -this.ball.y_speed
		}
	}

	think () {
		this.inputs[0] = this.x;
		this.inputs[1] = this.y;
		this.inputs[2] = this.ball.x;
		this.inputs[3] = this.ball.y;
		this.inputs[4] = this.lifes;

		let output = this.brain.predict(this.inputs)
		output[0] > output[1] ? this.left() : this.right()
	}

	draw () {
		ctx.beginPath();
		ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		this.ball.color = this.color;
	}

	update () {
		ctx.rect(this.x, this.y, this.width, this.height);
	}

	left () {
		this.x > 0 ? this.x -= this.x_step : null;
	}

	right () {
		this.x + this.x_step + this.width <= canvas.width ? this.x += this.x_step : null;
}

	changeColor () {
		let red = Math.floor(Math.random() * 3) * 127;
		let green = Math.floor(Math.random() * 3) * 127;
		let blue = Math.floor(Math.random() * 3) * 127;

		this.color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
	}

	control ({ key, type }) {
		switch (key) {
			case 'a':
				this.left();
				break;

			case 'd':
				this.x + this.x_step + this.width <= canvas.width ? this.x += this.x_step : console.log('right stop');
				break;
		}
	}

	start () {
		this.draw();
		this.ball.start();
		this.player_collision()
		this.walls_collision()
	}
}

export default Player;