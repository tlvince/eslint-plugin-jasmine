'use strict';

var rule = require('../../lib/rules/no-focused-tests');
var RuleTester = require('eslint').RuleTester;

var eslintTester = new RuleTester();

eslintTester.run('no-focused-tests', rule, {
  valid: [
    'describe("", function() {})',
    'describe("", function() { it("", function() {} ) })'
  ],

  invalid: [
    {
      code: 'ddescribe("My exclusive suite", function() {});',
      errors: [
        {
          message: 'Unexpected ddescribe.',
          type: 'Identifier'
        }
      ]
    },
    {
      code: 'iit("My exclusive test", function() {});',
      errors: [
        {
          message: 'Unexpected iit.',
          type: 'Identifier'
        }
      ]
    },
    {
      code: 'fdescribe("My focused suite", function() {});',
      errors: [
        {
          message: 'Unexpected fdescribe.',
          type: 'Identifier'
        }
      ]
    },
    {
      code: 'fit("My focused spec", function() {});',
      errors: [
        {
          message: 'Unexpected fit.',
          type: 'Identifier'
        }
      ]
    }
  ]
});
