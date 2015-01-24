# Disallow use of disabled tests (no-disabled-tests)

Jasmine uses `xdescribe` and `xit` to disable a suite/spec.

Whilst handy to toggle a broken suite/spec during development, disabled tests
are often an indicator of a deeper problem.

## Rule details

This rule triggers a **warning** (is set to **1** by default) whenever it
encounters `xdescribe` and `xit`.

The following patterns are considered warnings:

```js
xdescribe('My disabled suite', function() {});

describe('My suite', function() {
  xit('My disabled spec', function() {});
});
```

The following patterns are not warnings:

```js
describe('My suite', function() {});
describe('My suite', function() {
  it('My spec', function() {});
});
```
