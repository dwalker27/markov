class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains(words);
  }

  makeChains() {
    let chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let keys = Object.keys(chains);
      //if not the last word, use it, otherwise, declare null
      let word = i != this.words.length - 1 ? this.words[i + 1] : null;
      if (chains.hasOwnProperty(this.words[i])) {
        //existing word, just add to the array
        chains[this.words[i]].push(word);
      } else {
        chains[this.words[i]] = [];
        chains[this.words[i]].push(word);
      }
    }
    return chains;
  }

  makeText(numWords = 100) {
    console.log(this.chains);
    let result = [];
    let keys = Object.keys(this.chains);
    let i = Math.floor(Math.random() * keys.length);
    result.push(keys[i]);

    for (i = 1; i < numWords; i++) {
      let rnd = Math.floor(Math.random() * this.chains[result[i - 1]].length);
      if (this.chains[result[i - 1]][rnd] === null)
        break;

      result.push(this.chains[result[i - 1]][rnd]);
    }
    return result.join(' ');
  }
}

module.exports = { MarkovMachine };