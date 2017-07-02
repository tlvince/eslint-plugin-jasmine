# Enforce jasmine matchers are used instead of comparison within expect

This rule enforces that within `expect` jasmine matchers are used instead of comparison operators such as
`===`, `==`, `!==`, `!=`, `>`, `<`, `>=`, `<=`.
Standard jasmine matcher include : `toEqual`, `toBe`, `toBeLessThan`, `toBeGreaterThan`, `toThrowError`, `toContain`, `toBeNull`, `toBeUndefined` etc.

## Rule details

This rule triggers a **warning** (is set to **1** by default).

The following patterns are considered a warning:


```js
describe("", function() {
  it("", function() {
    var a = 1;
    expect(a > 0).toBe(true);
  });
});
```

```js
describe("", function() {
  it("", function() {
    var a = "abc";
    expect(a.length === 3).toBe(true);
  });
});
```

The following patterns are not warnings:

```js
describe("", function() {
  it("", function() {
    var a = false;
    expect(a).not.toBe(true);
  });
});
```


```js
describe("", function() {
  it("", function() {
    var a = "abc";
    expect(a.length).toBe(3);
  });
});
```

```js
describe("", function() {
  it("", function() {
    var a = 1;

    expect(a).toBeGreaterThan(0);
  });
});
```
