'use strict'

const rule = require('../../lib/rules/prefer-promise-strategies')
const { RuleTester } = require('eslint')

const parserOptions = { ecmaVersion: 6 }
const eslintTester = new RuleTester({ parserOptions })

eslintTester.run('prefer-promise-strategies', rule, {
  valid: [
    { code: 'spy.and.returnValue(Promise.foo());' },
    { code: 'spy.and.returnValue();' },
    { code: 'spy.and.returnValue(123);' },
    { code: 'spy.and.returnValue(foo());' },
    { code: 'obj.returnValue(Promise.reject());' },
    { code: 'spy.and.returnValue(fn => fn(Promise.resolve(123)));' },
    {
      // Should be invalid but would need more complex analysis
      code: 'const s = spy.and; s.returnValue(Promise.resolve(123));'
    }
  ],
  invalid: [
    {
      code: 'spy.withArgs(0).returnValue(Promise.resolve(123));',
      output: 'spy.withArgs(0).resolveTo(123);',
      errors: [
        { message: 'Prefer resolveTo' }
      ]
    },
    {
      code: 'spy.and.returnValue(Promise.reject(123));',
      output: 'spy.and.rejectWith(123);',
      errors: [
        { message: 'Prefer rejectWith' }
      ]
    },
    { // Handles empty argument list
      code: 'spy.and.returnValue(Promise.resolve());',
      output: 'spy.and.resolveTo();',
      errors: [
        { message: 'Prefer resolveTo' }
      ]
    }
  ]
})
