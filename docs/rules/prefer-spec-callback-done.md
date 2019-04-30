# Prefer spec callbacks be named `done` (prefer-spec-callback-done)

This rule recommends that asynchronous tests that receive a callback function
always name this parameter `done`.

## Rule details

This rule checks that specs that do have a parameter always name that parameter
`done`. You can enable this rule if you have differing standards on a codebase
and would like to have all asynchronous callbacks be consistently named.

Examples of *incorrect* code for this rule:

```js
it('returns the expected value', function (testComplete) {
  testComplete();
});

it('returns the expected value', finished => {
  finished();
});
```

Examples of *correct* code for this rule:

```js
it('returns the expected value', function (done) {
  done();
});

it('returns the expected value', done => {
  done();
});

it('returns the expected value', function () {
});
```
