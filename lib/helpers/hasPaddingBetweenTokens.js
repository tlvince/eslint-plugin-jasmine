/**
* Checks if there is padding between two tokens
* @param {Token} first The first token
* @param {Token} second The second token
* @returns {boolean} True if there is at least a line between the tokens
*/
function hasPaddingBetweenTokens (first, second) {
  return second.loc.start.line - first.loc.end.line >= 2
}

module.exports = hasPaddingBetweenTokens
