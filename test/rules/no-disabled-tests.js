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
          message: 'Unexpected xdescribe("My disabled suite")',
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
//      code: 'xdescribe(`My disabled ${ suiteName }`, function() {});',
//      errors: [
//        {
//          message: 'Unexpected xdescribe(\`My disabled ${ suiteName }\`)',
//          type: 'CallExpression'
//        }
//      ]
//    },
    {
      code: 'xit("My disabled spec", function() {});',
      errors: [
        {
          message: 'Unexpected xit("My disabled spec")',
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
//      code: 'xit(`My disabled ${ specName }`, function() {});',
//      errors: [
//        {
//          message: 'Unexpected xit(`My disabled ${ specName }`)',
//          type: 'CallExpression'
//        }
//      ]
//    }
  ]
})
