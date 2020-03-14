const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

class Player {
	constructor () {
		this.x = 500;
		this.y = canvas.height - 25;
		this.x_step = 10;
		this.height = 25;
		this.width = canvas.width / 6;
		this.color = '';
	}

	draw () {
		ctx.beginPath();
		ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	update () {
		ctx.rect(this.x, this.y, this.width, this.height);
	}

	left () {
		this.x > 0 ? this.x -= this.x_step : null;
	}

	right () {
		this.x + this.x_step + this.width <= canvas.width ? this.x += this.x_step : console.log('right stop');
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
	}
}

export default Player;