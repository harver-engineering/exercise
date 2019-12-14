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