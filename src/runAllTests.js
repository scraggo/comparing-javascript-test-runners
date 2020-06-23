const execa = require('execa');

const { getDateTime, shuffle } = require('./utils');

// CONSTANTS

const TEST_RUNNERS = ['ava', 'jest', 'mocha', 'parallel'];
const DOTS = '. '.repeat(16);
const testRunners = shuffle(TEST_RUNNERS);

// just run one for now
// const testRunners = shuffle(TEST_RUNNERS).slice(0, 1);

// UTILS

/**
 * @param {string[]} argsArray - the 'command', ex ['run', 'start']
 * @param {object} options
 * @param {boolean} options.log output to console
 * @returns {function} function that runs npm script
 */
const makeNPMScript = (argsArray, options = {}) => () => {
  const { log } = options;
  let execaOptions = {};
  if (log === true) {
    execaOptions = {
      all: true,
      // these are necessary in order to keep console colors and formatting
      stdio: 'inherit',
      sterr: 'inherit',
    };
  }
  execa.sync('npm', argsArray, execaOptions);
};

/**
 * @param {string[]} argsArray - the 'command', ex ['run', 'start']
 * @returns {string}
 */
const formatNPMName = argsArray => `npm ${argsArray.join(' ')}`;

const formatExecutionTime = (executionTime, message = '()') => {
  return `"${message}" took ${executionTime / 1000}s to execute.`;
};

/**
 * @param {object} resultObj ex: {"command":["run","test-ava"],"executionTime":7989,"name":"ava"}
 * @returns {string}
 */
const formatResult = resultObj => {
  const { command, executionTime, name } = resultObj;
  const message = formatNPMName(command);
  const title = `${name.toUpperCase()}`;
  return [title, formatExecutionTime(executionTime, message)].join('  ');
};

/**
 * Runs script
 * @param {object} scriptObj
 * @returns {number} execution time in ms
 */
const runScript = scriptObj => {
  const start = Date.now();
  const { script } = scriptObj;
  script();
  return Date.now() - start;
};

const logTestTitle = name => {
  console.log('\n\n', DOTS, '\n   running tests for', name, '\n', DOTS, '\n\n');
};

const logResultsHeader = () => {
  console.log(`\n${'-*'.repeat(20)}`);
  console.log(`RESULTS ${getDateTime()}`);
  console.log('order:', testRunners);
  console.log('');
};

// sort, format, and log test results
const logResults = resultsArr => {
  resultsArr
    .sort((a, b) => a.executionTime - b.executionTime)
    .map(formatResult)
    .forEach(result => {
      console.log(result);
    });
};

// MAIN

const testData = testRunners.reduce((acc, name) => {
  const command = ['run', `test-${name}`];
  acc[name] = {
    command,
    executionTime: -1,
    name,
    run: () =>
      runScript({
        script: makeNPMScript(command, { log: true }),
      }),
  };
  return acc;
}, {});

const main = () => {
  try {
    const testResults = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const name of testRunners) {
      const { run } = testData[name];

      logTestTitle(name);

      testData[name].executionTime = run();
      testResults.push(testData[name]);
    }

    logResultsHeader();
    logResults(testResults);
  } catch (error) {
    console.error(error);
  }
};

main();
