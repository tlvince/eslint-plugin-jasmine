'use strict'

var rule = require('../../lib/rules/named-spy')
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
    'onSuccess = jasmine.createSpy("onSuccess")'
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
    }
  ]
})
