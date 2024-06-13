'use strict'

/**
 * @fileoverview Prefer resolveTo and rejectWith instead of
 *   returnValue(Promise.{resolve,reject}(X)).
 * @author Raphael von der Grün
 */

// Matches X.{and,withArgs(Y)}.returnValue(Z)
const SpyStrategyCall = `CallExpression:matches(
  [callee.object.property.name=and],
  [callee.object.callee.property.name=withArgs]
)`.replace(/\s+/g, ' ')
const ReturnStrategyCtor = `${SpyStrategyCall}[callee.property.name=returnValue]`

// Matches Promise.{resolve,reject}(X)
const PromiseCall = 'CallExpression[callee.object.name=Promise]'
const SettledPromiseCtor = `${PromiseCall}[callee.property.name=/resolve|reject/]`

/** @type {import("@types/eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: []
  },

  create: context => ({
    /**
     * Visits SettledPromiseCtors that are passed as first argument to a ReturnStrategyCtor
     * @type {import("@types/eslint").Rule.NodeListener['CallExpression']}
     */
    [`${ReturnStrategyCtor} > ${SettledPromiseCtor}.arguments:first-child`] (promiseCall) {
      const returnStrategyCall = promiseCall.parent
      const returnValueMethod = returnStrategyCall.callee.property
      const preferredMethod = promiseCall.callee.property.name === 'resolve'
        ? 'resolveTo' : 'rejectWith'

      context.report({
        message: `Prefer ${preferredMethod}`,

        // Highlight only the returnValue(…) part, not the entire call
        loc: {
          start: returnValueMethod.loc.start,
          end: returnStrategyCall.loc.end
        },

        fix (fixer) {
          const code = context.getSourceCode()
          return [
            // Replace Promise constructor call with its arguments
            fixer.remove(promiseCall.callee),
            fixer.remove(code.getTokenAfter(promiseCall.callee)),
            fixer.remove(code.getLastToken(promiseCall)),

            // Replace returnValue method with resolveTo or rejectWith
            fixer.replaceText(returnValueMethod, preferredMethod)
          ]
        }
      })
    }
  })
}
