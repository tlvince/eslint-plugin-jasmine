'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');

var eslintTester = new ESLintTester(linter);
eslintTester.addRuleTest('lib/rules/no-describe-dups', {
  valid: [
    'describe("The first describe name", function() {}); ' +
    'describe("The second describe name", function() {})'
  ],

  invalid: [
    {
      code: 'describe("Same describe name", function() {}); ' +
            'describe("Same describe name", function() {})',
      errors: [{
        message: "Duplicate describe name: 'Same describe name'",
        type: 'CallExpression'
      }]
    }
  ]
});
