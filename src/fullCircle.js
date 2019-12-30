/**
 * After a period of self-reflection (wait), we return our former self.
 * @param {any} self
 * @param {number} wait time in ms
 * @returns {any} self
 */
const fullCircle = (self, wait) => {
  const timeDone = Date.now() + wait;

  while (Date.now() < timeDone) {
    // do nothing
  }

  return self;
};

module.exports = { fullCircle };
