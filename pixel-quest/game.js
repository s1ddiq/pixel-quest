import { Map } from './map.js';
import { Camera } from './camera.js';

const GAME_WIDTH = 512; // max 768 x 768
const GAME_HEIGHT = 512;


class Game {
    constructor() {
        this.map = new Map();
        this.camera = new Camera(this.map, GAME_WIDTH, GAME_HEIGHT);
        this.keys = []

        window.addEventListener('keydown', (e) => {
            // refactor to use ! instead;
            if(this.keys.indexOf(e.key) === -1) {
                this.keys.unshift(e.key);

            }
            console.log(this.keys);
        });

        window.addEventListener('keyup', (e) => {
            const index = this.keys.indexOf(e.key);

            // checking if index is present in array, -1 represents this;
            if (index > -1) this.keys.splice(index, 1);
            console.log(this.keys);
        });
    }

    update(deltaTime) {
        let speedX = 0;
        let speedY = 0;

        // refactor to use switch statement;
        if (this.keys[0] === 'a') speedX = -1;
        else if (this.keys[0] === 'd') speedX = 1;
        else if (this.keys[0] === 's') speedY = 1;
        else if (this.keys[0] === 'w') speedY = -1;
        this.camera.move(deltaTime, speedX, speedY);
    }

    drawLayer(layer, ctx) {
        const startCol = Math.floor(this.camera.x / this.map.tileSize);
        const endCol = startCol + (this.camera.width / this.map.tileSize);

        const startRow = Math.floor(this.camera.y / this.map.tileSize);
        const endRow = startRow + (this.camera.height / this.map.tileSize);
        const offsetX = -this.camera.x + startCol * this.map.tileSize;
        const offsetY = -this.camera.y + startRow * this.map.tileSize;


        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const tile = this.map.getTile(layer, col, row);
                const x = (col - startCol) * this.map.tileSize + offsetX;
                const y = (row - startRow) * this.map.tileSize + offsetY;
                ctx.drawImage(
                    this.map.image,
                    (tile - 1) * this.map.image_tile % this.map.image.width,
                    Math.floor((tile - 1) / this.map.image_cols) * this.map.image_tile,
                    this.map.image_tile,
                    this.map.image_tile,
                    Math.round(x),
                    Math.round(y),
                    this.map.tileSize,
                    this.map.tileSize
                );
               
            }
        }
    }

    render(ctx) {
       this.drawLayer(0, ctx);
       this.drawLayer(1, ctx);

    }
}

// ctx.drawImage(
//     this.map.image,
//     sx, source
//     sy,
//     sw,
//     sh,
//      0,
//      0,
//      GAME_WIDTH,
//      GAME_HEIGHT
// );

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    ctx.imageSmoothingEnabled = false;
    
    const image = document.getElementById('full_map');

    const game = new Game();

    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = (timeStamp - lastTime) / 1000;
        lastTime = timeStamp;
        console.log(deltaTime);
        // console.log(timeStamp)
        game.update(deltaTime);
        game.render(ctx);
        // to create endless loop
        requestAnimationFrame(animate);
        // console.log('animating...');
        // ^ testing if animation function works 
    }
    requestAnimationFrame(animate);
});




// function printPyramid() {
//     let sequence = '';
//     for (let i = 0; i < sequence.length; i++) {
//         let newSequence = sequence += '#';
//         console.log(newSequence[i]);
//     }
//     console.log(sequence);
// }

// printPyramid();