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

        this.color= "rgb(" + red + ", " + green + ", " + blue + ")";
    }

    collision() {
        if (this.y + this.y_step - this.ballRadius < 0) {
            this.y_step = -this.y_step;
        } else if (this.x + this.x_step - this.ballRadius < 0) {
            this.x_step = -this.x_step;
        } else if (this.x + this.x_step + this.ballRadius > canvas.width) {
            this.x_step = -this.x_step;
            this.changeColor();
        } else if (this.y + this.y_step + this.ballRadius > canvas.height) {
            this.y_step = -this.y_step;
        }
    }

    move() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
        this.collision();
        this.x += this.x_step;
        this.y += this.y_step;
    }
}