'use strict'

var rule = require('../../lib/rules/expect-matcher')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('expect-matcher', rule, {
  valid: [
    'expect("something").toEqual("else");',
    'expect(true).toBeDefined();',
    'expect([1, 2, 3]).toEqual([1, 2, 3]);',
    'expect(undefined).not.toBeDefined();'
  ],

  invalid: [
    {
      code: 'expect("something");',
      errors: [
        {
          message: 'Expect must have a corresponding matcher call.'
        }
      ]
    },
    {
      code: 'expect();',
      errors: [
        {
          message: 'Expect must have a corresponding matcher call.'
        }
      ]
    },
    {
      code: 'expect(true).toBeDefined;',
      errors: [
        {
          message: 'Expect must have a corresponding matcher call.'
        }
      ]
    }
  ]
})
