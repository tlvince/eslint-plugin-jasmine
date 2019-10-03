'use strict'

/**
 * @fileoverview Prefer toBeUndefined instead of toBe(undefined)
 * @author Elliot Nelson
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
              node.arguments[0] && node.arguments[0].name === 'undefined') {
            context.report({
              message: 'Prefer toBeUndefined() to expect undefined',
              node: node.callee.property,
              fix: function (fixer) {
                if (node.arguments.length === 1) {
                  return fixer.replaceTextRange([node.callee.property.start, node.arguments[0].end], 'toBeUndefined(')
                } else {
                  return fixer.replaceTextRange([node.callee.property.start, node.arguments[1].start], 'toBeUndefined(')
                }
              }
            })
          }
        } else {
          if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'toBeUndefined') {
            context.report({
              message: 'Prefer toBe(undefined) to expect undefined',
              node: node.callee.property,
              fix: function (fixer) {
                if (node.arguments.length === 0) {
                  return fixer.replaceTextRange([node.callee.property.start, node.end], 'toBe(undefined)')
                } else {
                  return fixer.replaceTextRange([node.callee.property.start, node.arguments[0].start], 'toBe(undefined, ')
                }
              }
            })
          }
        }
      }
    }
  }
}
