const { promises: fsPromises } = require('fs');
const { range } = require('../range');
const { DEST_PATHS, TEMPLATE_PATHS, TEST_RUNNERS } = require('./config');

const getTestFilename = (num, testDir) => `${testDir}/fullCircle${num}.spec.js`;

// get testTemplate file as a string
const getTemplateFile = async templateFilePath =>
  fsPromises.readFile(templateFilePath, {
    encoding: 'utf8',
  });

// write template files to output test directory
const makeALotOfTestFiles = (template, testDir) =>
  Promise.resolve(
    range(0, 50).map(num =>
      fsPromises.writeFile(getTestFilename(num, testDir), template)
    )
  );

const generateTestFiles = () => {
  try {
    TEST_RUNNERS.forEach(async testRunner => {
      const testFile = await getTemplateFile(TEMPLATE_PATHS[testRunner]);
      await makeALotOfTestFiles(testFile, DEST_PATHS[testRunner]);
    });
  } catch (err) {
    console.error(err);
  }
};

generateTestFiles();
