const { expect } = require('chai');

const { range } = require('../src');

describe('range', function() {
  it('returns range array length 1', function() {
    expect(range(0, 1)).to.deep.equal([0]);
  });
  it('returns range array length 2', function() {
    expect(range(0, 2)).to.deep.equal([0, 1]);
  });
  it('returns range array with different start, length 2', function() {
    expect(range(2, 4)).to.deep.equal([2, 3]);
  });
  it('returns empty array if end is undefined', function() {
    const res = range(0);
    expect(res).to.deep.equal([]);
  });
  it('throws error under bad conditions', function() {
    expect(() => range()).to.throw;
    expect(() => range(-1)).to.throw;
    expect(() => range(-2, -1)).to.throw;
    expect(() => range(2, 1)).to.throw;
  });

  // it('returns self in 2 seconds', function() {
  //   const res = fullCircle('hi', 2000);
  //   expect(res).to.equal('hi');
  // });
});
