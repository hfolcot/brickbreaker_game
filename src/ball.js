import { detectCollision } from '/js-games/src/collisionDetection.js';

export default class Ball {
    constructor(game) {
        this.image = document.getElementById('ball');
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;


        this.size = 20;
        this.reset();
    }

    reset() {
        this.position = {
            x: 400,
            y: 400
        }
        this.speed = {
            x: 4,
            y: -4
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        // Move the ball
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;


        // Check for x walls collision
        if (this.position.x > (this.gameWidth - this.size) || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        // Check for top collision
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        // Losing a life
        if (this.position.y > (this.gameHeight - this.size)) {
            this.game.lives--;
            this.reset();
        }

        // Check for paddle collision
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }

    }
}