'use strict'

var rule = require('../../lib/rules/prefer-toBeTrue')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('prefer toBeTrue', rule, {
  valid: [
    {
      code: linesToCode([
        'expect(x).toBeTrue();'
      ])
    },
    {
      code: linesToCode([
        'expect(x).toBeTrue("with an optional message");'
      ])
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBe(true);'
      ])
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBe(true, "with an optional message");'
      ])
    }
  ],
  invalid: [
    {
      code: linesToCode([
        'expect(x).toBe(true);'
      ]),
      output: linesToCode([
        'expect(x).toBeTrue();'
      ]),
      errors: [
        {
          message: 'Prefer toBeTrue() to expect true'
        }
      ]
    },
    {
      code: linesToCode([
        'expect(x).toBe(true, "with an optional message", "???");'
      ]),
      output: linesToCode([
        'expect(x).toBeTrue("with an optional message", "???");'
      ]),
      errors: [
        {
          message: 'Prefer toBeTrue() to expect true'
        }
      ]
    },
    {
      code: linesToCode([
        'expect(x).toBe(',
        '  true,',
        '  "why would you do this?"',
        ');'
      ]),
      output: linesToCode([
        'expect(x).toBeTrue("why would you do this?"',
        ');'
      ]),
      errors: [
        {
          message: 'Prefer toBeTrue() to expect true'
        }
      ]
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBeTrue();'
      ]),
      output: linesToCode([
        'expect(x).toBe(true);'
      ]),
      errors: [
        {
          message: 'Prefer toBe(true) to expect true'
        }
      ]
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBeTrue("with optional args", "???");'
      ]),
      output: linesToCode([
        'expect(x).toBe(true, "with optional args", "???");'
      ]),
      errors: [
        {
          message: 'Prefer toBe(true) to expect true'
        }
      ]
    }
  ]
})
