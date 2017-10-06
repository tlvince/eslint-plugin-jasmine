'use strict'

/**
 * @fileoverview Enforce expect having a corresponding matcher.
 */

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      if (node.callee.name === 'expect') {
        // matcher was not called
        if (node.parent && node.parent.parent && node.parent.parent.type !== 'CallExpression' &&
          node.parent.parent.type !== 'MemberExpression') {
          context.report({
            message: 'Expect must have a corresponding matcher call.',
            node
          })
        }
      }
    }
  }
}
