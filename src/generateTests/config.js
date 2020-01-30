const AVA = 'ava';
const JEST = 'jest';
const MOCHA = 'mocha';
const TEST_RUNNERS = [AVA, JEST, MOCHA];

// relative to root
const TEST_DIR = './test';
const TEMPLATE_DIR = './src/generateTests/templates';

const getTemplatePath = testRunner => `${TEMPLATE_DIR}/${testRunner}.js`;
const getDestPath = testRunner => `${TEST_DIR}/${testRunner}`;

/**
 * {
 *   ava: {
 *     dest: 'path',
 *     template: 'path'
 *   },
 *   ...etc
 * }
 */
const TEMPLATE_PATHS = TEST_RUNNERS.reduce((acc, testRunner) => {
  acc[testRunner] = {
    dest: getDestPath(testRunner),
    template: getTemplatePath(testRunner),
  };
  return acc;
}, {});

module.exports = {
  TEMPLATE_PATHS,
  TEST_RUNNERS,
};
