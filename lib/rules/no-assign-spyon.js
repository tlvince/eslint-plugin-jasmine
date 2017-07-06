'use strict'

/**
 * @fileoverview Disallow the assignment of a spyOn call result.
 * @author Remco Haszing
 */

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      if (node.callee.name === 'spyOn' && (node.parent.type === 'AssignmentExpression' || node.parent.type === 'VariableDeclarator')) {
        context.report({
          message: 'The result of spyOn() should not be assigned',
          node
        })
      }
    }
  }
}
