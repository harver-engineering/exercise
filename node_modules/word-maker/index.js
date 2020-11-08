const randomWords = require('random-words');

function getRandomWordSync({ withErrors = false } = {}) {
    if(withErrors && randomInRange(0, 5) === 5) {
        throw new Error('It failed :(');
    }
    return randomWords();
}

function getRandomWord({ withErrors = false, slow = false } = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => withErrors && randomInRange(0, 5) === 5 ? reject(new Error('It failed :(')) : resolve(randomWords()),
            // add some variance so order isn't totally predicatable in async version
            slow ? randomInRange(500 - 20, 500 + 20) : randomInRange(0, 20),
        );
    });
}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { getRandomWord, getRandomWordSync };