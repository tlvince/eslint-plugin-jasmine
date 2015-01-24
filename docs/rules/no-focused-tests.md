# Disallow use of focused tests (no-focused-tests)

Jasmine uses `fdescribe` and `fit` ("[focused specs][]") to run a suite/spec
exclusively.

Whilst handy during development, these can cause unexpected behaviour if
accidentally committed to source control.

**Note**: `fdescribe` and `fit` are known as `ddescribe` and `iit` in previous
Jasmine versions (<2.1). This rule checks for both syntaxes.

[focused specs]: http://jasmine.github.io/2.1/focused_specs.html

## Rule Details

This rule aims to warn whenever it encounters `fdescribe`, `fit`, `ddescribe`
and `iit`.

The following patterns are considered warnings:

```js
ddescribe('My focused suite', function() {});

describe('My suite', function() {
  iit('My focused spec', function() {});
});

```

The following patterns are not warnings:

```js
describe('My suite', function() {});
describe('My suite', function() {
  it('My spec', function() {});
});

```

## When Not To Use It

If you're not using a test runner (Jasmine, or a runner with Jasmine-like
syntax) or otherwise have steps in place to prevent focused tests (e.g. a Git
pre-commit hook).

## Further Reading

* [grunt-ddescribe-iit](https://github.com/btford/grunt-ddescribe-iit)
