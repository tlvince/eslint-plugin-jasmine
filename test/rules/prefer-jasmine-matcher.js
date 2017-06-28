'use strict'

var rule = require('../../lib/rules/prefer-jasmine-matcher')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('prefer jasmine matcher', rule, {
  valid: [
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '',
      '  expect(a).not.toBe(true)',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '  expect(1).toBeGreaterThan(0)',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '  var a = [];',
      '  expect(a.length).toBe(0)',
      ' });',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' it("", function(){',
      '  var a = "ab";',
      '  expect(a instanceof String).toBe(true)',
      ' });',
      '});'
    ])
  ],
  invalid: [
    {
      code: linesToCode([
        'describe("", function() {',
        ' it("", function(){',
        '  expect(1 === 1).toBe(true)',
        ' });',
        '});'
      ]),
      errors: [
        {
          message: 'Prefer jasmine matcher instead of comparison'
        }
      ]
    },
    {
      code: linesToCode([
        'describe("", function() {',
        ' it("", function(){',
        '  expect((1 === 1)).toBe(true)',
        ' });',
        '});'
      ]),
      errors: [
        {
          message: 'Prefer jasmine matcher instead of comparison'
        }
      ]
    },
    {
      code: linesToCode([
        'describe("", function() {',
        ' it("", function(){',
        '  expect(1 < 2).toBe(true)',
        ' });',
        '});'
      ]),
      errors: [
        {
          message: 'Prefer jasmine matcher instead of comparison'
        }
      ]
    },
    {
      code: linesToCode([
        'describe("", function() {',
        ' it("", function(){',
        ' var a = []',
        '  expect(a.length === 0).toBe(true)',
        ' });',
        '});'
      ]),
      errors: [
        {
          message: 'Prefer jasmine matcher instead of comparison'
        }
      ]
    }
  ]
})
