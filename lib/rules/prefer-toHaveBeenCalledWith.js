'use strict'

/**
 * @fileoverview Prefer toHaveBeenCalledWith insteaf of toHaveBeenCalled
 * @author Diana Suvorova
 */

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      if (node.callee.type === 'MemberExpression' && node.callee.property && node.callee.property.name === 'toHaveBeenCalled') {
        context.report({
          message: 'Prefer toHaveBeenCalledWith',
          node
        })
      }
    }
  }
}
