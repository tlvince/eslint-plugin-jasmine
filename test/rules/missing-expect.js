'use strict'

var rule = require('../../lib/rules/missing-expect')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('missing-expect', rule, {
  valid: [
    'it("", function() {expect();})',
    'it("", function() {expect().toBeSomething();})',
    'it("", function() {return expect();})',
    'it("", function() {if (foo) {expect();}})',
    'it("", function() {if (foo) {} else {expect();}})',
    'it("", function() {switch (foo) {case 1: expect()}})',
    'it("", function() {async(function() {expect()})})',
    'it("", function() {var foo = expect()})',
    'it("")',
    'it()',
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
      code: 'it("", function() {a.deeply.nested().expect.expression()})',
      options: [
        'a.deeply.nested().expect.expression()'
      ]
    }
  ],

  invalid: [
    {
      code: 'it("", function() {})',
      errors: [
        {
          message: 'Test has no expectations'
        }
      ]
    },
    {
      code: 'it("", function() {return;})',
      errors: [
        {
          message: 'Test has no expectations'
        }
      ]
    },
    {
      code: 'it("", function() {if (foo) {} else {}})',
      errors: [
        {
          message: 'Test has no expectations'
        }
      ]
    },
    {
      code: 'it("", function() {switch (foo) {case 1: break;}})',
      errors: [
        {
          message: 'Test has no expectations'
        }
      ]
    },
    {
      code: 'it("", function() {async(function() {});})',
      errors: [
        {
          message: 'Test has no expectations'
        }
      ]
    },
    {
      code: 'it("", function() {var foo = bar();})',
      errors: [
        {
          message: 'Test has no expectations'
        }
      ]
    }
  ]
})
