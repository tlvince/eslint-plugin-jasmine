'use strict'

/**
  * @fileoverview Enforce to have a new line between declarations inside describe
  * @author Diana Suvorova
*/

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      var pass = true
      if (node.callee.name === 'describe') {
        var declarations = getDescribeContent(node)
        pass = declarations.every((token, i) => {
          var next = declarations[i + 1]
          if (next) {
            return isPaddingBetweenTokens(token, next)
          } else {
            return true
          }
        })
      }

      if (!pass) {
        context.report({
          node,
          message: 'No new line between declarations'
        })
      };
    }
  }
}

 /**
 * Returns list of declaration tokens inside describe
 * @param {Token} describe The first token
 * @returns {Token[]} list of tokens inside describe
 */
function getDescribeContent (describe) {
  if (describe.arguments && describe.arguments[1] && describe.arguments[1].body.body) {
    return describe.arguments[1].body.body
  }
  return []
}

 /**
 * Checks if there is padding between two tokens
 * @param {Token} first The first token
 * @param {Token} second The second token
 * @returns {boolean} True if there is at least a line between the tokens
 */
function isPaddingBetweenTokens (first, second) {
  return second.loc.start.line - first.loc.end.line >= 2
}
