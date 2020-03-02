class Player {
    constructor(x = 200, y = 600) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.rect(this.x, this.y, 1225, 25);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
    }

}

const player = new Player();

player.draw();