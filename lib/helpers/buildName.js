var buildName = function (node) {
  if (node.type === 'CallExpression') {
    return buildName(node.callee) + '()'
  }
  if (node.type === 'MemberExpression') {
    return buildName(node.object) + '.' + node.property.name
  }
  if (node.type === 'Identifier') {
    return node.name
  }
}

module.exports = buildName
