const execa = require('execa');

// CONSTANTS

const testRunners = ['ava', 'jest', 'mocha', 'parallel'];

// UTILS

/**
 * @param {string[]} argsArray - the 'command', ex ['run', 'start']
 * @param {object} options
 * @param {boolean} options.log output to console
 * @returns {function} async function that runs npm script
 */
const makeNPMScript = (argsArray, options = {}) => async () => {
  const { log } = options;
  const { stdout } = await execa('npm', argsArray);
  if (log === true) {
    console.log(stdout);
  }
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
const runScript = async scriptObj => {
  const start = Date.now();
  const { script } = scriptObj;
  await script();
  return Date.now() - start;
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
        script: makeNPMScript(command),
      }),
  };
  return acc;
}, {});

// just run one for now
// const sliced = testRunners.slice(0, 1);

const main = async () => {
  try {
    const testResults = await Promise.all(
      testRunners.map(async name => {
        const { run } = testData[name];
        testData[name].executionTime = await run();
        return testData[name];
      })
    );
    logResults(testResults);
  } catch (error) {
    console.error(error);
  }
};

main();
