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
        var declarations = getDescribeDeclarationsContent(node)
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
 * Returns list of declaration tokens (it, before,after/each,all) inside describe
 * @param {Token} describe The first token
 * @returns {Token[]} list of declaration tokens inside describe
 */
function getDescribeDeclarationsContent (describe) {
  var declartionsRegexp = /^((before|after)(Each|All))|it$/
  var declarations = []
  if (describe.arguments && describe.arguments[1] && describe.arguments[1].body.body) {
    var content = describe.arguments[1].body.body
    content.forEach(node => {
      if (node.type === 'ExpressionStatement' && node.expression.callee && declartionsRegexp.test(node.expression.callee.name)) {
        declarations.push(node)
      }
    })
  }
  return declarations
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
