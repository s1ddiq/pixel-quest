export class Camera {
    constructor(map, width, height) {
        this.map = map;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        // imaginary wall
        this.maxX = map.cols * map.tileSize - this.width;
        this.maxY = map.rows * map.tileSize - this.height;
        this.speed = 256;
    }

    move(deltaTime, speedX, speedY) {
        this.x += speedX * this.speed * deltaTime;
        this.y += speedY * this.speed * deltaTime;

        // clamps if current position is more than max position
        // max position will be selected
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
    }
}