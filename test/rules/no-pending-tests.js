'use strict'

var rule = require('../../lib/rules/no-pending-tests')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-pending-tests', rule, {
  valid: [
    'describe("", function() { it("", function() {} ) })',
    'it("", function() {})',
  ],

  invalid: [
    {
      // code: 'describe("My suite with pending test", function() { it("my pending test", function() { pending(); } });',
      code: 'describe("My suite with pending test", function() { it("my pending test", function() { pending(); }); });',
      errors: [
        {
          message: 'Unexpected pending.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'it("My pending spec", function() { pending("I am pending"); });',
      errors: [
        {
          message: 'Unexpected pending.',
          type: 'CallExpression'
        }
      ]
    }
  ]
})
