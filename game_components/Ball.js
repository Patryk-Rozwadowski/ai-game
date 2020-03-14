import Player from './Player';
import NeuralNetwork from '../nn';

const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 900;

const playerInfo = document.getElementById('playerInfo');
const ballInfo = document.getElementById('ballInfo');
const gameInfo = document.getElementById('gameInfo');
const nnInfo = document.getElementById('nnInfo');

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

class Game {

	constructor () {
		this.ball = '';
		this.player = '';

		this.ball_x = '';
		this.ball_y = '';
		this.player_x = '';

		this.lifes = 3;
		this.brain = new NeuralNetwork(4, 4, 2);
	}

	info_params () {
		playerInfo.innerHTML = `
				<h2>Player params:</h2>
				<p>Player position X: ${this.player.x}</p>
				<p>Player position Y: ${this.player.y}</p>	
		`;

		ballInfo.innerHTML = `
				<h2>Ball params:</h2>
				<p>Ball position X: ${this.ball.x}</p>
				<p>Ball position Y: ${this.ball.y}</p>
				<p>Ball speed: ${this.ball.y_speed}</p>
				<p>Ball wall bounce: ${this.ball.x_speed}</p>

		`;

		gameInfo.innerHTML = `
				<h2>Game params:</h2>
				<p>Lifes: ${this.lifes}</p>
		`;

		nnInfo.innerHTML = `
				<h2>Neural network params:</h2>
		`;
	}

	player_collision () {
		if (this.ball.y + this.ball.y_speed + this.ball.ballRadius > this.player.y
			&& this.ball.x + this.ball.ballRadius < this.player.x + this.player.width
			&& this.player.x < this.ball.x + this.ball.ballRadius) {
			this.ball.y_speed = -this.ball.y_speed;
		}
	}

	think () {
		const input = [];
		input[0] = this.player.x;
		input[1] = this.player.y;
		input[2] = this.ball.x;
		input[3] = newGame.ball.y;
		debugger
		let output = this.brain.predict(input);
		output[0] > 0.5 ? this.player.left() : this.player.right();
	}

	walls_collision () {
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
				console.log(this.lifes);
				break;
		}
	}

	start () {
		this.ball = new Ball();
		this.player = new Player();

		const playerPlaying = setInterval(() => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			this.ball.start();
			this.player.start();
			//this.think();
			this.walls_collision();
			this.player_collision();
			this.info_params();
			if (this.lifes === 0) {
				//clearInterval(playerPlaying);
				console.log('Game over');
			}

		}, 10);
		document.addEventListener('keydown', (e) => this.player.control(e));
	}
}

const newGame = new Game;
newGame.start();

export default Game;
