const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 900;

class Game {
    constructor() {
        this.lifes = 0;
        this.endGame = false;
        this.gameRestart = false;
    }

    restart() {
        console.log('lost')
    }

    start() {
        const ball = new Ball();
        const player = new Player();

        document.addEventListener('keydown', (e) => player.control(e));
        setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ball.start();
            player.start();
            ball.player_collision(player);
        });

    }
}

const newGame = new Game();
newGame.start();