# Prefer toHaveBeenCalledWith

This rule recommends using `toHaveBeenCalledWith` instead of `toHaveBeenCalled`.
Except for the usage with a negative matcher.
`not.toHaveBeenCalled()` is a **valid** syntax according to the rule.

## Rule details

This rule triggers a **warning** (is set to **1** by default).

The following pattern is a warning:

```js
describe("", function() {
  it("", function() {
    f(1);
    expect(f).toHaveBeenCalled();
  });
});
```

The following patterns are not warnings:

```js
describe("", function() {
  it("", function() {
    f(1);
    expect(f).toHaveBeenCalledWith(1);
  });
});
```

```js
describe("", function() {
  it("", function() {
    f();
    expect(f).toHaveBeenCalledWith();
  });
});
```

```js
describe("", function() {
  it("", function() {
    f(1);
    expect(f).not.toHaveBeenCalledWith(2);
  });
});
```

```js
describe("", function() {
  it("", function() {
    expect(f).not.toHaveBeenCalled();
  });
});
```
