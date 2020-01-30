const AVA = 'ava';
const JEST = 'jest';
const MOCHA = 'mocha';
const TEST_RUNNERS = [AVA, JEST, MOCHA];

// relative to root
const TEST_DIR = './test';

// relative to this file
const TEMPLATE_DIR = './templates';

const getTemplatePath = testRunner => `${TEMPLATE_DIR}/${testRunner}`;
const getDestPath = testRunner => `${TEST_DIR}/${testRunner}`;

// const TEMPLATE_PATHS = TEST_RUNNERS.map(testRunner =>
//   getTemplatePath(testRunner)
// );
const TEMPLATE_PATHS = TEST_RUNNERS.reduce((acc, testRunner) => {
  acc[testRunner] = getTemplatePath(testRunner);
  return acc;
}, {});

// const DEST_PATHS = TEST_RUNNERS.map(testRunner => getDestPath(testRunner));
const DEST_PATHS = TEST_RUNNERS.reduce((acc, testRunner) => {
  acc[testRunner] = getDestPath(testRunner);
  return acc;
}, {});

module.exports = {
  DEST_PATHS,
  TEMPLATE_PATHS,
  TEST_RUNNERS,
};
