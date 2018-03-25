'use strict'

const rule = require('../../lib/rules/no-promise-without-done-fail')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()

ruleTester.run('no-promise-without-done-fail', rule, {
  valid: [
    {
      code: 'it("", function(done) { somethingAsync.then(function (res) { expect(res).toBe(true); done();}).catch(done.fail)})'
    },
    {
      code: 'it("", function(done) { somethingAsync.then(function (res) { expect(res).toBe(true); done(); }).then(f).then(g).then(h).catch(done.fail)})'
    },
    {
      code: 'it("", function() { return somethingAsync.then(function(res) { expect(res).toBe(true); }) })'
    },
    {
      code: 'it("", function (done) { asyncFunc.then(done, done.fail);})'
    },
    {
      code: 'it("should not care about the name of the first parameter", function (finished) { somethingAsync().then(finished, finished.fail);});'
    }
  ],
  invalid: [
    {
      code: 'it("", function(done) { somethingAsync.then(function(res) { expect(res).toBe(true); done(); }) })',
      errors: [{
        message: 'An "it" that uses an async method should handle failure (use "done.fail")'
      }]
    },
    {
      code: 'it("", function(done) { somethingAsync.then(f).then(function(res) { expect(res).toBe(true); done(); }) })',
      errors: [{
        message: 'An "it" that uses an async method should handle failure (use "done.fail")'
      }],
      output: 'it("", function(done) { somethingAsync.then(f).then(function(res) { expect(res).toBe(true); done(); }).catch(done.fail) })'
    },
    {
      code: 'it("should not care about the name of the first parameter", function (done) { var finished = "foo"; somethingAsync().then(done, finished.fail) })',
      errors: [{
        message: 'An "it" that uses an async method should handle failure (use "done.fail")'
      }],
      output: 'it("should not care about the name of the first parameter", function (done) { var finished = "foo"; somethingAsync().then(done, finished.fail).catch(done.fail) })'
    }
  ]
})
