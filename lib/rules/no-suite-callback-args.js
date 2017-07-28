'use strict'

/**
 * @fileoverview Enforce that a suites's callback does not contain any arguments
 * @author Simen Bekkhus
 */

var suiteRegexp = /^(f|d|x)?describe$/

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      if (suiteRegexp.test(node.callee.name) && node.arguments.length > 1) {
        var arg = node.arguments[1]

        if ((arg.type === 'FunctionExpression' || arg.type === 'ArrowFunctionExpression') &&
              arg.params.length
            ) {
          context.report({
            message: "Unexpected argument in suite's callback",
            node
          })
        }
      }
    }
  }
}
