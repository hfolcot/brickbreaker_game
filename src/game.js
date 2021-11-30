import Paddle from '/js-games/src/paddle.js';
import InputHandler from '/js-games/src/input.js';
import Ball from '/js-games/src/ball.js';
import Brick from '/js-games/src/brick.js';
import { buildLevel, levels } from '/js-games/src/levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    GAMEWON: 5
}

export default class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.lives = 2;
        this.bricks = [];
        this.levels = levels;
        this.currentLevel = 0;
        new InputHandler(this);

    }

    start() {
        if (this.gamestate != GAMESTATE.MENU &&
            this.gamestate != GAMESTATE.NEWLEVEL &&
            this.gamestate != GAMESTATE.GAMEWON) {
            return;
        }
        this.bricks = buildLevel(this, this.levels[this.currentLevel])
        this.ball.reset();

        this.gameObjects = [this.ball, this.paddle];
        this.gamestate = GAMESTATE.RUNNING;

    }

    update(deltaTime) {
        if (this.lives === 0) {
            this.gamestate = GAMESTATE.GAMEOVER;
        }
        if (this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER ||
            this.gamestate == GAMESTATE.GAMEWON) {
            return;
        }

        if (this.bricks.length === 0 && this.currentLevel >= this.levels.length - 1) {
            this.gamestate = GAMESTATE.GAMEWON;
            this.currentLevel = 0;
        }
        else if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach(function (obj) {
            obj.update(deltaTime);
        })

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(function (obj) {
            obj.draw(ctx);
        })
        if (this.gamestate === GAMESTATE.RUNNING) {

            ctx.rect(0, 0, this.gameWidth, 20);

            ctx.font = "bold 15px Verdana";
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.fillText("Lives: " + this.lives, 5, 20);
            ctx.fillText("Level: " + (this.currentLevel + 1), this.gameWidth - 75, 20);
        }
        if (this.gamestate === GAMESTATE.PAUSED) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();

            ctx.font = "30px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.MENU) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            ctx.font = "30px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACE to start", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.GAMEOVER) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            ctx.font = "30px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.GAMEWON) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            ctx.font = "30px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("CONGRATULATIONS!", this.gameWidth / 2, this.gameHeight / 2 -20);
            ctx.fillText("Press SPACE to play again", this.gameWidth / 2, this.gameHeight / 2 + 20);
        }

    }

    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        }
        else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}