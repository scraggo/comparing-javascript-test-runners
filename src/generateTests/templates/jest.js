const { fullCircle, range } = require('../../src');

describe('mocha fullCircle', function() {
  range(0, 25).forEach(num => {
    it(`returns self in ${num} milliseconds`, function() {
      const res = fullCircle('hi', num);
      expect(res).toEqual('hi');
    });
  });
});
