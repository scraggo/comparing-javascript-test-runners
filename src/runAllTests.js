const execa = require('execa');

// SCRIPTS

const commands = ['ava', 'jest', 'mocha', 'parallel'].map(command => [
  'run',
  `test-${command}`,
]);

// UTILS

const makeNPMScript = (argsArray, options = {}) => async () => {
  const { log } = options;
  const { stdout } = await execa('npm', argsArray);
  if (log === true) {
    console.log(stdout);
  }
};

const getNPMName = argsArray => `npm ${argsArray.join(' ')}`;

// is this milliseconds or microseconds?
const logExecutionTime = (start, message = '()') => {
  console.log(`"${message}" took ${(Date.now() - start) / 1000}s to execute.`);
};

const runScript = async scriptObj => {
  const now = Date.now();
  const { name, script } = scriptObj;
  await script();
  logExecutionTime(now, name);
};

// MAIN

// https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e
const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );

const main = async () => {
  try {
    await promiseSerial(
      commands.map(command => {
        return () =>
          runScript({
            name: getNPMName(command),
            script: makeNPMScript(command),
          });
      })
    );
  } catch (error) {
    console.error(error);
  }
};

main();
