const test = require('ava');

const { fullCircle, range } = require('../../src');

test('ava fullCircle', t => {
  range(0, 25).forEach(num => {
    const res = fullCircle('hi', num);
    t.is(res, 'hi');
  });
});
