const fs = require('fs');
fs.readFile('./day6.data', 'utf8', (err, data) => {
    fixMessage(data.split('\n'));
});

let pin = {};
const numOfLetters = 8;
function fixMessage(data) {
    let rows = data.length;

    for(let i = 0; i < numOfLetters; i++) {
        let chars = {};

        for(let j = 0; j < rows; j++) {
            if(chars[data[j][i]]) {
                chars[data[j][i]]++;
            } else {
                chars[data[j][i]] = 1;
            }
        }

        let lettersArray = [];
        Object.keys(chars).forEach(key => {
            lettersArray.push({key: key, value: chars[key]}); 
        });

        lettersArray.sort((a, b) => {
            return a.value - b.value;
            // #part_1 return b.value - a.value;
        });

        console.log(lettersArray);

        pin[i] = lettersArray[1].key; 
    }

    Object.keys(pin).forEach(key => process.stdout.write(pin[key]));
}

