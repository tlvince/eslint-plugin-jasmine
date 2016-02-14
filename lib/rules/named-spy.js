'use strict'

/**
 * @fileoverview Enforce to make at least one expectation in an it block
 * @author Remco Haszing
 */

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      if (node.callee.type !== 'MemberExpression') {
        return
      }
      if (node.callee.property.name !== 'createSpy') {
        return
      }
      if (node.callee.object.name !== 'jasmine') {
        return
      }
      var identifier
      if (node.parent.type === 'VariableDeclarator') {
        identifier = node.parent.id
      } else if (node.parent.type === 'AssignmentExpression') {
        identifier = node.parent.left
      }
      if (!node.arguments.length || node.arguments[0].type !== 'Literal') {
        context.report(node, 'Unnamed spy')
      } else if (node.arguments[0].value !== identifier.name) {
        context.report(identifier, 'Variable should be named after the spy name')
      }
    }
  }
}
