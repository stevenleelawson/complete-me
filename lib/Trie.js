import Node from './Node.js';

export default class Trie {
  constructor() {
    this.children = {};
    this.count = 0;
  }
  insert(word) {

    const addWordToTrie = (node, word) => {
      const firstLetter = word[0];
      if (!node.children[firstLetter]) {
        node.children[firstLetter] = new Node(firstLetter);
      }
      if (word.length === 1) {
        this.count++;
        node.children[firstLetter].completeWord = true;
      }
      if (word.length > 1) {
        addWordToTrie(node.children[firstLetter], word.slice(1));
      }
    }

    addWordToTrie(this, word);
  }
  suggest(prefix) {
    const suggestions = [];
    let currentNode = this;
    let count = 0;

    while (count < prefix.length) {
      if (currentNode.children[prefix[count]]) {
        currentNode = currentNode.children[prefix[count]];
      }
      count++;
    }

    const addSuggestion = (node, prefix) => {
      if(node.completeWord) {
        suggestions.push(prefix);
      }

      const childNodes = Object.keys(node.children);

      childNodes.forEach((child) => {
        const newString = prefix + child;

        addSuggestion(node.children[child], newString)
      });
    }

    addSuggestion(currentNode, prefix);

    return suggestions;
  }
  
  populate(array) {
    array.forEach( word => {
      this.insert(word);
    })
  }
  select(word) {
    let currentNode = this.suggest(word);
    currentNode.completeWord++;
  }

}
