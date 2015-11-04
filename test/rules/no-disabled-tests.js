'use strict'

var rule = require('../../lib/rules/no-disabled-tests')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-disabled-tests', rule, {
  valid: [
    'describe("", function() {})',
    'describe("", function() { it("", function() {} ) })',
    'x = {a: xdescribe}'
  ],

  invalid: [
    {
      code: 'xdescribe("My disabled suite", function() {});',
      errors: [
        {
          message: 'Unexpected xdescribe.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'xit("My disabled spec", function() {});',
      errors: [
        {
          message: 'Unexpected xit.',
          type: 'CallExpression'
        }
      ]
    }
  ]
})
