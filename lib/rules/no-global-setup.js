'use strict'

/**
 * @fileoverview Disallow using setup and teardown methods outside a suite
 * @author Omer Ganim
 */

var suiteRegexp = /^(f|d|x)?describe(\..*$)?/
var setupRegexp = /^(before|after)(Each|All)$/
var getName = require('../helpers/getName')

module.exports = function (context) {
  var suiteDepth = 0
  var hasGlobalSetup = false
  var hasRootSuite = false
  var globalSetupNodes = []
  return {
    CallExpression: function (node) {
      if (suiteRegexp.test(getName(node.callee))) {
        hasRootSuite = true
        suiteDepth++
      } else if (setupRegexp.test(node.callee.name) && suiteDepth === 0) {
        hasGlobalSetup = true
        globalSetupNodes.push({
          name: node.callee.name,
          loc: {
            line: node.loc.line,
            column: node.loc.column
          }
        })
      }
    },
    'CallExpression:exit': function (node) {
      if (suiteRegexp.test(getName(node.callee))) {
        suiteDepth--
      }
    },
    'Program:exit': function () {
      if (hasGlobalSetup && hasRootSuite) {
        for (var i = 0, nodeDetail, len = globalSetupNodes.length; i < len; i++) {
          nodeDetail = globalSetupNodes[i]
          context.report({
            data: {
              name: nodeDetail.name
            },
            message: 'Do not use `{{name}}` outside a `describe` except for in global helpers.',
            loc: nodeDetail.loc
          })
        }
      }
    }
  }
}
