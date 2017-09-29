'use strict'

var rule = require('../../lib/rules/no-global-setup')
var RuleTester = require('eslint').RuleTester
const parserOptions = {
  ecmaVersion: 8
}
var eslintTester = new RuleTester({parserOptions})

eslintTester.run('no-global-setup', rule, {
  valid: [{
    code: 'describe("", function() { beforeEach(function() {}) })'
  }, {
    code: 'beforeEach(function() {})'
  }, {
    code: `describe.only("suite", () => {
        beforeAll (() => { var a = 1; });
      });`
  }, {
    code: `describe['only']("suite", () => {
        beforeAll (() => { var a = 1; });
      });`
  }],
  invalid: [{
    code: 'beforeEach(function() {}); describe(function() {})',
    errors: [{
      message: 'Do not use `beforeEach` outside a `describe` except for in global helpers.'
    }]
  }, {
    code: 'beforeEach(function() {}); afterEach(function() {}); beforeAll(function() {}); afterAll(function() {}); describe(function() {})',
    errors: [{
      message: 'Do not use `beforeEach` outside a `describe` except for in global helpers.'
    }, {
      message: 'Do not use `afterEach` outside a `describe` except for in global helpers.'
    }, {
      message: 'Do not use `beforeAll` outside a `describe` except for in global helpers.'
    }, {
      message: 'Do not use `afterAll` outside a `describe` except for in global helpers.'
    }]
  }]
})
