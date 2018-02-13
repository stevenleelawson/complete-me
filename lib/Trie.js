import Node from './Node.js';

export default class Trie {
  constructor() {
    this.children = {};
    this.count = 0;
  }
  insert(word) {
    this.count++;
    let letters = [...word];
    let currentLevel = this.children;

    while(letters.length) {
      let firstLetter = letters.shift();
      if(!currentLevel[firstLetter]) {
        currentLevel[firstLetter] = new Node();
      }
      if(!letters.length) {
        currentLevel[firstLetter].completeWord = word;
      }
      currentLevel = currentLevel[firstLetter].children;
    }
  }
  suggest(prefix) {
    let suggestions = [];
    let letters = [...prefix];
    let currentLevel = this.children;
    let result = [];
    while(letters.length) {
      let firstLetter = letters.shift();

      if(currentLevel[firstLetter]) {
        currentLevel = currentLevel[firstLetter].children;
      }

    }
    let lettersBelow = Object.keys(currentLevel);
    lettersBelow.forEach( (letter) => {
      while (currentLevel[letter]) {
        
      }
    })
    return suggestions;
  }
}
