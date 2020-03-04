class Player {
    constructor() {
        this.x = 500;
        this.y = canvas.height - 25;
        this.x_step = 10;
        this.height = 25;
        this.width = canvas.width / 6;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        ctx.rect(this.x, this.y, this.width, this.height);
    }

    control({key, type}) {
        switch (type === 'keydown') {
            case key === 'a':
                this.x -= this.x_step;
                console.log(this.y);
                this.update();
                break;

            case key === 'd':
                this.x += this.x_step;
                this.update();
                break;
        }
    }

    start() {
        this.draw();
    }
}