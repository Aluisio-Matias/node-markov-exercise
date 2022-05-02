/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i] + " " + this.words[i + 1];
      let nextWord = this.words[i + 2] || null;

      if (chains.has(word))
        chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
  }


  //get random choice from array
  choice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }


  /** return random text from chains, and select the number of words to print.*/
  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = this.choice(keys);
    let output = [];

    //create markov chain until reaching termination word
    while (output.length <= numWords && key !== null) {
      let [word1, word2] = key.split(" ");
      output.push(word1);
      key = word2 + " " + this.choice(this.chains.get(key));
    }
    return output.join(" ")
  }
}

module.exports = {
  MarkovMachine,
};