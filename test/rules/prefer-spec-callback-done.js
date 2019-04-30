'use strict'

var rule = require('../../lib/rules/prefer-spec-callback-done')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } })

eslintTester.run('prefer spec callback done', rule, {
  valid: [
    {
      code: linesToCode([
        'it("has no callback", function () {',
        '  expect(3).toEqual(3);',
        '});'
      ])
    },
    {
      code: linesToCode([
        'it("has a done callback", function (done) {',
        '  expect(3).toEqual(3);',
        '  done();',
        '});'
      ])
    },
    {
      code: linesToCode([
        'it("has an arrow function", () => {',
        '  expect(3).toEqual(3);',
        '});'
      ])
    },
    {
      code: linesToCode([
        'it("has an arrow function with done callback", done => {',
        '  expect(3).toEqual(3);',
        '  done(); ',
        '});'
      ])
    }
  ],
  invalid: [
    {
      code: linesToCode([
        'it("has a callback", function (testComplete) {',
        '  testMethod().then(result => {',
        '    expect(result).toBe(true);',
        '    testComplete();',
        '  }).catch(testComplete.fail);',
        '});'
      ]),
      output: linesToCode([
        'it("has a callback", function (done) {',
        '  testMethod().then(result => {',
        '    expect(result).toBe(true);',
        '    done();',
        '  }).catch(done.fail);',
        '});'
      ]),
      errors: [
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 2,
          column: 32
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 5,
          column: 5
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 6,
          column: 12
        }
      ]
    },
    {
      code: linesToCode([
        'it("has an arrow function with a callback", testComplete => {',
        '  testMethod().then(result => {',
        '    expect(result).toBe(true);',
        '    testComplete();',
        '  }).catch(testComplete.fail);',
        '});'
      ]),
      output: linesToCode([
        'it("has an arrow function with a callback", done => {',
        '  testMethod().then(result => {',
        '    expect(result).toBe(true);',
        '    done();',
        '  }).catch(done.fail);',
        '});'
      ]),
      errors: [
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 2,
          column: 45
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 5,
          column: 5
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 6,
          column: 12
        }
      ]
    },
    {
      code: linesToCode([
        'it("is a test", function (foo) {',
        '  foo();',
        '  it("is a broken nested test", function (bar) {',
        '    foo();',
        '    bar();',
        '  });',
        '  foo();',
        '  bar();',
        '  baz();',
        '});',
        'it("is an unrelated test", function (baz, randomUnusedArg) {',
        '  foo();',
        '  bar();',
        '  baz();',
        '});'
      ]),
      output: linesToCode([
        'it("is a test", function (done) {',
        '  done();',
        '  it("is a broken nested test", function (bar) {',
        '    done();',
        '    bar();',
        '  });',
        '  done();',
        '  bar();',
        '  baz();',
        '});',
        'it("is an unrelated test", function (done, randomUnusedArg) {',
        '  foo();',
        '  bar();',
        '  done();',
        '});'
      ]),
      errors: [
        // Note that even though we can't safely fix the `bar` parameter and its
        // references, we can still detect that `bar()` is a badly named callback.
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 2,
          column: 27
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 3,
          column: 3
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 4,
          column: 43
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 5,
          column: 5
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 6,
          column: 5
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 8,
          column: 3
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 12,
          column: 38
        },
        {
          message: 'Use the parameter `done` for spec callbacks',
          line: 15,
          column: 3
        }
      ]
    }
  ]
})
