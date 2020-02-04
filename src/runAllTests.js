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

const formatNPMName = argsArray => `npm ${argsArray.join(' ')}`;

const formatExecutionTime = (start, message = '()') => {
  console.log(`"${message}" took ${(Date.now() - start) / 1000}s to execute.`);
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
const sliced = testRunners.slice(0, 1);

const main = async () => {
  try {
    const testResults = await Promise.all(
      sliced.map(async name => {
        const { run } = testData[name];
        const executionTime = await run();
        testData[name].executionTime = executionTime;
        return testData[name];
      })
    );
    // sort and prettify the results
    console.log(JSON.stringify(testResults));
  } catch (error) {
    console.error(error);
  }
};

main();
