/*
 * Generate readble code lines block
 * // description
 * lines[0]
 * lines[1]
 * ...
 * lines[n]
 */
function linesToCode (lines, description) {
  return (description ? '// ' + description : '') + '\n' + lines.join('\n')
}

module.exports = linesToCode
