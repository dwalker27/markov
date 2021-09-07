class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains(words);
  }

  makeChains(words) {
    let chains = {};
    for (let i = 0; i < words.length; i++) {
      let keys = Object.keys(chains);
      //if not the last word, use it, otherwise, declare null
      let word = i != words.length - 1 ? words[i + 1] : null;
      if (chains.hasOwnProperty(words[i])) {
        //existing word, just add to the array
        chains[words[i]].push(word);
      } else {
        chains[words[i]] = [];
        chains[words[i]].push(word);
      }
    }
    console.log(chains);
    return chains;
  }

  makeText(numWords = 100) {
    // TODO
  }
}

let mm = new MarkovMachine("the cat in the hat");