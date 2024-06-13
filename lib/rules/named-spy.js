'use strict'

/**
 * @fileoverview Enforce to make at least one expectation in an it block
 * @author Remco Haszing
 */

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

      if (!node.arguments.length || node.arguments[0].type !== 'Literal') {
        return context.report({
          message: 'Unnamed spy',
          node
        })
      }

      var identifier = findIdentifier(node)
      if (identifier && node.arguments[0].value !== identifier.name) {
        return context.report({
          message: 'Variable should be named after the spy name',
          node: identifier
        })
      }
    }
  }
}
