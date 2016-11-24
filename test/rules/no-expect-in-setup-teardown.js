'use strict'

var rule = require('../../lib/rules/no-expect-in-setup-teardown')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-expect-in-setup-teardown', rule, {
  valid: [
    'beforeEach(function() {});',
    'afterEach(function() {});',
    'beforeAll(function() {});',
    'afterAll(function() {});',
    'it("", function() { expect(true).toBe(true); })',
    'beforeEach(function() { someOtherFunction(); });',
    'afterEach(function() { someOtherFunction(); });',
    'beforeAll(function() { someOtherFunction(); });',
    'afterAll(function() { someOtherFunction(); });',
    'expect(true).toBe(true);',
    {
      code: 'it("", function() {$httpBackend.expectGET();})',
      options: [
        '$httpBackend.expectGET()'
      ]
    },
    {
      code: 'it("", function() {return $httpBackend.expectGET();})',
      options: [
        '$httpBackend.expectGET()'
      ]
    },
    {
      code: 'it("", function() {a.deeply.nested().expect.expression();})',
      options: [
        'a.deeply.nested().expect.expression()'
      ]
    },
    {
      code: 'it("", function() { expect(true).toBe(true); })',
      options: [
        'a.deeply.nested().expect.expression()'
      ]
    }
  ],

  invalid: [
    {
      code: 'beforeEach(function() { expect(true).toBe(true); });',
      errors: [
        {
          message: 'Unexpected "expect()" call in "beforeEach()"'
        }
      ]
    },
    {
      code: 'afterEach(function() { expect(true).toBe(true); });',
      errors: [
        {
          message: 'Unexpected "expect()" call in "afterEach()"'
        }
      ]
    },
    {
      code: 'beforeAll(function() { expect(true).toBe(true); });',
      errors: [
        {
          message: 'Unexpected "expect()" call in "beforeAll()"'
        }
      ]
    },
    {
      code: 'afterAll(function() { expect(true).toBe(true); });',
      errors: [
        {
          message: 'Unexpected "expect()" call in "afterAll()"'
        }
      ]
    },
    {
      code: 'beforeEach(function() {$httpBackend.expectGET();})',
      options: [
        '$httpBackend.expectGET()'
      ],
      errors: [
        {
          message: 'Unexpected "$httpBackend.expectGET()" call in "beforeEach()"'
        }
      ]
    },
    {
      code: 'beforeAll(function() {return $httpBackend.expectGET();})',
      options: [
        '$httpBackend.expectGET()'
      ],
      errors: [
        {
          message: 'Unexpected "$httpBackend.expectGET()" call in "beforeAll()"'
        }
      ]
    },
    {
      code: 'afterEach(function() {a.deeply.nested().expect.expression()})',
      options: [
        'a.deeply.nested().expect.expression()'
      ],
      errors: [
        {
          message: 'Unexpected "a.deeply.nested().expect.expression()" call in "afterEach()"'
        }
      ]
    }
  ]
})
