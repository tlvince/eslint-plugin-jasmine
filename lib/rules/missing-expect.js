'use strict'

/**
 * @fileoverview Enforce to make at least one expectation in an it block
 * @author Remco Haszing
 */

var buildName = require('../helpers/buildName')

module.exports = function (context) {
  var allowed = context.options.length ? context.options.map((allowedExpression) => new RegExp(allowedExpression.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))) : [/^expect()/, /^expectAsync()/]

  var unchecked = []

  return {
    CallExpression: function (node) {
      if (node.callee.name === 'it') {
        if (node.arguments.length > 1) {
          unchecked.push(node)
        }
        return
      }
      var builtName = buildName(node)
      if (!allowed.some((regexp) => regexp.test(builtName))) {
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
        context.report({
          message: 'Test has no expectations',
          node
        })
      })
    }
  }
}
