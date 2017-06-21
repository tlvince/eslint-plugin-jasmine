'use strict'

/**
  * @fileoverview Enforce new line before expect inside a suite
  * @author Diana Suvorova
*/

var isPaddingBetweenTokens = require('../helpers/isPaddingBetweenTokens')

var suiteRegexp = /^(f|d|x)?describe$/

module.exports = function (context) {
  var suiteDepth = 0
  return {
    CallExpression: function (node) {
      if (suiteRegexp.test(node.callee.name)) {
        suiteDepth++
      } else if (node.callee.name === 'expect' && suiteDepth > 0) {
        const tokenBeforeExpect = context.getSourceCode().getTokenBefore(node)
        if (!isPaddingBetweenTokens(tokenBeforeExpect, node)) {
          context.report(node, 'No new line before expect')
        }
      }
    },
    'CallExpression:exit': function (node) {
      if (suiteRegexp.test(node.callee.name)) {
        suiteDepth--
      }
    }
  }
}
