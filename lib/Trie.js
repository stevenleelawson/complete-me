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

    const suggestions = [];
    //make suggestion array
    let currentNode = this.traverse(prefix);
    //call traverse to get current node
    const addSuggestion = (node, prefix) => {
    //create add suggestion function
      if (node.completeWord) {
    //if it's a complete word
        if (node.completeWord > 1) {
          suggestions.unshift(prefix);
          //if it's been selected before, unshift to front
        } else {
          suggestions.push(prefix);
          //if been selected before, to front
        }
      }
      //if it's not
      const childNodes = Object.keys(node.children);
      //get keys of all nodes on same level
      childNodes.forEach((child) => {
        const newString = prefix + child;
        //assign new variable containing prefix + child
        addSuggestion(node.children[child], newString);
        //recursively call to finish word
      });
    };

    addSuggestion(currentNode, prefix);
    //kick of function with currentNode and prefix as args
    return suggestions;
    //return the suggestions array
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
