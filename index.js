const canvas = document.getElementById('gameContainer');
canvas.width = 1000;
canvas.height = 900;
const ctx = canvas.getContext('2d');
// @todo split code to move player and ball
const move = () => {
    const ball = new Ball();
    const player = new Player();

    ball.draw();

}


