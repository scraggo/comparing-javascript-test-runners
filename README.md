# mocha-parallel-tests

[mocha-parallel-tests](https://github.com/mocha-parallel/mocha-parallel-tests)
executes each of your test files in a separate process while maintaining the output structure of mocha.

If you're using Node.JS >= 12 your tests execution will be even faster because `mocha-parallel-tests` supports running tests with Node.JS worker threads API.

## What do "serial" and "parallel" mean?

"Serial" - one at a time, ie - the first must complete before the second, the second must complete before the third, etc.

"Parallel" - happening simultaneously, ie - the first, second, third, etc can happen at the same time.

## Comparing with mocha

Run `npm run test` to run with `mocha`. Notice that the tests are run in serial.

> Since each test suite took 2 seconds, the total run time is 4 seconds.

Run `npm run test-parallel` to run with `mocha-parallel-tests`. Notice that the tests are run in parallel.

> Each test suite took 2 seconds, but they were run in parallel, so the total run time is 2 seconds.

## Only separate test files are run in parallel

Only separate test files are run in parallel. `describe` and `it` blocks in a given suite are run serially.

> Given this fact, any slow tests can be put into their own files to increase the speed of running all the unit tests.

## For consideration and drawbacks

- is a wrapper over `mocha`, not a plugin. May not be compatible with `mochapack` etc
- 34 open issues
- New in 2019, 9,217 weekly downloads
