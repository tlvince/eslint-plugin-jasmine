'use strict'

var rule = require('../../lib/rules/no-global-setup')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-global-setup', rule, {
  valid: [
    'describe("", function() { beforeEach(function() {}) })'
  ],
  invalid: [
    {
      code: 'beforeEach(function() {})',
      errors: [{message: 'Do not use `beforeEach` outside a `describe`.'}]
    },
    {
      code: 'afterEach(function() {})',
      errors: [{message: 'Do not use `afterEach` outside a `describe`.'}]
    }
  ]
})
