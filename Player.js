class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.rect(160, 10, 100, 40);
        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    }

}

const player = new Player(25, 25);

player.draw();