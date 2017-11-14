const fs = require('fs');
fs.readFile('./day4.data', 'utf8', (err, data) => {
    checkRooms(data.split('\n'));
});

function checkRooms(data) {
    let idSum = 0;
    data.forEach(roomCode => {
        if(!roomCode.trim()) return;
        let string = roomCode.split('-');
        let checksumWithId = string.pop();
        let lettersObject = {}

        cipherCheck(string.join(' '), checksumWithId.split('[')[0]);

        string.join('').split('').forEach(letter => {
            if(lettersObject[letter]){
                lettersObject[letter]++;
            } else {
                lettersObject[letter] = 1;
            }
        });

        let lettersArray = [];
        Object.keys(lettersObject).forEach(key => {
            lettersArray.push({ key: key, value: lettersObject[key] });
        });

        lettersArray.sort((a, b) => {
            if(b.value === a.value) {
                return a.key.localeCompare(b.key);
            } 
            return b.value - a.value;
        });

        let sum = '';
        for(let i = 0; i < 5; i++) {
            sum += lettersArray[i].key;
        }

        let id = checksumWithId.split('[')[1];
        if(sum + ']' === id){
            idSum += Number(checksumWithId.split('[')[0]);
        }

    });

    console.log(idSum);
}

function cipherCheck(string, checksum) {
    string = string.split('').map((letter, index, arr) => {
        if(letter !== ' ') {
            return String.fromCharCode(letter.charCodeAt(0) + Number(checksum) % 26);
        }
        return letter;
    }).join('');

    console.log(string, checksum);
}

function nextChar(c) {
    var i = (parseInt(c, 36) + 1 ) % 36;
    return (!i * 10 + i).toString(36);
}
