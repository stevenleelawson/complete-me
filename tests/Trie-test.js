import { expect } from 'chai';
import Node from '../lib/Node.js';
import Trie from '../lib/Trie.js';

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
  it('should track the number of words', () => {
    expect(trie.count).to.equal(0);
  })
  it('should store child nodes', () => {
    expect(trie.children).to.deep.equal({});
  })

  describe('Count',  () => {
    it.skip('should be able to count the number of words', () => {
      // trie.count();
      trie.insert('pizza');
      expect(trie.count).to.equal(1);
    })
  })
  describe('Insert', () => {
    it('should be able to count the number of words', () => {
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

    // expect(Object.keys(trie.children)).to.deep.equal(['t', 'p', 'c']);
    expect(trie.children['c']).to.exist;
    expect(trie.children['c'].children['a']).to.exist;
    expect(trie.children['c'].children['a'].children['r']).to.exist;
    expect(trie.children['c'].children['a'].children['r'].completeWord).to.equal('car');
    console.log(JSON.stringify(trie, null, 4))
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

      // expect(check1).to.be.true;
      // expect(check2).to.be.true;
      // expect(check3).to.be.true;
      // expect(check4).to.be.false;
      console.log(JSON.stringigy(trie, null, 4))
    })
  })
  describe('Populate', () => {

  })
  describe('Select', () => {

  })
  describe('Delete', () => {

  })
})
