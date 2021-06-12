'use strict'

/**
 * @fileoverview Enforce to make at least one expectation in an it block
 * @author Remco Haszing
 */

function findIdentifier (node) {
  var parent = node.parent
  while (parent) {
    if (isNodeOfAType(parent, 'VariableDeclarator')) {
      return {
        node: parent.id,
        name: parent.id.name
      }
    } else if (isNodeOfAType(parent, 'Property') && isNodeOfAType(parent.key, 'Identifier')) {
      return {
        node: parent.key,
        name: parent.key.name
      }
    } else if (isNodeOfAType(parent, 'Property') && isNodeOfAType(parent.key, 'Literal')) {
      return {
        node: parent.key,
        name: parent.key.value
      }
    } else if (isNodeOfAType(parent, 'AssignmentExpression') && isNodeOfAType(parent.left, 'Identifier')) {
      return {
        node: parent.left,
        name: parent.left.name
      }
    } else if (isNodeOfAType(parent, 'AssignmentExpression') && isNodeOfAType(parent.left && parent.left.property, 'Identifier')) {
      return {
        node: parent.left.property,
        name: parent.left.property.name
      }
    }
    parent = parent.parent
  }
}

function isNodeOfAType (node, type) {
  return node && node.type === type
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
          node: identifier.node
        })
      }
    }
  }
}
