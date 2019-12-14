const { appendFile } = require('fs');

/**
 * Write the data to the console or a file
 */
const write = ({ data = '', toFile = false} = {}) => {
    if (toFile) {
        appendFile('output.txt', data + '\n', (error) => {
            if (error) throw error;
    });
    } else {
        console.log(data);
    }
};

module.exports = {write};