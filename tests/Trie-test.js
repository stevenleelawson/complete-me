import { expect } from 'chai';
import Node from '../lib/Node.js'
import Trie from '../lib/Trie.js'
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('TRIE', () => {

  let trie;

  beforeEach(() => {
    trie = new Trie('pizza');
  });

  it('should exist', () => {
    expect(trie).to.exist
  })

  it('should track the number of words', () => {
    expect(trie.wordCount).to.equal(0)
  })

  it('should store child nodes', () => {
    expect(trie.children).to.deep.equal({})
  })

  describe('INSERT', () => {

    it('should be able to increment the count', () => {
      expect(trie.wordCount).to.equal(0)
      trie.insert("pizza");
      expect(trie.wordCount).to.equal(1)
    })

    it('should create keys in children object of first letter', () => {
      trie.insert('pizza');
      trie.insert('cat');
      trie.insert('piano');
      // console.log(JSON.stringify(trie, null, 4))
      expect(Object.keys(trie.children)).to.deep.equal(['p','c'])
    })

    it('should be able to take in more than one word starting w/ the same letter', () => {
      trie.insert('pizza');
      trie.insert('pizzas');
      trie.insert('piano');
      trie.insert('dogs');
      trie.insert('dog');
      expect(Object.keys(trie.children)).to.deep.equal(['p','d']);
      expect(trie.wordCount).to.equal(5);
    })
    it('should only increment once if the same word is entered twice', () =>{
      trie.insert('taco');
      expect(trie.wordCount).to.equal(1);

      trie.insert('taco');
      expect(trie.wordCount).to.equal(1);
    })
  })

  describe('COUNT', () => {

      it('should count the amount of words inserted', () => {
        trie = new Trie()
        expect(trie.wordCount).to.equal(0);
        trie.insert("pizza")
        expect(trie.wordCount).to.equal(1);
        trie.insert("pineapple")
        expect(trie.wordCount).to.equal(2);
      })
  })

  describe('SUGGEST', () => {
    beforeEach(() => {
      trie.insert('pizza');
      trie.insert('pizzas');
      trie.insert('piano');
      trie.insert('dogs');
      trie.insert('dog');
    })

    it('should return an array of suggested words', () => {
      let results = trie.suggest('pi');
      let check1 = results.some(result => result === 'pizza')
      let check2 = results.some(result => result === 'pizzas')
      let check3 = results.some(result => result === 'piano')

      expect(check1).to.equal(true)
      expect(check2).to.equal(true)
      expect(check3).to.equal(true)
    })
    it('should NOT return a suggested word that does not begin with the entered prefix', () => {
      let results = trie.suggest('pi');
      let check1 = results.some(result => result === 'place')
      expect(check1).to.equal(false)
    })
  })

  describe('POPULATE', () => {

    it('should populate all the words of the dictionary', () => {
      expect(trie.wordCount).to.equal(0)
      trie.populate(dictionary);
      expect(trie.wordCount).to.equal(235886)
    })

    it('should suggest words from the dictionary', () => {
      trie.populate(dictionary);
      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle'])
    })
    it('should NOT suggest words that are NOT in the dictionary', () => {
      trie.populate(dictionary);
      expect(trie.suggest('ga')).to.not.deep.equal(['gazorp'])
    })
  })

  describe('SELECT', () => {

    it('should move a word that has been selected to the front of the suggest array', () => {
      trie.populate(dictionary);
      trie.suggest('piz');
      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle'])
      trie.select('pizzeria');
      trie.suggest('piz');
      expect(trie.suggest('piz')).to.deep.equal(['pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle'])
    })
    it('should increment the completeWord word property if a word is entered more than once', () => {
      trie.insert('dog');
      trie.select('dog');
      trie.select('dog');
      expect(trie.children['d'].children['o'].children['g'].completeWord).to.equal(3);
    })
  })

  describe('DELETE', () => {

    it('should remove a word that has been selected from the suggest array', () => {
      trie.populate(dictionary);
      trie.suggest('piz');
      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle'])
      trie.delete('pizzle');
      trie.suggest('piz');
      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato'])
    })
  })
})
