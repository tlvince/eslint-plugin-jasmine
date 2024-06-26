'use strict'

/**
 * @fileoverview Enforce to make at least one expectation in an it block
 * @author Remco Haszing
 */

var buildName = require('../helpers/buildName')

function create (context) {
  var allowed = context.options.length ? context.options : ['expect()', 'expectAsync()']

  var unchecked = []

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
      const ancestors = context.sourceCode
        ? context.sourceCode.getAncestors(node)
        : context.getAncestors()

      ancestors.some(function (ancestor) {
        var index = unchecked.indexOf(ancestor)

        if (index !== -1) {
          unchecked.splice(index, 1)
          return true
        }
      })
    },
    'Program:exit': function () {
      unchecked.forEach(function (node) {
        context.report({
          message: 'Test has no expectations',
          node
        })
      })
    }
  }
}

module.exports = {
  meta: {
    schema: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  create
}
