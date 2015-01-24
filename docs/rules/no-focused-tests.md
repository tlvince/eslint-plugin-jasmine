# Disallow use of focused tests (no-focused-tests)

Jasmine uses `fdescribe` and `fit` ("[focused specs][]") to run a suite/spec
exclusively.

Whilst handy during development, these can cause unexpected behaviour if
accidentally committed to source control.

**Note**: `fdescribe` and `fit` are known as `ddescribe` and `iit` in previous
Jasmine versions (<2.1). This rule checks for both syntaxes.

[focused specs]: http://jasmine.github.io/2.1/focused_specs.html

## Rule details

This rule triggers an **error** (is set to **2** by default) whenever it
encounters `fdescribe`, `fit`, `ddescribe` and `iit`.

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

## When not to use it

* You have alternatives steps in place to prevent focused tests (e.g. a Git
  pre-commit hook)

## Further Reading

* [grunt-ddescribe-iit](https://github.com/btford/grunt-ddescribe-iit)
