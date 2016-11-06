'use strict'

/**
 * @fileoverview Disallow using setup and teardown methods outside a suite
 * @author Omer Ganim
 */

var suiteRegexp = /^(f|d|x)?describe$/
var setupRegexp = /^(before|after)(Each|All)$/

module.exports = function (context) {
  var suiteDepth = 0
  return {
    CallExpression: function (node) {
      if (suiteRegexp.test(node.callee.name)) {
        suiteDepth++
      } else if (setupRegexp.test(node.callee.name) && suiteDepth === 0) {
        context.report(node, 'Do not use `' + node.callee.name + '` outside a `describe`.')
      }
    },
    'CallExpression:exit': function (node) {
      if (suiteRegexp.test(node.callee.name)) {
        suiteDepth--
      }
    }
  }
}
