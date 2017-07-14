# Prefer toHaveBeenCalledWith

This rule recommends using `toHaveBeenCalledWith` instead of `toHaveBeenCalled`.
## Rule details

This rule is turned off by default (is set to **0**).

The following patterns are considered a warning:


```js
describe("", function() {
  it("", function() {
    f(1);
    expect(f).toHaveBeenCalled();
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
    expect(f).not.toHaveBeenCalled(2);
  });
});
```
