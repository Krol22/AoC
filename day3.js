const fs = require('fs');
fs.readFile('./day3.data', 'utf8', (err, data) => {
    countTriangles(data.split('\n'));
    countTrianglesPart2(data.split('\n'));
});

function countTriangles(data) {
    let triangles = [];
    data.forEach(triangle => {
        let sides = triangle.trim().split(/\s+/);
        sides.filter(side => side.length);

        if(isTriangle(sides) && sides.length === 3){
            triangles.push(triangle);
        }
    });
    console.log(triangles.length);
}

function countTrianglesPart2(data) {
    let numberOfTriangles = 0;
    for(let i = 0; i < data.length; i += 3) {
        if(!data[i] || !data[i + 1] || !data[i + 2]) continue;
        for(let j = 0; j < 3; j++){
            if(isTriangle([
                data[i].trim().split(/\s+/)[j],
                data[i + 1].trim().split(/\s+/)[j],
                data[i + 2].trim().split(/\s+/)[j]
            ])) {
                numberOfTriangles++; 
            }

        }
    }
    console.log(numberOfTriangles);
}

function isTriangle(sides) {
    for(let i = 0; i < 3; i++) {
        if(Number(sides[i % 3]) + Number(sides[(i + 1) % 3]) <= Number(sides[(i + 2) % 3])){
            return false;
        }
    }
    return true;
}

