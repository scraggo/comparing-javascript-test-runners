const execa = require('execa');

// CONSTANTS

const testRunners = ['ava', 'jest', 'mocha', 'parallel'];

// UTILS

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

// [{"command":["run","test-ava"],"executionTime":7989,"name":"ava"}]
const formatResult = resultObj => {
  const { command, executionTime, name } = resultObj;
  const message = formatNPMName(command);
  const title = `Test runner: ${name}`;
  return [title, formatExecutionTime(executionTime, message), '---'].join('\n');
};

const runScript = async scriptObj => {
  const start = Date.now();
  const { script } = scriptObj;
  await script();
  return Date.now() - start;
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
        name,
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
        const executionTime = await run();
        testData[name].executionTime = executionTime;
        return testData[name];
      })
    );
    // sort and prettify the results
    testResults
      .sort((a, b) => a.executionTime - b.executionTime)
      .map(formatResult)
      .forEach(result => {
        console.log(result);
      });
  } catch (error) {
    console.error(error);
  }
};

main();
