import { detectCollision } from '/js-games/src/collisionDetection.js';

export default class Brick {
    constructor(game, position) {
        this.image = document.getElementById('brick');
        this.game = game;

        this.position = position;
        this.width = 30;
        this.height = 20;

        this.markedForDeletion = false;
    }

    update() {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}