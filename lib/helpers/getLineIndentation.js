/**
 * The column number of the first token on the line
 * @author James Brennan
 *
 * @param {Node} node The node to read location information from
 * @param {SourceCode} sourceCode The SourceCode object for the file
 * @returns {number} The column number of the first token on the line
 */

var getPrevTokensOnLine = require('./getPrevTokensOnLine')

function getLineIndentation (node, sourceCode) {
  var prevTokens = getPrevTokensOnLine(node, sourceCode)
  var first = prevTokens.length ? prevTokens[0] : node
  return first.loc.start.column
}

module.exports = getLineIndentation
