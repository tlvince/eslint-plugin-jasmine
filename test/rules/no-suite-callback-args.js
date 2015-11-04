'use strict'

var rule = require('../../lib/rules/no-suite-callback-args')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('describe-with-done', rule, {
  valid: [
    'describe("My suite", function() {});',
    'fdescribe("My suite", function() {});',
    'ddescribe("My suite", function() {});',
    'xdescribe("My suite", function() {});',
    'describe("My suite", function() {\nit("A spec", function() {});\n});',
    'describe("My suite", function() {\nit("A spec", function(done) {});\n});',
    'describe("My suite", function() {\nit("A spec", function(done) {\ndone();\n});\n });'
  ],

  invalid: [
    {
      code: 'describe("A suite", function(done) {});',
      errors: [
        {
          message: "Unexpected argument in suite's callback"
        }
      ]
    },
    {
      code: 'fdescribe("A suite", function(done) {});',
      errors: [
        {
          message: "Unexpected argument in suite's callback"
        }
      ]
    },
    {
      code: 'ddescribe("A suite", function(done) {});',
      errors: [
        {
          message: "Unexpected argument in suite's callback"
        }
      ]
    },
    {
      code: 'xdescribe("A suite", function(done) {});',
      errors: [
        {
          message: "Unexpected argument in suite's callback"
        }
      ]
    },
    {
      code: 'describe("A suite", function(done) {\nit("A spec", function() {});\n});',
      errors: [
        {
          message: "Unexpected argument in suite's callback"
        }
      ]
    },
    {
      code: 'describe("A suite", function(done) {\nit("A spec", function(done) {});\n});',
      errors: [
        {
          message: "Unexpected argument in suite's callback"
        }
      ]
    },
    {
      code: 'describe("A suite", function(done) {\nit("A spec", function(done) {\ndone();\n});\n });',
      errors: [
        {
          message: "Unexpected argument in suite's callback"
        }
      ]
    }
  ]
})
