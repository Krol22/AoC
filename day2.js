const fs = require('fs');
fs.readFile('./day2.data', 'utf8', (err, data) => {
    getTePinCode(data.split('\n'));
});

let position = { x: 0, y: 2 };

function getTePinCode(data) {
    let pinCode = [];
    data.forEach(numInstruction => {
        numInstruction = numInstruction.trim();
        if(!numInstruction) return;
        for(let i = 0; i < numInstruction.length; i++) {
            let pos = getPosition(numInstruction[i]);         
            //correctPosition_part1();
            correctPosition_part2(pos);
        }
        pinCode.push({ x: position.x, y: position.y });
    });

    console.log(pinCode);
    //translate_part1(pinCode);
}

function getPosition(dir) {
    switch (dir){
        case 'U':
            return { x: 0, y: -1 };
        case 'R':
            return { x: 1, y: 0 };
        case 'D':
            return { x: 0, y: 1 };
        case 'L':
            return { x: -1, y: 0 };
    }
}

function correctPosition_part1() {
    position.x = position.x > 2 ? 2 : position.x < 0 ? 0 : position.x;
    position.y = position.y > 2 ? 2 : position.y < 0 ? 0 : position.y;
}

function translate_part1(pinCode) {
    pinCode.forEach(pos => {
        console.log(pos.y * 3 + pos.x + 1);
    });
}

function correctPosition_part2(direction) {
    let x = position.x;
    let y = position.y;

    switch(Math.abs(x - 2)) {
        case 0:
            position.y += direction.y;
            position.y = position.y < 0 ? position.y = 0 : position.y > 4 ? 4 : position.y
            break;
        case 1:
            position.y += direction.y;
            position.y = position.y < 1 ? position.y = 1 : position.y > 3 ? 3 : position.y
            break;
        case 2:
            break;
    }
    switch(Math.abs(y - 2)) {
        case 0:
            position.x += direction.x;
            position.x = position.x < 0 ? position.x = 0 : position.x > 4 ? 4 : position.x
            break;
        case 1:
            position.x += direction.x;
            position.x = position.x < 1 ? position.x = 1 : position.x > 3 ? 3 : position.x
            break;
        case 2:
            break;
    }
}
