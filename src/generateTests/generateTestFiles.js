const { promises: fsPromises } = require('fs');

const { range } = require('../utils');
const { TEMPLATE_PATHS, TEST_RUNNERS } = require('./config');

const createTestFilename = (num, testDir, testRunner) =>
  `${testDir}/${testRunner}-fullCircle${num}.spec.js`;

// get testTemplate file as a string
const getTemplateFile = async templateFilePath =>
  fsPromises.readFile(templateFilePath, {
    encoding: 'utf8',
  });

// write template files to output test directory
const makeALotOfTestFiles = (template, testDir, testRunner) =>
  Promise.resolve(
    range(0, 50).map(num =>
      fsPromises.writeFile(
        createTestFilename(num, testDir, testRunner),
        template
      )
    )
  );

const generateTestFiles = () => {
  try {
    TEST_RUNNERS.forEach(async testRunner => {
      const { dest, template } = TEMPLATE_PATHS[testRunner];
      const testFile = await getTemplateFile(template);
      await makeALotOfTestFiles(testFile, dest, testRunner);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  generateTestFiles,
};
