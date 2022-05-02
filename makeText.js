/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
};

//read a text file and generate text from it

function makeText(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error(`Can't read the file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
};


// get data from an URL and make text from it.

async function makeURLText(url) {
    let resp;

    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Can't read the URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data);
}


// configure command line

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    makeURLText(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
