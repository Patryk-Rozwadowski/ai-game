const canvas = document.getElementById('gameContainer');
canvas.width = 1000;
canvas.height = 900;
const ctx = canvas.getContext('2d');

const game = () => {
    const ball = new Ball();
    const player = new Player();

    document.addEventListener('keydown', (e) => player.control(e));
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.start();
        player.start();

        ball.player_collision(player);
    });

};