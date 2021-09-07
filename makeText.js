/** Command-line tool to generate Markov text. */
const markov = require('./markov');
const fs = require('fs');
const axios = require('axios');

var myArgs = process.argv.slice(2);

function generateText(text, num = 100) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText(num));
}

function getFileText(file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    generateText(data);
  });
}

async function getURLText(url) {
  let resp;
  try {
    resp = await axios.get(url);
  } catch (err) {
    console.log(err);
  }
  generateText(resp.data);
}

let words = "";

if (myArgs.length == 0) {
  console.log('ERROR: Please choose a different set of args');
} else {
  switch (myArgs[0]) {
    case "file":
      getFileText(myArgs[1]);
      break;
    case "url":
      getURLText(myArgs[1]);
      break;
    default:
      console.log('ERROR: Please choose a different set of args');
      break;
  }
}