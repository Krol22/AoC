const fs = require('fs');

const chipType = {
    LOW: 0,
    HIGH: 1
};

class Bot {
    constructor(id, chip = -1) {
        this.id = id;
        this.low = Number(chip);
        this.high = -1
    }

    assingChip(value) {
        if(this.low == -1) {
            this.low = value;
        } else if(this.low > value) {
            this.high = this.low;
            this.low = value;
        } else {
            this.high = value;
        }
    }

    giveChip(type) {
        if(type == chipType.HIGH) {
            let valueToReturn = this.high;
            this.high = -1;
            return valueToReturn;
        } else {
            let valueToReturn = this.low;
            this.low = -1;
            return valueToReturn;
        }
        
    }
}

var bots = [];
var outputBin = {};

fs.readFile('./day10.data', 'utf-8', (err, instructions) => {
    var botInstructions;
    instructions = instructions.split('\n').sort(function alphabeticly(a, b) {
        return a.localeCompare(b);
    });

    botInstructions = instructions.filter(function filterInstructionsOrExecuteValue(instruction) {
        if(instruction[0] === 'v') {
            readValueInstruction(instruction);
            return false;
        } else {
            return true;
        }
    });

    let i = 0;
    while(i < botInstructions.length - 1) {
        let botWithTwoChips = bots.find(function findWithTwoChips(bot) {
            return bot.low !== -1 && bot.high !== -1;
        });

        if(botWithTwoChips.low === 17 && botWithTwoChips.high == 61) {
            console.log(botWithTwoChips.id);
        }

        let botInstruction = botInstructions.find(function findInstructionForBot(instruction, index, arr) {
            let instructionParts = instruction.split(' ');
            if(botWithTwoChips.id == instructionParts[1]) {
                arr[index] = '';
                return true;
            }
            return false;
        });

        executeBotInstruction(botWithTwoChips, botInstruction);
        i++;
    }

    console.log(outputBin[0] * outputBin[1] * outputBin[2]);
});

function executeBotInstruction(botWithTwoChips, botInstruction) {
    var instructionParts = botInstruction.split(' ');

    assingChipTo(instructionParts[5], instructionParts[6], botWithTwoChips.giveChip(chipType.LOW));
    assingChipTo(instructionParts[10], instructionParts[11], botWithTwoChips.giveChip(chipType.HIGH));

    function assingChipTo(type, output, chip) {
        if(type === 'bot') {
            let bot = bots.find(i => i.id === output);
            if(bot) {
                bot.assingChip(chip);
            } else {
                bot = new Bot(output, chip);
                bots.push(bot);
            }
        } else {
            outputBin[output] = outputBin[output] || [];
            outputBin[output].push(chip);
        }
    }

}

function readValueInstruction(instruction) {
    var instructionParts = instruction.split(' ');
    var bot = bots.find(bot => bot.id === instructionParts[5]);

    if(bot) {
        bot.assingChip(instructionParts[1]);
    } else {
        bots.push(new Bot(instructionParts[5], instructionParts[1]))
    }
}