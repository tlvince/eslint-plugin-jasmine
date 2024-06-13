'use strict'

/**
 * @fileoverview Returns a rule that check for duplicated blocks
 * @author Alexander Afanasyev
 */

module.exports = function (kind, branchBlocks, checkedBlocks) {
  function noDupes (context) {
    var suites = []
    var branch = []
    var skippedBranchNodes = []
    var branchMode = context.options[0] === 'branch'

    function isBranchNode (node) {
      return branchBlocks.indexOf(node.callee.name) >= 0 || !node.arguments
    }

    function isCheckedNode (node) {
      return checkedBlocks.indexOf(node.callee.name) >= 0 || !node.arguments
    }

    function extractLiteral (node) {
      switch (node.type) {
        case 'Literal':
          return node.value
        case 'BinaryExpression':
          if (node.operator === '+') {
            return extractLiteral(node.left) + extractLiteral(node.right)
          }
          return null
        default:
          return null
      }
    }

    return {
      CallExpression: function (node) {
        if (!isBranchNode(node) && !isCheckedNode(node)) {
          return
        }

        var descriptionNode = node.arguments && node.arguments[0]

        if (!descriptionNode) {
          skippedBranchNodes.push(node)
          return
        }

        var descriptionLiteral = extractLiteral(descriptionNode)

        if (!descriptionLiteral) {
          skippedBranchNodes.push(node)
          return
        }

        if (branchMode) {
          branch.push(descriptionLiteral)
        }

        if (isCheckedNode(node)) {
          var suite

          if (branchMode) {
            suite = branch.join(' ')
          } else {
            suite = descriptionLiteral
          }

          if (suites.indexOf(suite) !== -1) {
            context.report({
              data: { kind, suite },
              message: 'Duplicate {{kind}}: "{{suite}}"',
              node
            })
          }
          suites.push(suite)
        }
      },
      'CallExpression:exit': function (node) {
        if (branchMode && (isBranchNode(node) || isCheckedNode(node))) {
          if (skippedBranchNodes[skippedBranchNodes.length - 1] === node) {
            skippedBranchNodes.pop()
          } else {
            branch.pop()
          }
        }
      }
    }
  }

  noDupes.schema = [
    {
      enum: [
        'block',
        'branch'
      ]
    }
  ]

  return noDupes
}
