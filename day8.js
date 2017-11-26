const fs = require('fs');

const DIRECTIONS = {
    ROWS: 1,
    COLS: 2
};

fs.readFile('./day8.data', 'utf8', (err, data) => {
    readInstruction(data.split('\n'));
});

function readInstruction(insctructions) {
    let screen = new Screen();
    screen.init(6, 50);

    insctructions.forEach(insctruction => {
        let words = insctruction.trim().split(' ');
        if(words[0] === 'rect'){
            screen.rect(Number(words[1].split('x')[0]),Number(words[1].split('x')[1]));
        } else {
            screen.rotate(
                words[1] === 'row' ? DIRECTIONS.ROWS : DIRECTIONS.COLS,
                Number(words[2].split('=')[1]),
                Number(words[4])
            );
        }
        screen.draw();
        console.log(' ');
    });

    screen.draw();
    console.log(screen.lcd.filter(pixel => pixel.value === 'X').length);
}

let Screen = function() {
    this.lcd = [];
    this.init = function(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        for(let y = 0; y < rows; y++) {
            for(let x = 0; x < cols; x++) {
                this.lcd.push({ x, y, value: '-' });
            }
        }
    }

    this.rect = function(width, height) {
        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                this.litPixel(x, y);
            }
        }
    }


    /* 
        Instructions:
        
        rotate column x=${pos} by {value}
        rotate row y=${pos} by {value}
    */

    this.rotate = function(direction, pos, value) {
        if(direction === DIRECTIONS.COLS) {
            this.lcd.filter(pixel => pixel.x === pos)
                .map(pixel => { 
                    pixel.y += value; 
                    return pixel 
                })
                .filter(pixel => { 
                    return pixel.y >= this.rows; 
                })
                .map(pixel => { 
                    pixel.y = pixel.y % this.rows; 
                    return pixel 
                });
        } else if(direction === DIRECTIONS.ROWS) {
            this.lcd.filter(pixel => pixel.y === pos)
                .map(pixel => { pixel.x += value; return pixel })
                .filter(pixel => { return pixel.x >= this.cols })
                .map(pixel => { pixel.x = pixel.x % this.cols; return pixel });
        }
    }

    this.draw = function() {
        for(let i = 0; i < this.rows; i++) {
            let row = this.lcd.filter(pixel => pixel.y === i);
            row.sort((a, b) => a.x - b.x);
            row.forEach(pixel => process.stdout.write(pixel.value));
            console.log('');
        }
    }
    
    this.litPixel = function(x, y) {
        let pixel = this.lcd.find(pixel => pixel.x === x && pixel.y === y);
        pixel.value = 'X'
    }

    this.turnOff = function(x, y) {
        let pixel = this.lcd.find(pixel => pixel.x === x && pixel.y === y);
        pixel.value = '-';
    }
}