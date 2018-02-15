import Node from './Node.js';

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.children = {};
  }

  insert(word) {
    this.addWordToTrie(this, word)
    //try to do with while loop instead of recursion
  }
  addWordToTrie (node, word) {
    const firstLetter = word[0];

    if (!node.children[firstLetter]) {
      node.children[firstLetter] = new Node(firstLetter);
    }

    if (word.length > 1) {
      this.addWordToTrie(node.children[firstLetter], word.slice(1))
    }

    if(word.length === 1 && !node.children[firstLetter].completeWord) {
      this.wordCount++;
      node.children[firstLetter].completeWord = 1;
    }
  }
  suggest(prefix) {
    //before the weekend annotate suggest and helper and send Leta repo
    const suggestions = [];
    let currentNode = this.traverse(prefix);

    const addSuggestion = (node, prefix) => {
      if (node.completeWord) {
        if (node.completeWord > 1) {
          suggestions.unshift(prefix);
        } else {
          suggestions.push(prefix);
        }
      }

      const childNodes = Object.keys(node.children);

      childNodes.forEach((child) => {
        const newString = prefix + child;

        addSuggestion(node.children[child], newString);
      });
    };

    addSuggestion(currentNode, prefix);

    return suggestions;
  }

  traverse(prefix) {
    let currentNode = this;
    let count = 0;

    while ( count < prefix.length) {
      if (currentNode.children[prefix[count]]) {
        currentNode = currentNode.children[prefix[count]];
      }
      count++;
    }
    return currentNode;
  }

  populate(array) {
    array.forEach( word => {
      this.insert(word);
    });
  }

  select(word) {
    let currentNode = this.traverse(word);

    currentNode.completeWord++;
  }

  delete(word) {
    let currentNode = this.traverse(word);

    currentNode.completeWord = 0;
  }
}
