'use strict'

var rule = require('../../lib/rules/capitalized-it')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('capitalized-it', rule, {
  valid: [
    {
      options: [
        'always'
      ],
      code: toCode([
        'it("This is valid.", function() {});'        
      ])
    },   
    {
      options: [
        'never'
      ],
      code: toCode([
        'it("this is valid.", function() {});'        
      ])
    },  
  ],

  invalid: [
    {
      options: [
        'always'
      ],
      code: toCode([
        'it("this is invalid.", function() {});'        
      ])
    },   
    {
      options: [
        'never'
      ],
      code: toCode([
        'it("This is invalid.", function() {});'        
      ])
    },  
  ]
})

