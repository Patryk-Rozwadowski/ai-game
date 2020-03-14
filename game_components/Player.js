import NeuralNetwork from '../nn';
import newGame from './Ball';

const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

class Player {
	constructor () {
		this.x = 500;
		this.y = canvas.height - 25;
		this.x_step = 10;
		this.height = 25;
		this.width = canvas.width / 6;
		this.brain = new NeuralNetwork(4, 4, 2);
	}

	think () {
		const input = [];
		input[0] = this.x;
		input[1] = this.y;
		input[2] = newGame.x;
		input[3] = newGame.y;
		debugger
		let output = this.brain.predict(input);
		output[0] > 0.5 ? this.left() : this.right();
	}

	draw () {
		ctx.beginPath();
		ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}

  update () {
    ctx.rect(this.x, this.y, this.width, this.height)
  }

  left () {
    this.x > 0 ? this.x -= this.x_step : null;
    console.log(this.x)
  }

  right () {
    this.x + this.x_step + this.width <= canvas.width ? this.x += this.x_step : console.log('right stop');
    console.log(this.x)
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
		this.think();
	}
}

export default Player;