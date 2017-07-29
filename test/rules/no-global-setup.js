'use strict'

var rule = require('../../lib/rules/no-global-setup')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-global-setup', rule, {
  valid: [{
    code: 'describe("", function() { beforeEach(function() {}) })'
  }, {
    code: 'beforeEach(function() {})',
    filename: 'tests/helpers/mocks/mockBeforeEachHelper.js'
  }],
  invalid: [{
    code: 'beforeEach(function() {})',
    errors: [{
      message: 'Do not use `beforeEach` outside a `describe`.'
    }]
  }, {
    code: 'afterEach(function() {})',
    errors: [{
      message: 'Do not use `afterEach` outside a `describe`.'
    }]
  }]
})
