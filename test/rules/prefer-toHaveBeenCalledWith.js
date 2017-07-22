'use strict'

var rule = require('../../lib/rules/prefer-toHaveBeenCalledWith')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('prefer toHaveBeenCalledWith', rule, {
  valid: [
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '',
      ' f(1);',
      '  expect(f).toHaveBeenCalledWith(1)',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '',
      ' f();',
      '  expect(f).toHaveBeenCalledWith()',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '',
      ' f(2);',
      '  expect(f).not.toHaveBeenCalledWith(1)',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '  expect(f).not.toHaveBeenCalled()',
      ' });',
      '});'
    ])
  ],
  invalid: [
    {
      code: linesToCode([
        'describe("", function() {',
        ' it("", function(){',
        '',
        ' f(1);',
        '  expect(f).toHaveBeenCalled()',
        ' });',
        '});'
      ]),
      errors: [
        {
          message: 'Prefer toHaveBeenCalledWith'
        }
      ]
    }
  ]
})
