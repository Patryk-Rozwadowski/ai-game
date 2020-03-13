import Player from './Player'

const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 900;

class Ball {
    constructor() {
        this.x = 600;
        this.y = 600;
        this.x_step = 1;
        this.y_step = -2;
        this.color = 'blue';
        this.mass = this.ballRadius * this.ballRadius * this.ballRadius;
        this.ballRadius = 10;
        this.lifes = 5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    changeColor() {
        let red = Math.floor(Math.random() * 3) * 127;
        let green = Math.floor(Math.random() * 3) * 127;
        let blue = Math.floor(Math.random() * 3) * 127;

        this.color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }

    player_collision(player) {
        if (this.y + this.y_step + this.ballRadius > player.y
            && this.x + this.ballRadius < player.x + player.width
            && player.x < this.x + this.ballRadius) {
            this.y_step = -this.y_step;
        }
    }

    walls_collision() {
        const ROOF = this.y + this.y_step - this.ballRadius < 0;
        const RIGHT_WALL = this.x + this.x_step + this.ballRadius > canvas.width;
        const LEFT_WALL = this.x + this.x_step - this.ballRadius < 0;
        const GROUND = this.y + this.y_step + this.ballRadius > canvas.height;

        switch (true) {
            case ROOF:
                this.y_step = -this.y_step;
                break;

            case LEFT_WALL:
                this.x_step = -this.x_step;
                break;

            case RIGHT_WALL:
                this.x_step = -this.x_step;
                break;

            case GROUND:
                this.y_step = -this.y_step;
                this.lifes -= 1;
                console.log(this.lifes);
                break;
        }
    }

    start() {
        const ball = new Ball();
        const player = new Player();

        const playerPlaying = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.draw();
            this.x += this.x_step;
            this.y += this.y_step;
            this.walls_collision();

            player.start();
            player.think();
            this.player_collision(player);
            
            if (this.lifes === 0) {
                //clearInterval(playerPlaying);
                console.log('Game over');
            }
        }, 1);
        document.addEventListener('keydown', (e) => player.control(e));
    }
}

const newGame = new Ball();
newGame.start();