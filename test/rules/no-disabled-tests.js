'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');

var eslintTester = new ESLintTester(linter);
eslintTester.addRuleTest('lib/rules/no-disabled-tests', {
  valid: [
    'describe("", function() {})',
    'describe("", function() { it("", function() {} ) })'
  ],

  invalid: [
    {
      code: 'xdescribe("My disabled suite", function() {});',
      errors: [{
        message: 'Unexpected xdescribe.',
        type: 'Identifier'
      }]
    },
    {
      code: 'xit("My disabled spec", function() {});',
      errors: [{
        message: 'Unexpected xit.',
        type: 'Identifier'
      }]
    }
  ]
});
