'use strict'

var rule = require('../../lib/rules/capitalized-it')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('capitalized-it', rule, {
  valid: [
    {
        code: 'it("This is valid.", function() {});',
        options: ['always']
    },
    {
        code: 'it("this is valid.", function() {});',
        options: ['never']
    }
  ],

  invalid: [
    {
      code: 'it("this is invalid.", function() {});',
      options: ['always'],
      errors: [{ message: 'it must start with an upper case letter.' }]
    },
    {
      code: 'it("This is invalid.", function() {});',
      options: ['never'],
      errors: [{ message: 'it must start with a lower case letter.' }]
    }
  ]
})
