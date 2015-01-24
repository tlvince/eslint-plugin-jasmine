'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');

var eslintTester = new ESLintTester(linter);
eslintTester.addRuleTest('lib/rules/no-exclusive-tests', {
  valid: [
    'describe("", function() {})',
    'describe("", function() { it("", function() {} ) })'
  ],

  invalid: [
    {
      code: 'ddescribe("My exclusive suite", function() {});',
      errors: [{
        message: 'Unexpected ddescribe.',
        type: 'Identifier'
      }]
    },
    {
      code: 'iit("My exclusive test", function() {});',
      errors: [{
        message: 'Unexpected iit.',
        type: 'Identifier'
      }]
    },
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
