import { expect } from 'chai';
import Node from '../lib/Node.js';
import Trie from '../lib/Trie.js';
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie', () => {
  let trie;

  beforeEach( () => {
    trie = new Trie();
  })
  it('should be a thing', () => {
    expect(trie).to.exist
  })
  it('should be an instance of Trie', () => {
    expect(trie).to.be.an.instanceOf(Trie);
  })
  it.skip('should track the number of words', () => {
    expect(trie.count).to.equal(0);
  })
  it('should store child nodes', () => {
    expect(trie.children).to.deep.equal({});
  })

  describe('Insert', () => {
    it('should increment the number of words', () => {
      // trie.count();
      trie.insert('pizza');
      expect(trie.count).to.equal(1);
    })

    // it('should be able to split strings into individual letters', () =>{
    // trie.insert('pizza');
    // expect(trie).to.deep.equal(['p','i','z','z','a'])
    // })
    it('should create keys in children object of first letter', () =>{
    trie.insert('tacoCat');
    trie.insert('pizza');
    trie.insert('car');

    expect(Object.keys(trie.children)).to.deep.equal(['t', 'p', 'c']);

   })
  })
  describe('Suggest', () => {
    beforeEach( () => {
      trie.insert('piano');
      trie.insert('pizza');
      trie.insert('pizzas');
      trie.insert('dog');
    })
    it('should return an array of suggested words', () => {
      let results = trie.suggest('pi');
      let check1 = results.some(result => result === 'piano')
      let check2 = results.some(result => result === 'pizza')
      let check3 = results.some(result => result === 'pizzas')
      let check4 = results.some(result => result === 'dog')
      // expect(results).to.eql(['piano', 'pizza', 'pizzas'])

      expect(check1).to.be.true;
      expect(check2).to.be.true;
      expect(check3).to.be.true;
      expect(check4).to.be.false;
    })
  })
  describe('Populate', () => {
    it('should insert an array of words', () => {
      let array = ['piano', 'cat', 'dog'];

      expect(trie.count).to.equal(0);
      trie.populate(array);
      expect(trie.count).to.equal(3);

    })
    it('should populate a dictionary of words', () => {
      expect(trie.count).to.equal(0);
      trie.populate(dictionary);
      expect(trie.count).to.equal(235886);

    })
  })
  describe('Select', () => {
    it('should prioritize selected words in a small array', () => {
      let array = ['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle'];

      trie.populate(array);
      expect(trie.suggest('piz').to.deep.equal(['pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle']))
    })
    it('should prioritize selected words in a small array', () => {
      let array = ['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle'];

      trie.populate(dictionary);
      expect(trie.suggest('piz').to.deep.equal(['pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle']))
    })
  })
  describe('Delete', () => {
    it('should remove deleted word from suggestions', () => {
      trie.poplulate(dictionary);

      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle'])

      trie.delete('pizzeria');
      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza',  'pizzicato', 'pizzle'])
    })
  })
})
