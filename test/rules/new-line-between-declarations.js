'use strict'

var rule = require('../../lib/rules/new-line-between-declarations')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('space between declarations', rule, {
  valid: [
    linesToCode([
      'describe("", function() {',
      ' it("", function(){});',
      ' ',
      ' it("", function(){});',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' var a = 1',
      ' beforeEach(function(){});',
      ' ',
      ' it("", function(){});',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' expect(1).toBe(1);',
      '});'
    ]),
    linesToCode([
      'describe("", function() {',
      ' describe("", function(){',
      '   it("", function(){});',
      ' });',
      ' ',
      ' it("", function(){});',
      '});'
    ])
  ],
  invalid: [
    {
      code: linesToCode([
        'describe("", function() {',
        ' describe("", function() {',
        '   it("", function(){});',
        ' });',
        ' it("", function(){});',
        ' it("", function(){});',
        '});'
      ]),
      errors: [
        {
          message: 'No new line between declarations'
        }
      ],
      output: linesToCode([
        'describe("", function() {',
        ' describe("", function() {',
        '   it("", function(){});',
        ' });',
        ' it("", function(){});\n',
        ' it("", function(){});',
        '});'
      ])
    },
    {
      code: linesToCode([
        'describe("", function() {',
        ' beforeEach(function(){});',
        ' it("", function(){});',
        '});'
      ]),
      errors: [
        {
          message: 'No new line between declarations'
        }
      ],
      output: linesToCode([
        'describe("", function() {',
        ' beforeEach(function(){});\n',
        ' it("", function(){});',
        '});'
      ])
    },
    {
      code: linesToCode([
        'describe("", function() {',
        ' describe("", function() {})',
        ' describe("", function() {})',
        '})'
      ]),
      errors: [
        {
          message: 'No new line between declarations'
        }
      ],
      output: linesToCode([
        'describe("", function() {',
        ' describe("", function() {})\n',
        ' describe("", function() {})',
        '})'
      ])
    }
  ]
})
