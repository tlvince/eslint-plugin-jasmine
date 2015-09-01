'use strict';

var rule = require('../../lib/rules/no-disabled-tests');
var RuleTester = require('eslint').RuleTester;

var eslintTester = new RuleTester();

eslintTester.run('no-disabled-tests', rule, {
  valid: [
    'describe("", function() {})',
    'describe("", function() { it("", function() {} ) })'
  ],

  invalid: [
    {
      code: 'xdescribe("My disabled suite", function() {});',
      errors: [
        {
          message: 'Unexpected xdescribe.',
          type: 'Identifier'
        }
      ]
    },
    {
      code: 'xit("My disabled spec", function() {});',
      errors: [
        {
          message: 'Unexpected xit.',
          type: 'Identifier'
        }
      ]
    }
  ]
});
