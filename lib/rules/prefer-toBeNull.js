'use strict'

/**
 * @fileoverview Prefer toBeNull instead of toBe(null)
 * @author Osama Yousry
 */

module.exports = {
  meta: {
    schema: [
      {
        enum: ['always', 'never']
      }
    ],
    fixable: 'code'
  },
  create: function (context) {
    const always = context.options[0] !== 'never'

    return {
      CallExpression: function (node) {
        if (always) {
          if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'toBe' &&
              node.arguments[0] && node.arguments[0].type === 'Literal' && node.arguments[0].value === null) {
            context.report({
              message: 'Prefer toBeNull() to expect null',
              node: node.callee.property,
              fix: function (fixer) {
                if (node.arguments.length === 1) {
                  return fixer.replaceTextRange([node.callee.property.start, node.arguments[0].end], 'toBeNull(')
                } else {
                  return fixer.replaceTextRange([node.callee.property.start, node.arguments[1].start], 'toBeNull(')
                }
              }
            })
          }
        } else {
          if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'toBeNull') {
            context.report({
              message: 'Prefer toBe(null) to expect null',
              node: node.callee.property,
              fix: function (fixer) {
                if (node.arguments.length === 0) {
                  return fixer.replaceTextRange([node.callee.property.start, node.end], 'toBe(null)')
                } else {
                  return fixer.replaceTextRange([node.callee.property.start, node.arguments[0].start], 'toBe(null, ')
                }
              }
            })
          }
        }
      }
    }
  }
}
