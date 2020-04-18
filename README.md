# Comparing JavaScript Testing Frameworks

<https://github.com/scraggo/compare-javascript-testing-frameworks>

JavaScript testing frameworks for comparison:

- Ava
- Jest
- Mocha (and an interesting plugin called mocha-parallel-tests)

This repo contains two things:

1. A node application that has the capability of running multiple tests in all of these frameworks.
2. [A companion article](comparing-javascript-frameworks.md) - an in-depth comparison of these frameworks. This article gives context about the motivation for making this application.

## About the application

In a nutshell, it's a test-runner that can handle multiple testing frameworks.

The number and length of the tests written to simulate a "true" test run in a significantly sized enterprise codebase. Each test runner has a template that will run the _same exact_ test blocks and take the _same exact_ amount of time in each block. (This is done with a `setTimeout` with a time that increases with each iteration of the loop that generates the test block.)

## Running the tests

`npm install` to install all the packages.

`npm run clean` (optional) to clear out all the generated test files.

`npm run make-tests` to generate test files.

`npm run test-all` to run all the generated tests and see a diagnostic output.

`npm run test-ava` to run the generated `ava` tests

`npm run test-jest` to run the generated `jest` tests

`npm run test-mocha` to run the generated `mocha` tests

`npm run test-parallel` to run the generated `mocha-parallel-tests` tests

## Development

`npm run lint` to lint files.

`npm run test` to run the internal codebase tests.
