const fs = require('fs');

fs.readFile('./day9.data', 'utf8', (err, data) => {
    let isDecoding = true;
    //data = 'X(8x2)(3x3)ABCY';
    part2(data);

});

/* Idea with weights from Reddit */
function part2(data) {
    let weightArr = [];
    let isInBrackets = false;
    let i = 0; 
    
    while(i < data.length) {
        if(data[i] === '(') {
            isInBrackets = true;
            weightArr.multiplyWeight(i, 1);
            i++;
            continue;
        } 

        if(isInBrackets) {
            let j = i;
            while(true) {
                if(data[j] === ')') {
                    break;
                } 
                weightArr.multiplyWeight(j, 1);
                j++;
            }
            let x, y;
            [x, y] = data.substring(i, j).split('x');
            for(let a = 1; a <= x ; a++) {
                weightArr.multiplyWeight(j + a, y);
            }

            isInBrackets = false;
            i += j - i;
            continue;
        }
        
        weightArr.multiplyWeight(i, 1);
        i++;
    }

    let length = 0;
    for(let i = 0; i < data.length; i++) {
        if(data[i] === '(') {
            isInBrackets = true;
        } else if (data[i] === ')') {
            isInBrackets = false;
        } else  if (!isInBrackets) {
            length += weightArr[i];
        }
    }

    console.log(length);
}


Array.prototype.multiplyWeight = function(index, multiplier) {
    if(this[index]) {
        this[index] *= multiplier;
    } else {
        this[index] = 1 * multiplier;
    }
} 

function part1(data) {
    while(true) {
        let regexp = /\([^\)]*\)/;
        let matches = regexp.exec(data);

        if(!matches) {
            break;
        }

        let marker = matches[0].substring(1, matches[0].length - 1);
        let compressedText = '';

        let i, j;
        [ i, j ] = marker.split('x');

        for(let x = 0; x < i; x++) {
            compressedText += data[marker.length + 2 + matches.index + x];
        }

        // part 1
        // compressedText = compressedText.split('(').join('{').split(')').join('}');

        let decompressedText = compressedText.repeat(j);
        let textToRemove = matches[0] + compressedText;

        // part 1
        // textToRemove = textToRemove.split('{').join('(').split('}').join(')');

        data = data.replace(textToRemove, decompressedText);
    }

    console.log(data);
    console.log(data.length);

}