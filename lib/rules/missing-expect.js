'use strict'

/**
 * @fileoverview Enforce to make at least one expectation in an it block
 * @author Remco Haszing
 */

module.exports = function (context) {
  var allowed = context.options.length ? context.options : ['expect()']

  var unchecked = []

  function buildName (node) {
    if (node.type === 'CallExpression') {
      return buildName(node.callee) + '()'
    }
    if (node.type === 'MemberExpression') {
      return buildName(node.object) + '.' + node.property.name
    }
    if (node.type === 'Identifier') {
      return node.name
    }
  }

  return {
    CallExpression: function (node) {
      if (node.callee.name === 'it') {
        if (node.arguments.length > 1) {
          unchecked.push(node)
        }
        return
      }
      if (allowed.indexOf(buildName(node)) === -1) {
        return
      }
      context.getAncestors().some(function (ancestor) {
        var index = unchecked.indexOf(ancestor)

        if (index !== -1) {
          unchecked.splice(index, 1)
          return true
        }
      })
    },
    'Program:exit': function () {
      unchecked.forEach(function (node) {
        context.report(node, 'Test has no expectations')
      })
    }
  }
}
