'use strict'

/**
  * @fileoverview Enforce to have a new line between declarations inside describe
  * @author Diana Suvorova
*/

var hasPaddingBetweenTokens = require('../helpers/hasPaddingBetweenTokens')

var suiteRegexp = /^(f|x)?describe$/

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      var pass = true
      if (suiteRegexp.test(node.callee.name)) {
        var declarations = getDescribeDeclarationsContent(node)
        pass = declarations.every((token, i) => {
          var next = declarations[i + 1]
          if (next) {
            return hasPaddingBetweenTokens(token, next)
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
  var declartionsRegexp = /^(((before|after)(Each|All))|^(f|x)?(it|describe))$/
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
