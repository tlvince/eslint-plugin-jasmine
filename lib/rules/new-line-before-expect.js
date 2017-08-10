'use strict'

/**
  * @fileoverview Enforce new line before expect inside a suite
  * @author Diana Suvorova
*/

var hasPaddingBetweenTokens = require('../helpers/hasPaddingBetweenTokens')

var blockRegexp = /^((f|x)?(it|describe))$/

module.exports = function (context) {
  var suiteDepth = 0
  var lastExpectNode
  return {
    CallExpression: function (node) {
      if (blockRegexp.test(node.callee.name)) {
        lastExpectNode = null
        suiteDepth++
      } else if (node.callee.name === 'expect' && suiteDepth > 0) {
        if (lastExpectNode && linesDelta(node, lastExpectNode) === 1) {
          lastExpectNode = node
          return
        }
        lastExpectNode = node
        const prevToken = context.getSourceCode().getTokenBefore(node)
        if (prevToken) {
          if (prevToken.type === 'Punctuator' && prevToken.value === '{') {
            return
          }
          if (!hasPaddingBetweenTokens(prevToken, node)) {
            context.report({
              fix (fixer) {
                return fixer.insertTextBefore(node, '\n')
              },
              message: 'No new line before expect',
              node
            })
          }
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

function linesDelta (node1, node2) {
  return Math.abs(node1.loc.start.line - node2.loc.start.line)
}
