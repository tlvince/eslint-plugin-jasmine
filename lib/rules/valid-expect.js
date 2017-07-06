'use strict'

/**
 * @fileoverview Enforce valid expect() usage
 * @author Alexander Afanasyev
 */

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      if (node.callee.name === 'expect') {
        // checking "expect()" arguments
        if (node.arguments.length > 1) {
          context.report({
            message: 'More than one argument passed to expect()',
            node
          })
        } else if (node.arguments.length === 0) {
          context.report({
            message: 'No arguments passed to expect()',
            node
          })
        }

        // matcher was not called
        if (node.parent && node.parent.parent && node.parent.parent.type !== 'CallExpression' &&
          node.parent.parent.type !== 'MemberExpression') {
          context.report({
            message: 'Matcher was not called',
            node
          })
        }
      }
    },

    // nothing called on "expect()"
    'CallExpression:exit': function (node) {
      if (node.callee.name === 'expect' && node.parent.type === 'ExpressionStatement') {
        context.report({
          message: 'Nothing called on expect()',
          node
        })
      }
    }
  }
}
