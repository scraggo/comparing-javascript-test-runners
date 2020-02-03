const isNumber = x => typeof x === 'number';

/**
 * @param {number} start inclusive
 * @param {number} end exclusive
 * @returns {number[]} array of numbers in range (start,end]
 */
const range = (start, end = 0) => {
  if (
    !isNumber(start) ||
    !isNumber(end) ||
    start < 0 ||
    end < 0 ||
    end < start
  ) {
    throw new Error('Invalid start and/or end');
  }

  const arr = [];

  if (start === 0 && end === 0) {
    return arr;
  }

  for (let i = start; i < end; i += 1) {
    arr.push(i);
  }

  return arr;
};

module.exports = { range };
