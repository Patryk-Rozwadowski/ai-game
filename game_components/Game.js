import Player from './Player'
import Ball from './Ball'

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
		this.total = 2
		this.ball = ''
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
			this.ball.start()
			this.players.map(player => player.start())
			this.players.map(player => player.think(this.ball_x, this.ball_y))
			this.player_collision()

			this.walls_collision()
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

	player_collision () {
		this.players.map(player => {
			if (this.ball.y + this.ball.y_speed + this.ball.ballRadius > player.y
				&& this.ball.x + this.ball.ballRadius < player.x + player.width
				&& player.x < this.ball.x + this.ball.ballRadius) {
				this.ball.y_speed = -this.ball.y_speed
			} else {
				this.stop()
			}
		})
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
				this.players.map((player, i) => {
						debugger;
						player.lifes -= 1
						if (player.lifes === 0) {
							console.log(`remove player ${i} from game`)
							this.players.splice(i, 1)
							this.stop()
							console.log(this.players)
							this.clearGame()
						}
						console.log(player.lifes)
					},
				)

				break
		}
	}

	start () {
		this.ball = new Ball()
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