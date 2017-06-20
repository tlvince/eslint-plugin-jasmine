'use strict'

var rule = require('../../lib/rules/no-unsafe-spy')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-unsafe-spy', rule, {
  valid: [
    // beforeEach block
    linesToCode([
      'beforeEach(function () {',
      '  var mySpy = jasmine.createSpy()',
      '  spyOn(someObj, "someMethod")',
      '})'
    ]),
    // beforeAll block
    linesToCode([
      'beforeAll(function () {',
      '  var mySpy = jasmine.createSpy()',
      '  spyOn(someObj, "someMethod")',
      '})'
    ]),
    // afterEach block
    linesToCode([
      'afterEach(function () {',
      '  var mySpy = jasmine.createSpy()',
      '  spyOn(someObj, "someMethod")',
      '})'
    ]),
    // afterAll block
    linesToCode([
      'afterAll(function () {',
      '  var mySpy = jasmine.createSpy()',
      '  spyOn(someObj, "someMethod")',
      '})'
    ]),
    // it block
    linesToCode([
      'it(function () {',
      '  var mySpy = jasmine.createSpy()',
      '  spyOn(someObj, "someMethod")',
      '})'
    ]),
    linesToCode([
      'beforeEach(function () {',
      '  var tape = jasmine.createSpyObj("tape", ["play", "pause"]);',
      '   it(function () {',
      '    expect(tape.play).toBeDefined();',
      '   })',
      '})'
    ])
  ],
  invalid: [
    {
      code: 'var mySharedSpy = jasmine.createSpy()',
      errors: [
        {message: 'Spy declared outside of before/after/it block'}
      ]
    },
    {
      code: 'spyOn(someObj, "someMethod")',
      errors: [
        {message: 'Spy declared outside of before/after/it block'}
      ]
    },
    {
      code: linesToCode([
        'describe(function () {',
        '  var mySharedSpy = jasmine.createSpy()',
        '})'
      ]),
      errors: [
        {message: 'Spy declared outside of before/after/it block'}
      ]
    },
    {
      code: linesToCode([
        'describe(function () {',
        '  spyOn(someObj, "someMethod")',
        '})'
      ]),
      errors: [
        {message: 'Spy declared outside of before/after/it block'}
      ]
    },
    {
      code: linesToCode([
        'describe(function () {',
        '  var tape = jasmine.createSpyObj("tape", ["play", "pause"]);',
        '   it(function () {',
        '    expect(tape.play).toBeDefined();',
        '   })',
        '})'
      ]),
      errors: [
        {message: 'Spy declared outside of before/after/it block'}
      ]
    }
  ]
})
