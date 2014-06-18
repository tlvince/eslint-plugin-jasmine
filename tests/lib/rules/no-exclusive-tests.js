/**
 * @fileoverview Disallow use of exclusive tests
 * @author Tom Vincent
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/no-exclusive-tests", {

    valid: [
        "describe('', function() {})",
        "describe('', function() { it('', function() {} ) })"
    ],

    invalid: [
        {
            code: "ddescribe('My exclusive suite', function() {});",
            errors: [{
                message: "Unexpected ddescribe.",
                type: "Identifier"
            }]
        },
        {
            code: "iit('My exclusive test', function() {});",
            errors: [{
                message: "Unexpected iit.",
                type: "Identifier"
            }]
        },
        {
            code: "xdescribe('My disabled suite', function() {});",
            errors: [{
                message: "Unexpected xdescribe.",
                type: "Identifier"
            }]
        },
        {
            code: "xit('My disabled spec', function() {});",
            errors: [{
                message: "Unexpected xit.",
                type: "Identifier"
            }]
        }
    ]
});
