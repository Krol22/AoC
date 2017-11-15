const md5 = require('md5');
const doorId = 'wtnhxymk';

// let passwd = '';
let passwd = '########';
let currentCheckingId = 1000000;
let counter = 0;

while(true) {
    let md5Hash = md5(doorId + currentCheckingId);
    currentCheckingId++;

    if(checkMd5_part2(md5Hash)){
        console.log(currentCheckingId);
        console.log(md5Hash);
        console.log(passwd, counter);
        console.log('founded!!! \n');
        // passwd_part1 passwd += md5Hash[5];


    }

    if(counter === 8) break;
}

console.log(passwd);

function checkMd5(md5Hash) {
    let isCorrect = true;
    for(let i = 0; i < 5 && isCorrect; i++){
        isCorrect = md5Hash[i] === '0' ? true : false;
    }

    return isCorrect;
}

function checkMd5_part2(md5Hash) {
    let isCorrect = true;
    for(let i = 0; i < 5 && isCorrect; i++){
        isCorrect = md5Hash[i] === '0' ? true : false;
    }

    if(isCorrect && Number(md5Hash[5]) < 8 && passwd[Number(md5Hash[5])] === '#'){
        passwd = passwd.substring(0, Number(md5Hash[5])) + md5Hash[6] + passwd.substring(Number(md5Hash[5]) + 1);
        counter++;
    }

    return isCorrect;
}

