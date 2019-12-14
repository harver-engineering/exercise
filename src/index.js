const { getRandomWordSync, getRandomWord } = require('word-maker');
const { write } = require('./writer');

/**
 * Handle intermittent error throw for synchronous getRandomWordSync
 */
const getRandomWordSyncSecure = () => {
    try {
        return getRandomWordSync({ withErrors: true });
    } catch (error) {
        return "It shouldn't break anything!";
    }
};

/**
 * Handle intermittent error throw for asynchronous getRandomWord
 */
const getRandomWordSecure = async () => {
    try {
        return await getRandomWord({withErrors: true});
    } catch (error) {
        return "It shouldn't break anything!";
    }
};

// create numbers from 1 to 100
const ids = Array.from(Array(100).keys()).map( id => id + 1);

/**
 * Task 1
 * Print numbers from 1 to 100 to the console, but for each number also print a random word
 */
console.info("\n*** Task 1 ***\n");

const randomWords = (id) => id + ": " + getRandomWordSyncSecure();
let out = ids.map(id => randomWords(id));
write({ data: out.join('\n'), toFile: true });

/**
 * Task 2
 * Random words with "Fizz Buzz" program
 */
console.info("\n*** Task 2 ***\n");

// "Fizz Buzz" program
const doFizzBuzz = (id) => (id%3 === 0 ? "Fizz" : "") + (id%5 === 0 ? "Buzz" : "");

const fizzBuzzRandomWords = (id) => id + ": " + (doFizzBuzz(id) || getRandomWordSyncSecure());
let out2 = ids.map(id => fizzBuzzRandomWords(id));
write({ data: out2.join('\n'), toFile: true });

/**
 * Task 3
 * Asynchronous Implementations of Task 1 & 2
 */
console.info("\n*** Task 3 ***\n");

// 3.1 Async Random Words

const randomWordsAsync = async (id) => id + ": " + await getRandomWordSecure();
let promises = ids.map(id => randomWordsAsync(id));
Promise.all(promises).then(output => write({ data: output.join('\n'), toFile: true }));

// 3.2 Async Random words with "Fizz Buzz" program

const fizzBuzzRandomWordsAsync = async (id) => id + ": " + (doFizzBuzz(id) || await getRandomWordSecure());
let promises2 = ids.map(id => fizzBuzzRandomWordsAsync(id));
Promise.all(promises2).then(output => write({ data: output.join('\n'), toFile: true }));

/**
 * Task 4
 * Error handling to both the synchronous and asynchronous solutions
 */
// Added getRandomWordSyncSecure() and getRandomWordSecure()

/**
 * Task 5
 * Write the information to a file in the root
 */
// Wrote to a file named "output.txt", by using { toFile: false } you can write to console