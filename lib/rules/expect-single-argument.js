'use strict'

/**
 * @fileoverview Enforce expect having a single argument.
 */

function create (context) {
  return {
    CallExpression: function (node) {
      if (node.callee.name === 'expect') {
        // checking "expect()" arguments
        if (node.arguments.length > 1) {
          context.report({
            message: 'Expect must have a single argument. More than one argument were provided.',
            node
          })
        } else if (node.arguments.length === 0 && node.parent.property?.name !== 'nothing') {
          context.report({
            message: 'Expect must have a single argument. No arguments were provided.',
            node
          })
        }
      }
    }
  }
}

module.exports = {
  create
}
