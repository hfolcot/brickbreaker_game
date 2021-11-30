export default class InputHandler {
    constructor(game) {
        document.addEventListener('keydown', event => {
            console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
            switch (event.code) {
                case "ArrowLeft":
                    game.paddle.moveLeft();
                    break;
                case "ArrowRight":
                    game.paddle.moveRight();
                    break;
                case "KeyP":
                    game.togglePause();
                    break;
                case "Space":
                    game.start();
                    break;
            }
        })
        document.addEventListener('keyup', event => {
            switch (event.code) {
                case "ArrowLeft":
                    if (game.paddle.speed < 0) {
                        game.paddle.stop();
                    }

                    break;
                case "ArrowRight":
                    if (game.paddle.speed > 0) {
                        game.paddle.stop();
                    }
                    break;
            }
        })
    }
}