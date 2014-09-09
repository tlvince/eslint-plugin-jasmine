/**
 * @fileoverview Disallow use of exclusive tests
 * @author Tom Vincent
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    rules: {
        'no-exclusive-tests': function(context) {
            var prohibited = [
                "ddescribe",
                "xdescribe",
                "iit",
                "xit"
            ];

            //--------------------------------------------------------------------------
            // Helpers
            //--------------------------------------------------------------------------

            function matchProhibited(name) {
                var regex = new RegExp("^(" + prohibited.join("|") + ")$");
                return name.match(regex);
            }

            function report(context, node, result) {
                context.report(node, "Unexpected {{name}}.", { name: result[1] });
            }

            //--------------------------------------------------------------------------
            // Public
            //--------------------------------------------------------------------------

            return {

                "Identifier": function(node) {
                    var result = matchProhibited(node.name);
                    if (result) {
                        report(context, node, result);
                    }
                }

            };

        }
    }
};
