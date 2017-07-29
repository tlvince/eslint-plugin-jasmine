'use strict'

var rule = require('../../lib/rules/no-global-setup')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-global-setup', rule, {
  valid: [{
    code: 'describe("", function() { beforeEach(function() {}) })'
  }, {
    code: 'beforeEach(function() {})'
  }, {
    code: 'beforeEach(function() {}); afterEach(function() {})'
  }],
  invalid: [{
    code: 'beforeEach(function() {}); describe(function() {})',
    errors: [{
      message: 'Do not use `beforeEach` outside a `describe` except for in global helpers.'
    }]
  }, {
    code: 'afterEach(function() {}); describe(function() {})',
    errors: [{
      message: 'Do not use `afterEach` outside a `describe` except for in global helpers.'
    }]
  }, {
    code: 'beforeEach(function() {}); describe(function() {}); afterEach(function() {})',
    errors: [{
      message: 'Do not use `beforeEach, afterEach` outside a `describe` except for in global helpers.'
    }]
  }]
})
