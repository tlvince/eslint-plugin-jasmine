# Enforce expect having a single argument (expect-single-argument).

Ensure `expect` is called with a single argument.

## Rule details

This rule triggers a warning if `expect` is called with more than one argument or without arguments.

```js
expect();
expect("something", "more");
```

### Default configuration

The following patterns are considered warnings:

```js
expect();
expect().toEqual("something");
expect("something", "else");
```

The following patterns are not warnings:

```js
expect("something").toEqual("something");
expect([1, 2, 3]).toEqual([1, 2, 3]);
expect(true).toBeDefined();
```
