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
          message: 'Unexpected ddescribe("My exclusive suite")',
          type: 'CallExpression'
        }
      ]
    },
    // TODO: enable this when parsing template literals succeeds
    // Saw:
    //
    // AssertionError: A fatal parsing error occurred: Parsing error:
    // Unexpected character '`'
//    {
//      code: 'ddescribe(`My exclusive ${ suiteName }`, function() {});',
//      errors: [
//        {
//          message: 'Unexpected ddescribe(`My exclusive ${ suiteName }`)',
//          type: 'CallExpression'
//        }
//      ]
//    },
    {
      code: 'iit("My exclusive test", function() {});',
      errors: [
        {
          message: 'Unexpected iit("My exclusive test")',
          type: 'CallExpression'
        }
      ]
    },
    // TODO: enable this when parsing template literals succeeds
    // Saw:
    //
    // AssertionError: A fatal parsing error occurred: Parsing error:
    // Unexpected character '`'
//    {
//      code: 'iit(`My exclusive ${ testName }`, function() {});',
//      errors: [
//        {
//          message: 'Unexpected iit(`My exclusive ${ testName }`)',
//          type: 'CallExpression'
//        }
//      ]
//    },
    {
      code: 'fdescribe("My focused suite", function() {});',
      errors: [
        {
          message: 'Unexpected fdescribe("My focused suite")',
          type: 'CallExpression'
        }
      ]
    },
    // TODO: enable this when parsing template literals succeeds
    // Saw:
    //
    // AssertionError: A fatal parsing error occurred: Parsing error:
    // Unexpected character '`'
//    {
//      code: 'fdescribe(`My exclusive ${ suiteName }`, function() {});',
//      errors: [
//        {
//          message: 'Unexpected fdescribe(`My exclusive ${ suiteName }`)',
//          type: 'CallExpression'
//        }
//      ]
//    },
    {
      code: 'fit("My focused spec", function() {});',
      errors: [
        {
          message: 'Unexpected fit("My focused spec")',
          type: 'CallExpression'
        }
      ]
    }
    // TODO: enable this when parsing template literals succeeds
    // Saw:
    //
    // AssertionError: A fatal parsing error occurred: Parsing error:
    // Unexpected character '`'
//    {
//      code: 'fit(`My exclusive ${ testName }`, function() {});',
//      errors: [
//        {
//          message: 'Unexpected fit(`My exclusive ${ testName }`)',
//          type: 'CallExpression'
//        }
//      ]
//    },
  ]
})
