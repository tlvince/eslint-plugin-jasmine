# Enforce expect having a corresponding matcher call (expect-matcher).

This rule is enabled by default.

## Rule details

This rule triggers a warning if `expect` is called without a matcher.

```js
expect("something");
```

or when a matcher function was not called:

```js
expect(true).toBeDefined
```


The following patterns are not warnings:

```js
expect("something").toEqual("something");
expect([1, 2, 3]).toEqual([1, 2, 3]);
expect(true).toBeDefined();
```
