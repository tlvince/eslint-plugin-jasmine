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

      var identifier = findIdentifier(node)

      if (!node.arguments.length || node.arguments[0].type !== 'Literal') {
        context.report(node, 'Unnamed spy')
      } else if (node.arguments[0].value !== identifier.name) {
        context.report(identifier, 'Variable should be named after the spy name')
      }

      function findIdentifier (node) {
        var parent = node.parent
        while (parent) {
          if (parent.type === 'VariableDeclarator') {
            return parent.id
          } else if (parent.type === 'Property') {
            return parent.key
          } else if (parent.type === 'AssignmentExpression' && parent.left) {
            if (parent.left.type === 'Identifier') {
              return parent.left
            } else if (parent.left.property && parent.left.property.type === 'Identifier') {
              return parent.left.property
            }
          }
          parent = parent.parent
        }
      }
    }
  }
}
