# Disallow use of exclusive tests (no-exclusive-tests)

Jasmine uses `ddescribe` to run a specific test suite and `iit` to run
a specific spec exclusively ("[focused specs](focused)"; `fdescribe` and `fit`
as of Jasmine v2.1).

Whilst handy during development, these can cause unexpected behaviour if
accidentally committed to source control.

[focused]: http://jasmine.github.io/2.1/focused_specs.html

## Rule Details

This rule aims to warn whenever it encounters `ddescribe`, `iit`, `fdescribe` and `fit`.

The following patterns are considered warnings:

```js
ddescribe('My exclusive suite', function() {});

describe('My suite', function() {
  iit('My exclusive spec', function() {});
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
syntax) or otherwise have steps in place to prevent exclusive tests (e.g. a Git
pre-commit hook).

## Further Reading

* [grunt-ddescribe-iit](https://github.com/btford/grunt-ddescribe-iit)
