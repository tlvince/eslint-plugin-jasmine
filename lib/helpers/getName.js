/*
  getName(describe()) === 'describe';
  getName(describe.only()) === 'describe.only';
  getName(describe['only']()) === 'describe.only';
*/

function getName (node) {
  function joinNames (a, b) {
    return a && b ? a + '.' + b : null
  }

  switch (node && node.type) {
    case 'Identifier':
      return node.name
    case 'Literal':
      return node.value
    case 'MemberExpression':
      return joinNames(getName(node.object), getName(node.property))
  }

  return null
}

module.exports = getName
