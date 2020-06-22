const { range, shuffle } = require('../../src/utils');

describe('shuffle', function() {
  it('returns array of same length', function() {
    expect(shuffle([0, 1])).to.have.length(2);
    expect(shuffle([0, 1, 2])).to.have.length(3);
    expect(shuffle([0, 1, 2, 3])).to.have.length(4);
  });

  it('eventually shuffles cloned array', function() {
    const arr = [0, 1];
    const NUM_OF_RUNS = 5;
    const runs = range(0, NUM_OF_RUNS).map(() => shuffle(arr, { clone: true }));

    expect(runs).to.deep.include([1, 0]);
  });
});
