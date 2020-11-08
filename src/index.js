const { getRandomWordSync, getRandomWord } = require('word-maker');

//Main loop
let syncCount = 1;
let asyncCount = 1;
let syncData = '';
let asyncData = '';

printRandomWords();
// Printing sync Random numbers
function printRandomWords() {
    console.log("Running sync Program")
    while (syncCount <= 100) {
        try {
            const randomWord = fizzBuzzProgram();
            syncData = syncData + `${syncCount}: ${randomWord}\n`;
        } catch (e) {
            syncData = syncData + `${syncCount}: It shouldn't break anything!\n`;
        }
        syncCount++;
    }
    console.log("Sync Program Completed :) ")
}

// Sync FizzBuzz Program
function fizzBuzzProgram() {
    const {multipleOf3, multipleOf5} = checkMultiples(syncCount);
    return multipleOf3 && multipleOf5 ? "FizzBuzz" : (multipleOf3 ? 'Fizz' : (multipleOf5 ? "Buzz" : getRandomWordSync({withErrors: true})));
}

// Printing async Random numbers
async function printRandomWordsAsync() {
    console.log("Running async Program")
    while (asyncCount <=100){
        const randomWord = await fizzBuzzProgramAsync();
        asyncData = asyncData + `${asyncCount}: ${randomWord}\n`;
        asyncCount++;
    }

    return Promise.resolve()
}

// Async FizzBuzz Program
async function fizzBuzzProgramAsync() {
    const {multipleOf3, multipleOf5} = checkMultiples(asyncCount);
    try {
        const randomWord = await getRandomWord({withErrors: true,slow: true})
        return multipleOf3 && multipleOf5 ? "FizzBuzz" : (multipleOf3 ? 'Fizz' : (multipleOf5 ? "Buzz" : randomWord));
    } catch (err) {
        return 'It shouldn\'t break anything!'
    }
}


// Function to check multiples
function checkMultiples(count) {
    const multipleOf3 = count % 3 === 0;
    const multipleOf5 = count % 5 === 0;
    return {
        multipleOf3, multipleOf5
    }
}