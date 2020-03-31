# Comparing JavaScript Testing Frameworks

This article is a comparison of the AVA, Jest, Mocha (along with the Mocha wrapper `mocha-parallel-tests`) JavaScript testing frameworks.

The article has a companion repo: <https://github.com/scraggo/compare-javascript-testing-frameworks> - a node application that has the capability of creating and running tests in the frameworks listed above.

Outline

- Overview - the problem and how we'll address it
- Testing in general
- Requirements and nice-to-haves
- Frameworks in general
- Frameworks details

## Overview

### The Problem

Technology is always changing. As a result, the popular frameworks of today may become unpopular tomorrow. Despite this, we can assume that code should be tested and there are general principles we can adhere to.

In recent years, JavaScript has become a more robust language thanks to the steady cadence of enhancements starting with ES6/2015. As a result, many front-end frameworks can accomplish the task of creating serious web applications. In general, these frameworks are much easier to test than frameworks of years past. Three testing frameworks have risen far above the rest as the most popular choices:

- AVA <https://github.com/avajs/ava>
- Jest <https://jestjs.io/>
- Mocha <https://mochajs.org/>
  - and an interesting plugin called mocha-parallel-tests <https://github.com/mocha-parallel/mocha-parallel-tests>

### Goals

The immediate practical goal of this article is to help you choose a JavaScript testing framework. My aim is to address the following questions:

**How does one choose the right testing framework for their use case? What criteria should one base their decision on?**

In order to do this, we'll explore some general principles about testing frameworks and testing in general. Once we've established this, we can come up with our criteria for evaluation. Then, we can explore frameworks in general and the details.

## Testing in general

There are differing opinions on what the "best practices" are for testing code. I have a pragmatic opinion - we should test what is necessary to gain confidence that our application is running correctly and we should do it in a way that leverages existing tools that have been refined and are trusted by the developer community.

The general principles I think are important are:

### Documentation: writing tests that outline the functionality of the application

- A test description should be simple to understand. Written in this way, the tests are another form of documentation for the source code. A product owner should be able to read through the tests and understand their relation to the application as a whole.
- In the case of testing abstractions, we should take time to be even clearer about the utility of such a test.

### Philosophy: "What" should we test? What level of "granularity" are we aiming for?

- A unit test has the smallest scope of the test types. What may be under test is a function or a class.
- An integration test has a mid-level scope. It's goal is to combine individual units test them as a group with the aim of assuring that they run correctly when interacting with each other. What we want to avoid is the scenario where your units work perfectly in isolation, but not together.
- An acceptance test (a.k.a. end to end test) has the highest scope. It's goal is to test as an end user would use the application without directly calling source code.
- When in doubt:
  - It should be clear where unit, integration, and acceptance tests are.
  - Think of the unit under test as a "black box" whenever possible. The goal should be to test the _behavior_ of the unit, not how it's implemented.
  - Don't test external library code. We should be using high-quality libraries that have their own test suites.

### State: the pros and cons of sharing state between tests

- Ideally, one doesn't share state between tests, period. Test suites (a file that contains test blocks) should definitely aim to steer clear of shared state. Individual test blocks should have a clean version of the unit under test.
- In a few cases, shared setup between test blocks may be necessary. An example of this is when we're making assertions during an end-to-end test that has many steps.

### Coverage: the extent to which one should measure test coverage

- Using test coverage tools gives us a metric for how many lines, statements, or blocks of your code are tested. Your team may decide that 100% test coverage is necessary. My feeling is that you should cover all _essential_ functions, the goal being that after changing code, your tests will fail if your changes affected anything that it could have affected.
- Another "metric" that I like to use while reviewing code is analyzing the changes for the big picture: Do the tests cover what was in the "acceptance criteria" of the task?

### Tips

- Learn more about testing by reading the test specs of a well-written library.
- Is an external library under-documented? Read through the test-suites to get a quick view into how it works. (Reading the open and closed issues may be helpful too.)

## Requirements

Now that we've outlined some testing concepts, we can dive into what we'll require from a test framework.

### Popularity and Community

A testing framework should have community support. An unpopular framework may be out of date or may not have the kinks ironed out. It might have incomplete documentation (including stack overflow questions.) It might not have enough developers working on it to fix its issues.

### Speed

A testing framework should not be slow. We can only define this _relatively_ - for one person's _slow_ may be another person's _acceptable_. We will be benchmarking speed for all the frameworks.

### Ease of Use

A testing framework should be un-difficult to use. The setup, configuration, command-line options, and test writing itself should be _relatively_ straightforward. If it's too confusing to a developer to use, it will be less likely that tests will get written.

### Failure Reporting

A testing framework should give ample information when a particular test fails. We should know exactly which test failed and the stack trace of the unit being called.

### Works with your framework and environment of choice (React, Redux, Electron, etc)

A testing framework must be compatible with what you're trying to test. It should be flexible enough to be able to adapt to the changing needs of those frameworks.

- Ability to run in multiple environments: `node`, in-browser, CI/CD
- Versatility to run unit, integration, and end-to-end tests.

### Nice to Have

Depending on what you need to test, a framework should support:

- Organization strategies: `describe` blocks, `it` blocks
- "watch" and "inspect" modes
- A variety of assertion capabilities
- Ability to add tools like coverage (`nyc`), snapshot testing, etc.
- Mocking / Injecting modules (intercepting require statements), proxyquire/inject-loader
- Webpack compilation (injecting of webpack-defined global variables)
  - simulating a CICD build step
- Babel transpilation of ESNext code
  - Use of alias module import statements (removing the need for `../../`)

## Comparing the Frameworks

To get a sense of what we're comparing, here's a summary of each framework:

### AVA

<https://github.com/avajs/ava>

The magic of AVA is in its simplicity. It's minimal, fast, concurrent, and has a simple syntax that entirely removes the use of globals (like `describe`, `it`, etc.) It supports asynchronous behavior out of the box. AVA has a small team of three developers, one being open-source heavyweight `@sindresorhus`. Some other selling points directly from their readme:

> AVA is a test runner for Node.js with a concise API, detailed error output, embrace of new language features and process isolation that let you write tests more effectively.

> AVA adds code excerpts and clean diffs for actual and expected values. If values in the assertion are objects or arrays, only a diff is displayed, to remove the noise and focus on the problem.

> AVA automatically removes unrelated lines in stack traces, allowing you to find the source of an error much faster, as seen above.

> AVA automatically detects whether your CI environment supports parallel builds. Each build will run a subset of all test files, while still making sure all tests get executed. See the ci-parallel-vars package for a list of supported CI environments.

### Jest

<https://jestjs.io/>

Jest is feature-packed, aiming to solve _everything_ in one package, with a focus on making the experience delightful for the test author. It's written and maintained by Facebook and is extremely popular and community supported due to the ubiquity of `React` and `create-react-app`. The CLI output is colorful and interactive with detailed exception reporting and diffing. Snapshot testing, mocking, and coverage reporting are all built-in. Also included are globals like `it` and `describe` as well as a custom assertion library (similar to `chai`). It also touts:

> zero config - Jest aims to work out of the box, config free, on most JavaScript projects.

> isolated - Tests are parallelized by running them in their own processes to maximize performance.

> great api - From `it` to `expect` - Jest has the entire toolkit in one place. Well documented, well maintained, well good.

### Mocha

<https://mochajs.org/>

Being the most established of the testing frameworks, Mocha enjoys a firm place in the JavaScript community. It's been around since 2011 and is maintained by the OpenJS Foundation and contributors. Mocha has numerous command-line options and configurations it supports. It's generally used in tandem with external libraries - `assert` or `chai` can take care of your assertion needs and `sinon` could take care of your mocking needs. The `it` and `describe` blocks mentioned by Jest were pioneered by Mocha (along with the `beforeEach`, `afterEach`, and other pre/post hooks). In addition to being able to run in `node`, you can also run tests in the browser giving you full access to the DOM. There's also a dizzying array of test reporting styles (one being Nyan cat.)

> Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

> Mocha is the most-depended-upon module on npm (source: libraries.io)

> The SuperAgent request library test documentation was generated with Mocha's doc reporter

### mocha-parallel-tests

<https://github.com/mocha-parallel/mocha-parallel-tests>

`mocha-parallel-tests` is not a testing framework. It's a wrapper over Mocha designed to significantly speed it up. It's new in 2019 and has a small team. I'll go into detail on why I'm including it here (and what "parallel" means) in the "speed" portion of this article. From the readme:

> `mocha-parallel-tests` is a test runner for tests written with mocha testing framework which allows you to run them in parallel.

> `mocha-parallel-tests` executes each of your test files in a separate process while maintaining the output structure of mocha.

> Compared to the other tools which try to parallelize mocha tests execution, `mocha-parallel-tests` doesn't require you to write the code in a different way or use some specific APIs - just run your tests with mocha-parallel-tests instead of mocha and you will see the difference. Or if you prefer to use mocha programmatic API replace it with `mocha-parallel-tests` default export and you're done!

> If you're using Node.JS >= 12 your tests execution will be even faster because `mocha-parallel-tests` supports running tests with Node.JS worker threads API.

### Popularity and Community Comparison

Now that we know a bit about each framework, lets look at the popularity and publish frequency of each one.

|                      | Weekly Downloads | Last Publish |
| -------------------- | ---------------- | ------------ |
| Jest                 | 7.2 million      | 2020-03-26   |
| Mocha                | 4.3 million      | 2020-03-18   |
| AVA                  | 227,179          | 2020-03-22   |
| mocha-parallel-tests | 18,097           | 2020-02-08   |

Jest is clearly the most popular framework with 7.2 million weekly downloads. It was published most recently and is updated very frequently. Its popularity can be partially attributed to the popularity of the `React` library. Jest is shipped with `create-react-app` and is recommended for use in `React`'s documentation.

Mocha isn't too far behind with 4.3 million weekly downloads. It was the de facto standard long before Jest hit the scene and is used in countless applications.

AVA has 227,179 weekly downloads, an order of magnitude fewer than the most popular frameworks. This may be due to its niche focus on minimalism or it having a small team.

`mocha-parallel-tests` has 18,097 weekly downloads and doesn't enjoy as frequent updates as the major three. It's extremely new and not a framework.

In general, more popularity brings more community involvement. The number of open and closed issues tends to increase as a result. To create a loose maintenance ratio \*metric , we divide the open issues by the total number of issues (open + closed issues):

|                      | Open Issues | Closed Issues | Ratio            |
| -------------------- | ----------- | ------------- | ---------------- |
| Mocha                | 254         | 2225          | 10.2% (254/2479) |
| AVA                  | 154         | 1169          | 11.6% (154/1323) |
| Jest                 | 844         | 4343          | 16.2% (844/5187) |
| mocha-parallel-tests | 37          | 111           | 25.0% (37/148)   |

Mocha has the lowest ratio of open to closed issues, making it the most successfully maintained library. It's stability surely correlates with its longevity (and vice versa.)

AVA is 2nd place. This is quite impressive given its small team.

Jest is 3rd place. This comes as no surprise given that it has the most issues to deal with.

`mocha-parallel-tests` has the fewest number of total issues by far but the highest ratio. It doesn't have a significant financial backing like the other frameworks do.

\* Caveat: I'm assuming the open issues in these libraries aren't crippling to the core functionality of the library.

### Speed Comparison

Before we get to the comparison, we need to discuss a few concepts. All of the frameworks run the tests in "parallel", with the exception of Mocha, which runs its tests in "serial."

#### What do "serial" and "parallel" mean?

"Serial" - one at a time, ie - the first must complete before the second, the second must complete before the third, etc. Code _may_ run asynchronously but doesn't start a separate process. This type of processing is also known as sequential processing.

"Parallel" - happening simultaneously, ie - the first, second, third, etc can happen at the same time. Multiple tasks are completed at a time by different processes (which may different threads or literally different processors).

For all of the frameworks with parallel capabilities, only separate test files are run in parallel. `describe` and `it` blocks in a given file/suite are run serially. Given this, writing more test files and putting slow tests can be put into their own files may increase the speed of running the complete test suite.

#### Benchmarks

In the readme of this repo is an explanation of how I wrote and ran the tests. The aim was to simulate a "true" test run in a significantly sized enterprise codebase.

|                      | Speed | Type     |
| -------------------- | ----- | -------- |
| mocha-parallel-tests | 7.3s  | parallel |
| AVA                  | 9.6s  | parallel |
| Jest                 | 12.5s | parallel |
| Mocha                | 16.2s | serial   |

A caveat with all benchmarking tests: the hardware environment (the make, model, RAM, processes running, etc) will affect measured results. For this reason, we'll mostly be analyzing the speeds relative to each other.

`mocha-parallel-tests` is the clear winner in this run. AVA is close behind (and actually ran faster than `mocha-parallel-tests` in a few of the runs.) Jest is also fast, but seems to have a bit more overhead than the other two.

Mocha lags far behind the parallel runners - which is to be expected because it runs tests in serial. If speed is your most important criteria (and its drawbacks are not an issue), you'll see a 200-1000% increase in test speed using `mocha-parallel-tests` instead (depending on your machine, `node` version, and the tests themselves).

### Ease of Use

I'll split "ease of use" into a few categories:

- Amount of necessary configuration/dependencies
- Writing the tests
- Running the tests

### Amount of necessary configuration/dependencies

|                      | Configuration                             | Dependencies                      |
| -------------------- | ----------------------------------------- | --------------------------------- |
| Jest                 | Everything is included                    | built-in                          |
| AVA                  | Sensible defaults                         | externals necessary in most cases |
| Mocha                | Many, many options                        | externals always necessary        |
| mocha-parallel-tests | (Most of mocha CLI options are supported) | Mocha                             |

Jest - 1st place

Jest takes the cake in this department. Using its defaults wherever possible, you could have close to zero configuration.

> Jest's configuration can be defined in the package.json file of your project, or through a jest.config.js file or through the --config <path/to/file.js|cjs|mjs|json> option. If you'd like to use your package.json to store Jest's config, the "jest" key should be used on the top level so Jest will know how to find your settings

- Sensible defaults for finding tests `(default: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ])`
- A huge number of options
- Built-in snapshot tests, coverage reporting, mocking modules and libraries
- Excellent documentation, lots of tutorials and examples

AVA - 2nd place

- Sensible defaults for finding tests (see Jest's defaults)
- Configure in package.json, an ava.config.\* file, or another override file in the directory root
- Many CLI options
- Built-in snapshot tests
- `@ava/babel` for Babel compilation
- `@ava/typescript`for TypeScript support
- Good documentation, few tutorials and examples
- Coverage reporting, mocking modules and libraries must be imported from elsewhere

Mocha - 3rd place

> By default, mocha looks for the glob `"./test/*.js"`, so you may want to put your tests in `test/` folder. If you want to include subdirectories, pass the `--recursive` option.

- One default for finding tests (above)
- Configure in package.json or an override file
- Many, many CLI options
- Good documentation (slightly opaque and a lot to read through), lots of tutorials and examples (in and out of Mocha's docs)
- Assertions, coverage reporting, snapshot tests, mocking modules and libraries (everything) must be imported from elsewhere

mocha-parallel-tests - 4th place

> Most of mocha CLI options are supported. If you're missing some of the options support you're welcome to submit a PR: all options are applied in a same simple way.

- Run tests as you would with Mocha. See above

#### Writing the tests

|                              | Summary                             |
| ---------------------------- | ----------------------------------- |
| Mocha & mocha-parallel-tests | `describe` and `it` blocks          |
| Jest                         | like Mocha, but everything built in |
| AVA                          | import test context, customizable   |

Mocha's influence on test-writing is undeniable. From [Mocha's getting started section](https://mochajs.org/#getting-started), we can see how tests are organized in nested `describe` blocks that can contain any number of `it` blocks which make test assertions.

```js
const assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
```

[Chai's `expect`](https://www.chaijs.com/) is commonly used instead of assert:

```js
const { expect } = require('chai');

it('should return -1 when the value is not present', function() {
  expect([1, 2, 3].indexOf(4)).to.equal(-1);
});
```

> More Mocha test examples can be found here: <https://mochajs.org/#examples>

Jest follows Mocha's example, but everything is included (no need to use external assertion, etc libraries). A lot of the syntax is compatible with Mocha, for example - `it` can be used instead of `test`:

```js
describe('Array', function() {
  describe('#indexOf()', function() {
    test('should return -1 when the value is not present', function() {
      expect([1, 2, 3].indexOf(4)).toEqual(-1);
    });
  });
});
```

(Notice that Jest's `toEqual` is very much like chai's `to.equal`. Many of Jest's assertions are camel-cased analogues of chai's assertions.)

AVA takes a different approach to writing tests. It prides itself on not injecting globals into your tests. Everything comes from `test` and the `t` "execution context" variable in the callback:

```js
// Array-indexOf.spec.js
const test = require('ava');

test('should return -1 when the value is not present', t => {
  t.is([1, 2, 3].indexOf(4), -1);
});
```

Built-in assertions are available on the `t` object: `true`, `false`, `truthy`, `falsy`, `is`, etc. You can also create custom assertions.

Like Mocha and Jest, AVA has `before`, `beforeEach`, `after`, and `afterEach` hooks documented [here](https://github.com/avajs/ava/blob/master/docs/01-writing-tests.md#before--after-hooks). These work on a per-file basis.

AVA does not have a way to nest test blocks (an ability `describe` affords in Mocha and Jest.) [This issue](https://github.com/avajs/ava/issues/222) goes into detail on why the maintainers haven't adopted this functionality. [This article](https://stackoverflow.com/questions/41269085/why-doesnt-js-testing-library-ava-have-suites-or-any-other-groupings) has some alternatives.

An excellent [example of a single AVA test suite](https://github.com/sindresorhus/is/blob/master/test/test.ts) shows a wide range of AVA's capabilities.

Since the frameworks have drastically different styles and similar capabilities, this was difficult to rank from easiest to most difficult. AVA has a noticeable lack of organizing tests with nested `describe` blocks, but its contained API is extremely flexible. Mocha forces the user to make decisions on which libraries to use, but this makes it almost limitless in capability. Jest includes _everything_, but some of the built-in magic makes it difficult or confusing to get certain things done ( see [this issue on mocks](https://github.com/facebook/jest/issues/2567) ).

#### Running the tests

asdf

### Failure Reporting

asdf

### Works with your framework and environment of choice (React, Redux, Electron, etc)

asdf

### Nice to Have

asdf

### Examples

- ava - is
- https://mochajs.org/#examples

### External Resources

https://www.slant.co/versus/12696/12697/~mocha_vs_jest
https://stackshare.io/stackups/ava-vs-mocha
https://raygun.com/blog/javascript-unit-testing-frameworks/
http://zpalexander.com/migrating-from-mocha-to-ava/

a cool example: https://github.com/tastejs/todomvc

Jest - https://github.com/Raathigesh/majestic/

- Node.js & JavaScript Testing Best Practices (2020) - Medium: <https://medium.com/@me_37286/yoni-goldberg-javascript-nodejs-testing-best-practices-2b98924c9347>
