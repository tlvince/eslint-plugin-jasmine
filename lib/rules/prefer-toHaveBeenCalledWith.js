'use strict'

/**
 * @fileoverview Prefer toHaveBeenCalledWith insteaf of toHaveBeenCalled
 * @author Diana Suvorova
 */

function create (context) {
  return {
    Identifier: function (node) {
      if (node.name === 'toHaveBeenCalled') {
        const tokensBefore = context.sourceCode
          ? context.sourceCode.getTokensBefore(node, 2)
          : context.getTokensBefore(node, 2)

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

module.exports = {
  create
}
