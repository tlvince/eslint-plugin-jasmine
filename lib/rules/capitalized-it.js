'use strict'

/**
  * @fileoverview Enforce the starting case of the first character of
  * an it statement to either be lowercase or uppercase.
 */

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      if (node.callee.name === 'it') {
        if (node.arguments.length >= 1 && context.options.length !== 0) {
          var mode = context.options[0]
          var value = node.arguments[0]

          if (value.length > 0) {
            if (mode === 'always' && value.charAt(0).toUpperCase() !== value.charAt(0)) {
              context.report({
                message: 'it must start with an upper case letter.',
                node
              })
            } else if (mode === 'never' && value.charAt(0).toLowerCase() !== value.charAt(0)) {
              context.report({
                message: 'it must start with a lower case letter.',
                node
              })
            }
          }
        }
      }
    }
  }
}
