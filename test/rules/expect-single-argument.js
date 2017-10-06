'use strict'

var rule = require('../../lib/rules/expect-single-argument')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('expect-single-argument', rule, {
  valid: [
    'expect("something").toEqual("else");',
    'expect(true).toBeDefined();',
    'expect([1, 2, 3]).toEqual([1, 2, 3]);',
    'expect(undefined).not.toBeDefined();'
  ],

  invalid: [
    {
      code: 'expect().toBe(true);',
      errors: [
        {
          message: 'Expect must have a single argument. No arguments were provided.'
        }
      ]
    },
    {
      code: 'expect().toEqual("something");',
      errors: [
        {
          message: 'Expect must have a single argument. No arguments were provided.'
        }
      ]
    },
    {
      code: 'expect("something", "else").toEqual("something");',
      errors: [
        {
          message: 'Expect must have a single argument. More than one argument were provided.'
        }
      ]
    }
  ]
})
