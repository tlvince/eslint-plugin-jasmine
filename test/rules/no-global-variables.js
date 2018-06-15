'use strict'

var rule = require('../../lib/rules/no-global-variables')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester({
  'parserOptions': {
    'ecmaVersion': 8
  }
})

eslintTester.run('no-describe-variables', rule, {
  valid: [
    'var a = 100;',
    'var test = require("test"); describe("My suite", () => { it("works", function() {}); });',
    'const test = require("test"); describe("My suite", () => { it("works", function() {}); });',
    'let test = require("test"); describe("My suite", () => { it("works", function() {}); });',
    'function test() {}; describe("My suite", () => { it("works", function() {}); });',
    'const test = () => {}; describe("My suite", () => { it("works", function() {}); });',
    'const test = function () {}; describe("My suite", () => { it("works", function() {}); });'
  ],
  invalid: [
    {
      code: 'var a = {}; describe("My suite", () => {});',
      errors: [
        {
          message: 'Test has variable declaration in the global scope'
        }
      ]
    },
    {
      code: 'var a = {}; describe("My suite", () => {});',
      errors: [
        {
          message: 'Test has variable declaration in the global scope'
        }
      ]
    },
    {
      code: 'var a = object.method(); describe("My suite", () => {});',
      errors: [
        {
          message: 'Test has variable declaration in the global scope'
        }
      ]
    }
  ]
})
