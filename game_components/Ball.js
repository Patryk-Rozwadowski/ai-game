class Ball {
    constructor(x = 600, y = 600, ballRadius = 10) {
        this.x = x;
        this.y = y;
        this.x_step = 1;
        this.y_step = -2;
        this.color = 'blue';
        this.mass = this.ballRadius * this.ballRadius * this.ballRadius;
        this.ballRadius = ballRadius;
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

    collision() {

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
                break;
        }
    }

    start() {
        this.draw();
        this.collision();
        this.x += this.x_step;
        this.y += this.y_step;
    }
}