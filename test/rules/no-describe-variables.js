'use strict'

var rule = require('../../lib/rules/no-describe-variables')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6
  }
})

eslintTester.run('no-describe-variables', rule, {
  valid: [
    'describe("My suite", function() { it("works", function() {}); });',
    'xdescribe("My suite", function() { it("works", function() {}); });',
    'fdescribe("My suite", function() { it("works", function() {}); });'
  ],
  invalid: [
    {
      code: 'describe("My suite", function() { var x; beforeEach(function () { x = 5; }); it("works", function() {}); });',
      errors: [
        {
          message: 'Test has variable declaration in the describe block'
        }
      ]
    },
    {
      code: 'fdescribe("My suite", function() { var x; beforeEach(function () { x = 5; }); it("works", function() {}); });',
      errors: [
        {
          message: 'Test has variable declaration in the describe block'
        }
      ]
    },
    {
      code: 'xdescribe("My suite", function() { var x; beforeEach(function () { x = 5; }); it("works", function() {}); });',
      errors: [
        {
          message: 'Test has variable declaration in the describe block'
        }
      ]
    },
    {
      code: 'describe("My suite", () => { var x; beforeEach(() => { x = 5; }); it("works", () => {}); });',
      errors: [
        {
          message: 'Test has variable declaration in the describe block'
        }
      ]
    },
    {
      code: 'fdescribe("My suite", () => { var x; beforeEach(() => { x = 5; }); it("works", () => {}); });',
      errors: [
        {
          message: 'Test has variable declaration in the describe block'
        }
      ]
    },
    {
      code: 'xdescribe("My suite", () => { var x; beforeEach(() => { x = 5; }); it("works", () => {}); });',
      errors: [
        {
          message: 'Test has variable declaration in the describe block'
        }
      ]
    }
  ]
})
