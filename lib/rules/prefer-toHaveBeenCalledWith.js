'use strict'

/**
 * @fileoverview Prefer toHaveBeenCalledWith insteaf of toHaveBeenCalled
 * @author Diana Suvorova
 */

module.exports = function (context) {
  return {
    Identifier: function (node) {
      if (node.name === 'toHaveBeenCalled') {
        const tokensBefore = context.getTokensBefore(node, 2)
        if (tokensBefore[1] && tokensBefore[1].type === 'Punctuator' && tokensBefore[1].value === '.' &&
            tokensBefore[0] && tokensBefore[0].type === 'Identifier' && tokensBefore[0].value === 'not') {
          return
        }
        context.report({
          message: 'Prefer toHaveBeenCalledWith',
          node
        })
      }
    }
  }
}
