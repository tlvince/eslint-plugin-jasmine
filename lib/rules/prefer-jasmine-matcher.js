'use strict'

/**
  * @fileoverview Enforce jasmine matchers are used instead of comparison within expect
  * @author Diana Suvorova
*/

var blockRegexp = /^((f|x)?(it|describe))$/

var operators = ['===', '==', '!==', '!=', '>', '<', '>=', '<=']

module.exports = function (context) {
  var suiteDepth = 0
  return {
    CallExpression: function (node) {
      if (blockRegexp.test(node.callee.name)) {
        suiteDepth++
      } else if (node.callee.name === 'expect' && suiteDepth > 0) {
        var expectNode = node.arguments && node.arguments[0]
        if (expectNode && expectNode.type === 'BinaryExpression' && operators.indexOf(expectNode.operator) > -1) {
          context.report({
            message: 'Prefer jasmine matcher instead of comparison',
            node
          })
        }
      }
    },
    'CallExpression:exit': function (node) {
      if (blockRegexp.test(node.callee.name)) {
        suiteDepth--
      }
    }
  }
}
