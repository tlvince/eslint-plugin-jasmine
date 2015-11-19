'use strict'

var rule = require('../../lib/rules/no-assign-spyon')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-assign-spyon', rule, {
  valid: [
    'var result = someFunc()',
    'result = someFunc()'
  ],
  invalid: [
    {
      code: 'var spy = spyOn(object, "property");',
      errors: [
        {
          message: 'The result of spyOn() should not be assigned'
        }
      ]
    },
    {
      code: 'spy = spyOn(object, "property");',
      errors: [
        {
          message: 'The result of spyOn() should not be assigned'
        }
      ]
    }
  ]
})
