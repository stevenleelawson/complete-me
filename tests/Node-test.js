import { expect } from 'chai';
import Node from '../lib/Node';

describe('Node', () => {
  let node;

  beforeEach( () => {
    node = new Node('taco')
  })
  it('should be a thing', () => {
    expect(node).to.exist
  })
  it('should have a completeWord property, assigned to zero', () => {
    expect(node.completeWord).to.equal(0);
  })
  it('should be able to store child nodes', () => {
    expect(node.children).to.deep.equal({});
  })
})
