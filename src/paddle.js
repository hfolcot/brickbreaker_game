export default class Paddle 
{
    constructor(game) 
    {
        this.gameWidth = game.gameWidth;
        this.width = 80;
        this.height = 20;

        this.maxSpeed = 10;
        this.speed = 0;


        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight -this.height - 20,
        }


    }

    moveLeft()
    {
        this.speed = -this.maxSpeed;
    }
    moveRight()
    {
        this.speed = this.maxSpeed;
    }
    stop()
    {
        this.speed = 0;
    }

    draw(ctx)
    {
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) 
    {
        this.position.x += this.speed;
        if(this.position.x < 0)
        {
            this.position.x = 0;
        }
        if(this.position.x + this.width > this.gameWidth)
        {
            this.position.x = this.gameWidth - this.width;
        }
    }

}