# Comparing JavaScript Testing Frameworks

This article is the explanatory companion to <https://github.com/scraggo/compare-javascript-testing-frameworks> - a node application that has the capability of running multiple tests in the testing frameworks I'll be comparing here.

Outline

- Overview - the problem and how we'll address it
- Testing in general
- Requirements and nice-to-haves
- Frameworks in general
- Frameworks details

## Overview

The Problem

Technology is always changing. As a result, the frameworks in use this year may be superseded by other frameworks in the future. Despite this, we can assume that code should be tested and there are general principles we can adhere to.

Goals

This project is an exploration of test writing in general and how three popular testing frameworks may guide our testing practices.

The general principles we'll look into are:

- State: the pros and cons of sharing state between tests
- Documentation: writing tests that outline the functionality of the application
- Coverage: the extent to which one should measure test coverage
- Philosophy: "What" should we test? What level of "granularity" are we aiming for (unit vs integration vs acceptance tests)?

In recent years, JavaScript has become a viable language to learn given the drastic enhancements afforded by ES6 and later language specifications. As a result, many front-end frameworks have become massively popular. These frameworks are much easier to test than frameworks of years past. Three frameworks have risen far above the rest as the most popular choices:

- Ava <https://github.com/avajs/ava>
- Jest <https://jestjs.io/>
- Mocha <https://mochajs.org/>
  - and an interesting plugin called mocha-parallel-tests <https://github.com/mocha-parallel/mocha-parallel-tests>

Taking some requirements (that we will come up with) we can compare these frameworks on a number of points.

## Testing in general

There are differing opinions on what the "best practices" are for testing code. My opinion takes a pragmatic tone - we should test what is necessary to gain confidence that our application is running correctly and we should do it in a way that leverages existing tools that have been refined and have become trusted by the community.

- clear separation of unit, integration, e2e tests
  - what do you consider the "unit"?
  - don't test lib code
  - it's perfectly possible that your units work separately but not together
- no shared state between tests
- good coverage, giving confidence to refactor
- black box testing, not testing implementation (testing behavior)
- simple to understand, another form of documentation for the source code

  - can product owner read through tests? or are they abstract?

Code review: do tests meet the Acceptance Criteria?

Tip: read the test specs of a library, read open issues

- https://medium.com/@me_37286/yoni-goldberg-javascript-nodejs-testing-best-practices-2b98924c9347

## Requirements

### Speed

A testing framework should not be slow. We can only define this _relatively_ - for one person's _slow_ may be another person's _acceptable_. We will be benchmarking speed for all the frameworks.

### Ease of Use

A testing framework should be un-difficult to use. Again, this is another _relative_ definition. If it's too confusing to a developer to use, it will be less likely that tests will get written.

### Community Vetting

A testing framework should have community support. An unpopular framework may not have the kinks ironed out. It might have incomplete documentation (including stack overflow questions.) It might not have enough developers working on it to fix its issues.

### Works with your framework of choice (React, Redux, Electron, etc)

A testing framework must be compatible with what you're trying to test. It should be flexible enough to be able to adapt to the changing needs of those frameworks.

### Nice to Have

Depending on what you need to test, a framework should support:

- Webpack compilation (injecting of webpack-defined global variables)
  - simulating a CICD build step
- Babel transpilation of ESNext code
  - Use of alias module import statements (removing the need for `../../`)
- Mocking / Injecting modules (intercepting require statements), proxyquire/inject-loader
- Adding tools like coverage (`nyc`), snapshot testing, etc.
- Runs in CI/CD

## The Frameworks

- Mocha https://mochajs.org/
- Jest https://jestjs.io/
- Ava https://github.com/avajs/ava

mocha Weekly Downloads 3.5m | Last publish 10 days ago
jest Weekly Downloads 5.5m | Last publish 16 hours ago
mocha-webpack Weekly Downloads 47,311 | Last publish 2 years ago
mochapack Weekly Downloads 23,467 | Last publish 2 months ago
mocha-parallel-tests Weekly Downloads 18,097 | Last publish 5 months ago

### Comparison

https://www.slant.co/versus/12696/12697/~mocha_vs_jest
https://stackshare.io/stackups/ava-vs-mocha
https://raygun.com/blog/javascript-unit-testing-frameworks/
http://zpalexander.com/migrating-from-mocha-to-ava/

a cool example: https://github.com/tastejs/todomvc

#### Mocha

Can we go back to mocha without mocha-pack?

Pros:

- extensible
- https://github.com/mocha-parallel/mocha-parallel-tests

Cons:

- slower

#### Jest

Pros:

- developer experience
- fast
- integrated
- https://github.com/Raathigesh/majestic/

Cons:

- injected globals

#### Ava

Pros:

- extensible
- fast
- async

Cons:

- minimal

## mocha-parallel-tests

[mocha-parallel-tests](https://github.com/mocha-parallel/mocha-parallel-tests)
executes each of your test files in a separate process while maintaining the output structure of mocha.

If you're using Node.JS >= 12 your tests execution will be even faster because `mocha-parallel-tests` supports running tests with Node.JS worker threads API.

## What do "serial" and "parallel" mean?

"Serial" - one at a time, ie - the first must complete before the second, the second must complete before the third, etc.

"Parallel" - happening simultaneously, ie - the first, second, third, etc can happen at the same time.

## Comparing with mocha

Run `npm run clean && npm run make-tests` to generate latest test suites.

Run `npm run test-mocha` to run with `mocha`. Notice that the tests are run in serial.

> 1250 passing (15s)

Run `npm run test-parallel` to run with `mocha-parallel-tests`. Notice that the tests are run in parallel.

> 1250 passing (5s)

Tests on my machine are running 300% faster. _Theoretically_, they could be 1000+% faster if they were all truly in parallel. In reality, the more tests you have and the longer individual test suites take, the gains will be diminished.

## Only separate test files are run in parallel

Only separate test files are run in parallel. `describe` and `it` blocks in a given suite are run serially.

> Given this fact, any slow tests can be put into their own files to increase the speed of running all the unit tests.

## For consideration and drawbacks

- is a wrapper over `mocha`, not a plugin. May not be compatible with `mochapack` etc
- 34 open issues
- New in 2019, 9,217 weekly downloads
