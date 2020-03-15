import Player from './Player'

const playerInfo = document.getElementById('playerInfo')
const ballInfo = document.getElementById('ballInfo')
const gameInfo = document.getElementById('gameInfo')
const nnInfo = document.getElementById('nnInfo')

const canvas = document.getElementById('gameContainer')
const ctx = canvas.getContext('2d')
canvas.width = 1000
canvas.height = 900

class Game {

	constructor () {
		this.total = 5

		this.players = []

		this.ball_x = ''
		this.ball_y = ''
		this.player_x = ''

		this.dead = false
		this.repeat = false

	}

	playing () {
		debugger;
		setInterval(() => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			this.players.map(player => player.start())
			this.players.map(player => player.think())
			//this.info_params()

		})
	}

	clearGame () {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}

	stop () {
		clearInterval(this.playing)
	}

	info_params () {
		playerInfo.innerHTML = `
				<h2>Player params:</h2>
				<p>Player position X: ${this.player.x}</p>
				<p>Player position Y: ${this.player.y}</p>	
		`

		ballInfo.innerHTML = `
				<h2>Ball params:</h2>
				<p>Ball position X: ${this.ball.x}</p>
				<p>Ball position Y: ${this.ball.y}</p>
				<p>Ball speed: ${this.ball.y_speed}</p>
				<p>Ball wall bounce: ${this.ball.x_speed}</p>

		`

		gameInfo.innerHTML = `
				<h2>Game params:</h2>
				<p>Lifes: ${this.lifes}</p>
		`

		// nnInfo.innerHTML = `
		// 		<h2>Neural network params:</h2>
		// 		<p></p>
		// 		<p>${this.inputs.map(item => `<p>${item}</p>`)}</p>
		// `
	}





	start () {
		for (let i = 0; i < this.total; i++) {
			debugger
			this.players[i] = new Player
			this.players[i].changeColor()
		}

		this.playing()

		//document.addEventListener('keydown', (e) => this.player.control(e))
	}
}

const newGame = new Game

newGame.start()

export default Game