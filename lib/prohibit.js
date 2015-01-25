'use strict';

module.exports = function(prohibiteds, context) {
  var regex = new RegExp('^(' + prohibiteds.join('|') + ')$');

  return {
    'Identifier': function(node) {
      var result = node.name.match(regex);
      if (result) {
        context.report(node, 'Unexpected {{name}}.', {
          name: result[1]
        });
      }
    }
  };
};
