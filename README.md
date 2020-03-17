# Comparing JavaScript Testing Frameworks

https://github.com/scraggo/compare-javascript-testing-frameworks

Frameworks for comparison:

- Ava
- Jest
- Mocha (and an interesting plugin called mocha-parallel-tests)

This repo is a node application that has the capability of running multiple tests in all three of these frameworks.

## Running the tests

`npm install` to install all the packages.

`npm run clean` (optional) to clear out all the generated test files.

`npm run make-tests` to generate test files.

`npm run test-all` to run all the generated tests and see a diagnostic output.

`npm run test-ava` to run all the generated `ava` tests

`npm run test-jest` to run all the generated `jest` tests

`npm run test-mocha` to run all the generated `mocha` tests

`npm run test-parallel` to run all the generated `mocha-parallel-tests` tests

## Development

`npm run lint` to lint files.

`npm run test` to run the internal codebase tests.
