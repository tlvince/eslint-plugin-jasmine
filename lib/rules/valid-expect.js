'use strict'

/**
 * @fileoverview Enforce valid expect() usage
 * @author Alexander Afanasyev
 */

module.exports = function (context) {
  return {
    // checking "expect()" arguments
    CallExpression: function (node) {
      if (node.callee.name === 'expect') {
        if (node.arguments.length > 1) {
          context.report(node, 'More than one argument passed to expect()')
        } else if (node.arguments.length === 0) {
          context.report(node, 'No arguments passed to expect()')
        }
      }
    },

    // nothing called on "expect()"
    'CallExpression:exit': function (node) {
      if (node.callee.name === 'expect' && node.parent.type === 'ExpressionStatement') {
        context.report(node, 'Nothing called on expect()')
      }
    }
  }
}
