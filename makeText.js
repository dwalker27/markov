/** Command-line tool to generate Markov text. */
const markov = require('./markov');
const fs = require('fs');
const axios = require('axios');

var myArgs = process.argv.slice(2);

let mm = new markov.MarkovMachine("the cat in the hat");

async function getURLText(url) {
  let resp;
  try {
    resp = await axios.get(url);
  } catch (err) {
    console.log(err);
  }
  mm = new markov.MarkovMachine(resp.data);
  console.log(mm.makeText());
}

let words = "";

if (myArgs.length == 0) {
  console.log('ERROR: Please choose a different set of args');
} else {
  switch (myArgs[0]) {
    case "file":
      fs.readFile(myArgs[1], 'utf8', (err, data) => {
        if (err) {
          return console.log(err);
        }
        let mm = new markov.MarkovMachine(data);
        console.log(mm.makeText());
      });
      break;
    case "url":
      getURLText(myArgs[1]);
      break;
    default:
      console.log('ERROR: Please choose a different set of args');
      break;
  }
}