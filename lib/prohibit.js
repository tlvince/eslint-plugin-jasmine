'use strict';

module.exports = function(prohibiteds, context) {
  function matchProhibited(name) {
    var regex = new RegExp('^(' + prohibiteds.join('|') + ')$');
    return name.match(regex);
  }

  function report(context, node, result) {
    context.report(node, 'Unexpected {{name}}.', {
      name: result[1]
    });
  }

  return {
    'Identifier': function(node) {
      var result = matchProhibited(node.name);
      if (result) {
        report(context, node, result);
      }
    }
  };
};
