const test = require('ava');

const { fullCircle } = require('../../src/fullCircle');
const { range } = require('../../src/utils');

test('ava fullCircle', t => {
  range(0, 25).forEach(num => {
    const res = fullCircle('hi', num);
    t.is(res, 'hi');
  });
});
