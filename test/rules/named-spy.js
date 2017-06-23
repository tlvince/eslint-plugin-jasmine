'use strict'

var rule = require('../../lib/rules/named-spy')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('named-spy', rule, {
  valid: [
    // Other function name
    'var result = someFunc()',
    'result = someFunc()',
    // Not jasmine.createSpy
    'var other = createSpy("onSuccess")',
    'other = createSpy("onSuccess")',
    'var other = library.createSpy("onSuccess")',
    'other = library.createSpy("onSuccess")',
    // Correct use of named spies
    'var onSuccess = jasmine.createSpy("onSuccess")',
    'onSuccess = jasmine.createSpy("onSuccess")',
    // Handles spy as noop
    'foo(jasmine.createSpy("callback"))',
    linesToCode([
      'someObject = {',
      '  someFunc: jasmine.createSpy("someFunc")',
      '};'
    ]),
    linesToCode([
      'someObject = {',
      '  someFunc: jasmine.createSpy("someFunc").and.callThrough()',
      '};'
    ]),
    linesToCode([
      'function someFunc() {',
      '  this.spy = jasmine.createSpy("spy").and.callThrough()',
      '};'
    ])
  ],
  invalid: [
    {
      code: 'var spy = jasmine.createSpy()',
      errors: [
        {message: 'Unnamed spy'}
      ]
    },
    {
      code: 'spy = jasmine.createSpy()',
      errors: [
        {message: 'Unnamed spy'}
      ]
    },
    {
      code: 'var spy = jasmine.createSpy("callback")',
      errors: [
        {message: 'Variable should be named after the spy name'}
      ]
    },
    {
      code: 'spy = jasmine.createSpy("callback")',
      errors: [
        {message: 'Variable should be named after the spy name'}
      ]
    },
    {
      code: linesToCode([
        'someObject = {',
        '  spy: jasmine.createSpy("someFunc")',
        '};'
      ]),
      errors: [
        {message: 'Variable should be named after the spy name'}
      ]
    },
    {
      code: linesToCode([
        'someObject = {',
        '  spy: jasmine.createSpy("someFunc").and.callThrough()',
        '};'
      ]),
      errors: [
        {message: 'Variable should be named after the spy name'}
      ]
    },
    {
      code: linesToCode([
        'function someFunc() {',
        '  this.spy = jasmine.createSpy("someSpy").and.callThrough()',
        '};'
      ]),
      errors: [
        {message: 'Variable should be named after the spy name'}
      ]
    }
  ]
})
