/** Command-line tool to generate Markov text. */
const markov = require('./markov');
const fs = require('fs');
const https = require('https');

var myArgs = process.argv.slice(2);

let mm = new markov.MarkovMachine("the cat in the hat");

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
      let options = { host: myArgs[1], family: 4, port: 80, path: '/', method: 'GET' };
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);

        var data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          console.log(data);
        });
      });

      req.on('error', (e) => {
        console.log(e);
      });

      req.end();
      break;
    default:
      console.log('ERROR: Please choose a different set of args');
      break;
  }
}