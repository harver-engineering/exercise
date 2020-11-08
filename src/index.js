const {getRandomWordSync, getRandomWord} = require('word-maker');
const fs = require('fs');
const {post} = require('axios')


let isAsyncProgram = false;
process.argv.forEach(function (val, index, array) {
    if(index === 2 && val === 'async'){
        isAsyncProgram = true;
    }
});

const fileName = {
    SYNC_RESULT:'sync_results.txt',
    ASYNC_RESULT:'async_results.txt'
}

//Main loop
let syncCount = 1;
let asyncCount = 1;
let syncData = '';
let asyncData = '';

if(isAsyncProgram){
    printRandomWordsAsync().then(() => {
        makeHTTP(asyncData);
        // writeToFile(asyncData,fileName.ASYNC_RESULT); // uncomment to write to file
        console.log("Async Program Completed :) ")
    }).catch(err => {
        console.log("Something went wrong in async program :( ", err)
    });
}else{
    printRandomWords();
}



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
    makeHTTP(syncData); //uncomment to write to file
    //writeToFile(syncData,fileName.SYNC_RESULT);
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

// Function to make Http call - (FrontEnd Developers)
function makeHTTP(data) {
    post("/api/v1/harver-js/exercise", data).then(res => {
        //HTTP call success;
        return res;
    }).catch(err => {
        //HTTP call Error;
        return err
    })
}

// Function to write to file - (Node Js Developers)
function writeToFile(data,fileName) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log("Write file err ", err)
            throw err
        }
    });
}

// Function to check multiples
function checkMultiples(count) {
    const multipleOf3 = count % 3 === 0;
    const multipleOf5 = count % 5 === 0;
    return {
        multipleOf3, multipleOf5
    }
}


