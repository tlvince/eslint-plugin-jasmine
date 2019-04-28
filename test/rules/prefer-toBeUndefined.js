'use strict'

var rule = require('../../lib/rules/prefer-toBeUndefined')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('prefer toBeUndefined', rule, {
  valid: [
    {
      code: linesToCode([
        'expect(x).toBeUndefined();'
      ])
    },
    {
      code: linesToCode([
        'expect(x).toBeUndefined("with an optional message");'
      ])
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBe(undefined);'
      ])
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBe(undefined, "with an optional message");'
      ])
    }
  ],
  invalid: [
    {
      code: linesToCode([
        'expect(x).toBe(undefined);'
      ]),
      output: linesToCode([
        'expect(x).toBeUndefined();'
      ]),
      errors: [
        {
          message: 'Prefer toBeUndefined() to expect undefined'
        }
      ]
    },
    {
      code: linesToCode([
        'expect(x).toBe(undefined, "with an optional message", "???");'
      ]),
      output: linesToCode([
        'expect(x).toBeUndefined("with an optional message", "???");'
      ]),
      errors: [
        {
          message: 'Prefer toBeUndefined() to expect undefined'
        }
      ]
    },
    {
      code: linesToCode([
        'expect(x).toBe(',
        '  undefined,',
        '  "why would you do this?"',
        ');'
      ]),
      output: linesToCode([
        'expect(x).toBeUndefined("why would you do this?"',
        ');'
      ]),
      errors: [
        {
          message: 'Prefer toBeUndefined() to expect undefined'
        }
      ]
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBeUndefined();'
      ]),
      output: linesToCode([
        'expect(x).toBe(undefined);'
      ]),
      errors: [
        {
          message: 'Prefer toBe(undefined) to expect undefined'
        }
      ]
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBeUndefined("with optional args", "???");'
      ]),
      output: linesToCode([
        'expect(x).toBe(undefined, "with optional args", "???");'
      ]),
      errors: [
        {
          message: 'Prefer toBe(undefined) to expect undefined'
        }
      ]
    }
  ]
})
