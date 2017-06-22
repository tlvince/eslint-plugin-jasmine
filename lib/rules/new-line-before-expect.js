'use strict'

/**
  * @fileoverview Enforce new line before expect inside a suite
  * @author Diana Suvorova
*/

var isPaddingBetweenTokens = require('../helpers/isPaddingBetweenTokens')

var blockRegexp = /^((f|x)?(it|describe))$/

module.exports = function (context) {
  var jasmineBlocks = []
  return {
    CallExpression: function (node) {
      if (blockRegexp.test(node.callee.name)) {
        jasmineBlocks.push(node)
      } else if (node.callee.name === 'expect' && jasmineBlocks.length > 0) {
        const parent = jasmineBlocks[jasmineBlocks.length - 1]
        if (!isFirstNodeInSuiteOrTest(node, parent)) {
          const tokenBeforeExpect = context.getSourceCode().getTokenBefore(node)
          if (!isPaddingBetweenTokens(tokenBeforeExpect, node)) {
            context.report(node, 'No new line before expect')
          }
        }
      }
    },
    'CallExpression:exit': function (node) {
      if (blockRegexp.test(node.callee.name)) {
        jasmineBlocks.pop(node)
      }
    }
  }
}

/**
 * Checks whether node is the first node inside a suite or a test
 * @param {ASTNode} node - node to check
 * @returns {boolean} Whether or not the node is the first node inside a suite or a test
 * @author Diana Suvorova
 */

function isFirstNodeInSuiteOrTest (node, parent) {
  const parentBody = parent.arguments && parent.arguments[1] && parent.arguments[1].body && parent.arguments[1].body.body
  const first = Array.isArray(parentBody) ? parentBody[0] : parentBody
  return first.start === node.start
}
