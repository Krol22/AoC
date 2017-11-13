const data = 'L1, L5, R1, R3, L4, L5, R5, R1, L2, L2, L3, R4, L2, R3, R1, L2, R5, R3, L4, R4, L3, R3, R3, L2, R1, L3, R2, L1, R4, L2, R4, L4, R5, L3, R1, R1, L1, L3, L2, R1, R3, R2, L1, R4, L4, R2, L189, L4, R5, R3, L1, R47, R4, R1, R3, L3, L3, L2, R70, L1, R4, R185, R5, L4, L5, R4, L1, L4, R5, L3, R2, R3, L5, L3, R5, L1, R5, L4, R1, R2, L2, L5, L2, R4, L3, R5, R1, L5, L4, L3, R4, L3, L4, L1, L5, L5, R5, L5, L2, L1, L2, L4, L1, L2, R3, R1, R1, L2, L5, R2, L3, L5, L4, L2, L1, L2, R3, L1, L4, R3, R3, L2, R5, L1, L3, L3, L3, L5, R5, R1, R2, L3, L2, R4, R1, R1, R3, R4, R3, L3, R3, L5, R2, L2, R4, R5, L4, L3, L1, L5, L1, R1, R2, L1, R3, R4, R5, R2, R3, L2, L1, L5'

function getDirection(instructionDir){
    currentDirection += instructionDir === 'R' ? 1 : -1;
    currentDirection = currentDirection < 0 ? 3 : (currentDirection > 3 ? 0 : currentDirection);

    switch(currentDirection) {
        case 0:
            return { x: 1, y: 0 };
        case 1:
            return { x: 0, y: 1 };
        case 2:
            return { x: -1, y: 0 };
        case 3: 
            return { x: 0, y: -1 };
    }
}

let currentDirection = 0, twice;

let position = { x: 0, y: 0 };
let positions = [];

data.split(',')
    .map(e => e.trim())
    .forEach(instruction => {
        let direction = getDirection(instruction[0]);

        for(let i = 0; i < instruction.substring(1, instruction.length); i++) {
            if(!twice) {
                twice = positions.find(pos => pos.x === position.x && pos.y === position.y);
                positions.push({ x: position.x, y: position.y });
            }
            position.x += direction.x;
            position.y += direction.y;
        }
    });

console.log('part 1: ', Math.abs(position.x) + Math.abs(position.y));
console.log('part 2: ', Math.abs(twice.x) + Math.abs(twice.y));
