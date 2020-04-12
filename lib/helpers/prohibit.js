'use strict'

module.exports = function (prohibiteds, context) {
  var regex = new RegExp('^(' + prohibiteds.join('|') + ')$')

  return {
    CallExpression: function (node) {
      var result = node.callee && node.callee.name && node.callee.name.match(regex)

      if (result) {
        context.report({
          data: {
            name: result[1]
          },
          message: 'Unexpected {{name}}.',
          node,
          loc: {
            start: node.loc.start,
            end: {
              line: node.loc.start.line,
              column: node.loc.start.column + node.callee.name.length
            }
          }
        })
      }
    }
  }
}
