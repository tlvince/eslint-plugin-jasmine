'use strict'

/**
  * @fileoverview Enforce new line before expect inside a suite
  * @author Diana Suvorova
*/

var hasPaddingBetweenTokens = require('../helpers/hasPaddingBetweenTokens')

var blockRegexp = /^((f|x)?(it|describe))$/

module.exports = function (context) {
  var suiteDepth = 0
  return {
    CallExpression: function (node) {
      if (blockRegexp.test(node.callee.name)) {
        suiteDepth++
      } else if (node.callee.name === 'expect' && suiteDepth > 0) {
        const prevToken = context.getSourceCode().getTokenBefore(node)
        if (prevToken) {
          if (prevToken.type === 'Punctuator' && prevToken.value === '{') {
            return
          }
          if (!hasPaddingBetweenTokens(prevToken, node)) {
            context.report(node, 'No new line before expect')
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
