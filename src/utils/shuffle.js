/**
 * Fisher Yates Shuffle
 * @param {Array} arrInput
 * @param {Object} [options={}]
 * @param {boolean} [options.clone=false]
 * @returns {Array} shuffled array
 */
function shuffle(arrInput, { clone = false } = {}) {
  const arr = clone ? arrInput.slice() : arrInput;

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

module.exports = { shuffle };
