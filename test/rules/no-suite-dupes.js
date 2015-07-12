'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');

var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('lib/rules/no-suite-dupes', {
  valid: [
    'describe("The first suite name", function() {}); ' +
    'describe("The second suite name", function() {})'
  ],

  invalid: [
    {
      code: 'describe("Same suite name", function() {}); ' +
            'describe("Same suite name", function() {})',
      errors: [
        {
          message: 'Duplicate suite: "Same suite name"',
          type: 'CallExpression'
        }
      ]
    }
  ]
});
