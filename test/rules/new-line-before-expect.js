'use strict'

var rule = require('../../lib/rules/new-line-before-expect')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('new line before expect', rule, {
  valid: [
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '',
      '  expect(1).toBe(1)',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '  expect(1).toBe(1)',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '  expect(1).toBe(1)',
      '  doMoreThings()',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '  var a = 1',
      '',
      '  expect(a).toBe(1)',
      ' });',
      '});'
    ]),
    linesToCode([
      '  notJasmineTestSuite()',
      '  expect(a)'
    ]),
    linesToCode([
      'it("", specAsync(function() {',
      '  expect(uut.somethingElse).toEqual("123");',
      '}));'
    ])
  ],
  invalid: [
    {
      code: linesToCode([
        'describe("", function() {',
        ' it("", function(){',
        '  var a = 1',
        '  expect(1).toBe(1)',
        ' });',
        '});'
      ]),
      errors: [
        {
          message: 'No new line before expect'
        }
      ]
    }
  ]
})
