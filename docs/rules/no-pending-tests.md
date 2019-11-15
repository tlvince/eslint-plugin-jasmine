# Disallow use of pending tests (no-pending-tests)

Jasmine uses `pending` ("[pending specs][]") to mark a spec
as not implemented yet.

`pending` should only be used when creating a test suite skeleton.

[pending specs]: https://jasmine.github.io/api/3.5/global.html#pending

## Rule details

This rule triggers a **warning** (is set to **1** by default) whenever it
encounters `pending`.

The following patterns are considered warnings:

```js
it('My pending spec', function() { pending('I am pending'); });

describe('My suite', function() {
  it('My pending spec', function() {
    pending('I am pending');
  });
});
```

The following patterns are not warnings:

```js
it('My spec', function() {});

describe('My suite', function() {
  it('My spec', function() {});
});
```
