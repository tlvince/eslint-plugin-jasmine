'use strict'

/**
 * @fileoverview For specs that take a callback, prefer the callback be named `done`
 * @author Elliot Nelson
 */

module.exports = {
  meta: {
    schema: [],
    fixable: 'code'
  },
  create: function (context) {
    // If we encounter an incorrectly named spec callback, rather than explore the tree
    // ourselves to find all references to the callback, it's easier to let eslint do
    // it for us.
    //
    // Keep a stack so we know whether or not we're currently looking for incorrectly
    // named references as we encounter identifiers in the AST tree.
    const stack = []

    return {
      'CallExpression': function (node) {
        if (node.callee.name === 'it') {
          let spec = node.arguments[1]

          if (spec && spec.params && spec.params.length > 0 && spec.params[0].name !== 'done') {
            stack.push({
              node: node,
              spec: spec,
              name: spec.params[0].name,
              refs: [],
              fixable: stack.length === 0
            })
          } else if (spec) {
            stack.push({
              node: node,
              spec: spec,
              name: undefined,
              refs: [],
              fixable: false
            })
          }
        }
      },
      'CallExpression:exit': function (node) {
        let issue = stack[stack.length - 1]

        if (issue && node === issue.node) {
          // In eslint 5.x, you can return a multi-change patch for a single
          // error message, which would allow us to error on the overall spec
          // but still patch all references.
          //
          // To maintain support for eslint 4.x, we'll report a message for
          // each reference to the incorrectly named callback instead, even
          // though it might mean several warnings per spec.
          issue.refs.forEach(function (ref) {
            context.report({
              message: 'Use the parameter `done` for spec callbacks',
              node: ref,
              fix: issue.fixable ? function (fixer) {
                return fixer.replaceText(ref, 'done')
              } : undefined
            })
          })
          stack.pop()
        }
      },
      'Identifier': function (node) {
        for (let i = 0; i < stack.length; i++) {
          if (stack[i].name === node.name) {
            stack[i].refs.push(node)
          }
        }
      }
    }
  }
}
