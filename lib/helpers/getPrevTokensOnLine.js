/**
 * @fileoverview Returns an array containing the tokens preceding a node on the same line
 * @author James Brennan
 * @param {Node} node The node to read location information from
 * @param {SourceCode} sourceCode The SourceCode object for the file
 * @returns {Token[]} An array containing tokens on the same line, ordered left to right
*/

function getPrevTokensOnLine (node, sourceCode) {
  var prevToken = sourceCode.getTokenBefore(node)
  var tokens = []
  while (prevToken.loc.end.line === node.loc.start.line) {
    tokens.unshift(prevToken)
    prevToken = sourceCode.getTokenBefore(prevToken)
  }
  return tokens
}

module.exports = getPrevTokensOnLine
