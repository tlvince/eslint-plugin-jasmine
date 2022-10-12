'use strict'

var rule = require('../../lib/rules/prefer-toBeFalse')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('prefer toBeFalse', rule, {
  valid: [
    {
      code: linesToCode([
        'expect(x).toBeFalse();'
      ])
    },
    {
      code: linesToCode([
        'expect(x).toBeFalse("with an optional message");'
      ])
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBe(false);'
      ])
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBe(false, "with an optional message");'
      ])
    }
  ],
  invalid: [
    {
      code: linesToCode([
        'expect(x).toBe(false);'
      ]),
      output: linesToCode([
        'expect(x).toBeFalse();'
      ]),
      errors: [
        {
          message: 'Prefer toBeFalse() to expect false'
        }
      ]
    },
    {
      code: linesToCode([
        'expect(x).toBe(false, "with an optional message", "???");'
      ]),
      output: linesToCode([
        'expect(x).toBeFalse("with an optional message", "???");'
      ]),
      errors: [
        {
          message: 'Prefer toBeFalse() to expect false'
        }
      ]
    },
    {
      code: linesToCode([
        'expect(x).toBe(',
        '  false,',
        '  "why would you do this?"',
        ');'
      ]),
      output: linesToCode([
        'expect(x).toBeFalse("why would you do this?"',
        ');'
      ]),
      errors: [
        {
          message: 'Prefer toBeFalse() to expect false'
        }
      ]
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBeFalse();'
      ]),
      output: linesToCode([
        'expect(x).toBe(false);'
      ]),
      errors: [
        {
          message: 'Prefer toBe(false) to expect false'
        }
      ]
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBeFalse("with optional args", "???");'
      ]),
      output: linesToCode([
        'expect(x).toBe(false, "with optional args", "???");'
      ]),
      errors: [
        {
          message: 'Prefer toBe(false) to expect false'
        }
      ]
    }
  ]
})
