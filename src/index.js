const { getRandomWordSync, getRandomWord } = require('word-maker');

// create numbers from 1 to 100
const ids = Array.from(Array(100).keys()).map( id => id + 1);

/**
 * Task 1
 * Print numbers from 1 to 100 to the console, but for each number also print a random word
 */
console.info("\n*** Task 1 ***\n");

const randomWords = (id) => id + ": " + getRandomWordSync();
ids.map(id => console.log(randomWords(id)));

/**
 * Task 2
 * Random words with "Fizz Buzz" program
 */
console.info("\n*** Task 2 ***\n");

// "Fizz Buzz" program
const doFizzBuzz = (id) => (id%3 === 0 ? "Fizz" : "") + (id%5 === 0 ? "Buzz" : "");

const fizzBuzzRandomWords = (id) => id + ": " + (doFizzBuzz(id) || getRandomWordSync());
ids.map(id => console.log(fizzBuzzRandomWords(id)));

/**
 * Task 3
 * Asynchronous Implementations of Task 1 & 2
 */

// 3.1 Async Random Words

const randomWordsAsync = async (id) => id + ": " + await getRandomWord();
let promises = ids.map(id => randomWordsAsync(id));
Promise.all(promises).then(output => console.log(output.join('\n')));

// 3.2 Async Random words with "Fizz Buzz" program

const fizzBuzzRandomWordsAsync = async (id) => id + ": " + (doFizzBuzz(id) || await getRandomWord());
let promises2 = ids.map(id => fizzBuzzRandomWordsAsync(id));
Promise.all(promises2).then(output => console.log(output.join('\n')));