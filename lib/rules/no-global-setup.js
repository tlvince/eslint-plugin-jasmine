'use strict'

/**
 * @fileoverview Disallow using setup and teardown methods outside a suite
 * @author Omer Ganim
 */

var suiteRegexp = /^(f|d|x)?describe$/
var setupRegexp = /^(before|after)(Each|All)$/

module.exports = function (context) {
  var suiteDepth = 0
  var hasGlobalSetup = false
  var hasRootSuite = false
  var globalSetupNames = []
  return {
    CallExpression: function (node) {
      if (suiteRegexp.test(node.callee.name)) {
        hasRootSuite = true
        suiteDepth++
      } else if (setupRegexp.test(node.callee.name) && suiteDepth === 0) {
        hasGlobalSetup = true
        globalSetupNames.push(node.callee.name)
      }
    },
    'CallExpression:exit': function (node) {
      if (suiteRegexp.test(node.callee.name)) {
        suiteDepth--
      }
    },
    'Program:exit': function () {
      if (hasGlobalSetup && hasRootSuite) {
        context.report({
          data: {
            names: globalSetupNames.join(', ')
          },
          message: 'Do not use `{{names}}` outside a `describe` except for in global helpers.',
          loc: {
            line: 1,
            column: 0
          }
        })
      }
    }
  }
}
