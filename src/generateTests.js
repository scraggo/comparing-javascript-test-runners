const { promises: fsPromises } = require('fs');
const { range } = require('./range');

const TEST_DIR = './test';

const getTestFilename = num => `${TEST_DIR}/fullCircle${num}.spec.js`;

// read testTemplate file
const getTemplateFile = async () =>
  fsPromises.readFile('./src/testTemplate.js', {
    encoding: 'utf8'
  });

const makeALotOfTestFiles = template =>
  Promise.resolve(
    range(0, 50).map(num =>
      fsPromises.writeFile(getTestFilename(num), template)
    )
  );

const main = async () => {
  try {
    const testFile = await getTemplateFile();
    await makeALotOfTestFiles(testFile);
  } catch (err) {
    console.error(err);
  }
};

main();
