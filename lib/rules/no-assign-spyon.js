'use strict'

/**
 * @fileoverview Disallow the assignment of a spyOn call result.
 * @author Remco Haszing
 */

function create (context) {
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

module.exports = {
  create
}
