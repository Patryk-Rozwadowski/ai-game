class Ball {
    constructor(x = canvas.width / 2 , y = canvas.height, ballRadius = 10) {
        this.x = x;
        this.y = y;
        this.ballRadius = ballRadius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
    }

    move() {
        let x_step = 2;
        let y_step = -2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
        this.x += x_step;
        this.y += y_step;
    }
}

const ball = new Ball();

setInterval(() => ball.move(), 3);
ball.draw();