'use strict'

var rule = require('../../lib/rules/no-suite-callback-args')
var RuleTester = require('eslint').RuleTester
var linesToCode = require('../helpers/lines_to_code')

const parserOptions = {
  ecmaVersion: 8
}

var eslintTester = new RuleTester({parserOptions})

eslintTester.run('describe-with-done', rule, {
  valid: [
    'describe("My suite", function() {});',
    'fdescribe("My suite", function() {});',
    'ddescribe("My suite", function() {});',
    'xdescribe("My suite", function() {});',
    'describe("My suite", function() {\nit("A spec", function() {});\n});',
    'describe("My suite", function() {\nit("A spec", function(done) {});\n});',
    'describe("My suite", function() {\nit("A spec", function(done) {\ndone();\n});\n });',
    linesToCode([
      'describe("", () => {',
      ' it("", () => {',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", () => {',
      ' it("", (done) => {',
      ' });',
      '});'
    ])
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
    },
    {
      code: linesToCode([
        'describe("", (done) => {',
        ' it("", (done) => {',
        ' });',
        '});'
      ]),
      errors: [
        {
          message: "Unexpected argument in suite's callback"
        }
      ]
    },
    {
      code: linesToCode([
        'describe("", () => {',
        ' describe("", (done) => {',
        ' });',
        '});'
      ]),
      errors: [
        {
          message: "Unexpected argument in suite's callback"
        }
      ]
    }]
})
