'use strict'

var rule = require('../../lib/rules/no-focused-tests')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-focused-tests', rule, {
  valid: [
    'describe("", function() {})',
    'describe("", function() { it("", function() {} ) })',
    'x = {a: ddescribe}'
  ],

  invalid: [
    {
      code: 'ddescribe("My exclusive suite", function() {});',
      errors: [
        {
          message: 'Unexpected ddescribe.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'iit("My exclusive test", function() {});',
      errors: [
        {
          message: 'Unexpected iit.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'fdescribe("My focused suite", function() {});',
      errors: [
        {
          message: 'Unexpected fdescribe.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'fit("My focused spec", function() {});',
      errors: [
        {
          message: 'Unexpected fit.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'fit("My focused spec", function() {\n\n});',
      errors: [
        {
          message: 'Unexpected fit.',
          type: 'CallExpression',
          line: 1,
          column: 1,
          // only report the word 'fit', not the whole test:
          endLine: 1,
          endColumn: 4
        }
      ]
    }
  ]
})
