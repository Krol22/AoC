const fs = require('fs');
fs.readFile('./day7.data', 'utf8', (err, data) => {
    data2 = [
        'abba[mnop]qrst',
        'abcd[bddb]xyyx',
        'aaaa[qwer]tyui',
        'ioxxoj[asdfgh]zxcvbn'
    ];
    data3 = [
        'aba[bab]xyz',
        'xyx[xyx]xyx',
        'aaa[kek]eke',
        'zazbz[bzb]cdb',
        'zazzzcz[bzb]zbzcdb',
    ]
    countCorrectTLS(data.split('\n'));
    countCorrectSSL(data.split('\n'));
});
function countCorrectTLS(data) {

    let correctOnes = 0;
    let isCorrect = false;
    let isInBrackets = false;

    data.forEach(ip => {
        isCorrect = false;

        for(let i = 1; i < ip.length - 1; i++) {
            if(ip[i] === '[') {
                isInBrackets = true; 
            } else if(ip[i] === ']' && isInBrackets) {
                isInBrackets = false;
            }

            if(ip[i] === ip[i + 1] && ip[i - 1] === ip[i + 2] && ip[i] !== ip[i - 1]){
                if(!isInBrackets) {
                    isCorrect = true;
                } else {
                    isCorrect = false;
                    break;
                }
            }
        }

        if(isCorrect) correctOnes++;
    });

    console.log(correctOnes);
}

function countCorrectSSL(data) {
    let correctOnes = 0;
    data.forEach(ip => {
        if(!ip.length) return;

        let SSLCandidates = [];
        let regexp = /\[.*\]/;
        let bracketContent = regexp.exec(ip)[0];

        ipWithoutBrackets = ip.replace(/\[.*\]/, '');
        for(let i = 0; i < ipWithoutBrackets.length - 2; i++) {
            if(ipWithoutBrackets[i] === ipWithoutBrackets[i + 2] &&
               ipWithoutBrackets[i] !== ipWithoutBrackets[i + 1]) {
                
                SSLCandidates.push(ipWithoutBrackets.substring(i, i + 3));
            }
        }

        let SSLBrackets = [];
        for(let i = 0; i < bracketContent.length - 2; i++) {
            if(bracketContent[i] === bracketContent[i + 2] &&
               bracketContent[i] !== bracketContent[i + 1]) {

                SSLBrackets.push(bracketContent[i + 1] + bracketContent[i] + bracketContent[i + 1]);
            }
        }

        
        if(SSLCandidates.filter(ssl => SSLBrackets.indexOf(ssl) > -1).length){
            correctOnes++;
        }

    });

    console.log(correctOnes);
}
