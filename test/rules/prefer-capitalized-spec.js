'use strict'

var rule = require('../../lib/rules/prefer-capitalized-spec')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('prefer-capitalized-spec', rule, {
  valid: [
    {
      code: 'it("This is valid.", function() {});',
      options: ['always']
    },
    {
      code: 'it("this is valid.", function() {});',
      options: ['never']
    },
    {
      code: '[1,2,3].forEach(value, function (value) { it("I produce " + value + ".", function() {}); });',
      options: ['always']
    },
    {
      code: '[1,2,3].forEach(value, function (value) { it("i produce " + value + ".", function() {}); });',
      options: ['never']
    },
    {
      code: 'it("we cannot tell if this is safe".toUpperCase(), function() {});',
      options: ['always']
    },
    {
      code: 'it(craftCustomDescription("we cannot tell if this is safe"), function() {});',
      options: ['always']
    },
    {
      code: 'it(["is", "this", "safe?"].join(" ").replace(/is/, "Is"), function() {});',
      options: ['always']
    }
  ],

  invalid: [
    {
      code: 'it("this is invalid.", function() {});',
      output: 'it("This is invalid.", function() {});',
      options: ['always'],
      errors: [{ message: 'Spec must start with an upper case letter' }]
    },
    {
      code: 'it("This is invalid.", function() {});',
      output: 'it("this is invalid.", function() {});',
      options: ['never'],
      errors: [{ message: 'Spec must start with a lower case letter' }]
    },
    {
      code: '[1,2,3].forEach(value, function (value) { it("i produce " + value + ".", function() {}); });',
      output: '[1,2,3].forEach(value, function (value) { it("I produce " + value + ".", function() {}); });',
      options: ['always'],
      errors: [{ message: 'Spec must start with an upper case letter' }]
    }
  ]
})
