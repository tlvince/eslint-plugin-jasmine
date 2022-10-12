'use strict'

var rule = require('../../lib/rules/prefer-toBeNull')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('prefer toBeNull', rule, {
  valid: [
    {
      code: linesToCode([
        'expect(x).toBeNull();'
      ])
    },
    {
      code: linesToCode([
        'expect(x).toBeNull("with an optional message");'
      ])
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBe(null);'
      ])
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBe(null, "with an optional message");'
      ])
    }
  ],
  invalid: [
    {
      code: linesToCode([
        'expect(x).toBe(null);'
      ]),
      output: linesToCode([
        'expect(x).toBeNull();'
      ]),
      errors: [
        {
          message: 'Prefer toBeNull() to expect null'
        }
      ]
    },
    {
      code: linesToCode([
        'expect(x).toBe(null, "with an optional message", "???");'
      ]),
      output: linesToCode([
        'expect(x).toBeNull("with an optional message", "???");'
      ]),
      errors: [
        {
          message: 'Prefer toBeNull() to expect null'
        }
      ]
    },
    {
      code: linesToCode([
        'expect(x).toBe(',
        '  null,',
        '  "why would you do this?"',
        ');'
      ]),
      output: linesToCode([
        'expect(x).toBeNull("why would you do this?"',
        ');'
      ]),
      errors: [
        {
          message: 'Prefer toBeNull() to expect null'
        }
      ]
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBeNull();'
      ]),
      output: linesToCode([
        'expect(x).toBe(null);'
      ]),
      errors: [
        {
          message: 'Prefer toBe(null) to expect null'
        }
      ]
    },
    {
      options: ['never'],
      code: linesToCode([
        'expect(x).toBeNull("with optional args", "???");'
      ]),
      output: linesToCode([
        'expect(x).toBe(null, "with optional args", "???");'
      ]),
      errors: [
        {
          message: 'Prefer toBe(null) to expect null'
        }
      ]
    }
  ]
})
