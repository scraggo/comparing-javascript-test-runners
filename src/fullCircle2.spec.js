const { expect } = require('chai');

const { fullCircle } = require('./fullCircle');

describe('fullCircle2', function() {
  it('returns self in 0 seconds', function() {
    const res = fullCircle('hi', 0);
    expect(res).to.equal('hi');
  });
  it('returns self in 2 seconds', function() {
    const res = fullCircle('hi', 2000);
    expect(res).to.equal('hi');
  });
});
