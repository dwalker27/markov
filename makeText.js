/** Command-line tool to generate Markov text. */
const markov = require('./markov');
const fs = require('fs');

var myArgs = process.argv.slice(2);

let mm = new markov.MarkovMachine("the cat in the hat");
console.log(mm.makeText());